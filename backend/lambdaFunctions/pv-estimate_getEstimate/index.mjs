// Needs lambda execute IAM permission for each lambda, also.

import {LambdaClient, InvokeCommand} from '@aws-sdk/client-lambda'
const asciiDecoder = new TextDecoder('utf-8')

export const handler = async (event) => {
  const client = new LambdaClient()

  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-lambda/classes/invokecommand.html
  const fetchParams = {
    FunctionName:
      'arn:aws:lambda:eu-north-1:880299674189:function:pv-estimate_fetchEstimate', // required
    // InvocationType: "Event" || "RequestResponse" || "DryRun",
    InvocationType: 'RequestResponse',
    LogType: 'Tail'
    // ClientContext: "STRING_VALUE",
    // Payload: "",
    // Qualifier: "STRING_VALUE",
  }

  const fetchCommand = new InvokeCommand(fetchParams)

  try {
    let retVal

    let response = await client.send(fetchCommand)
    // Payload comes back as array. Decode array and parse as json before returning data
    const estimate = JSON.parse(asciiDecoder.decode(response.Payload))

    const transformParams = {
      FunctionName:
        'arn:aws:lambda:eu-north-1:880299674189:function:transformRecord', // required
      InvocationType: 'RequestResponse',
      LogType: 'Tail',
      Payload: JSON.stringify(estimate)
    }
    const transformCommand = new InvokeCommand(transformParams)
    response = await client.send(transformCommand)
    retVal = JSON.parse(asciiDecoder.decode(response.Payload))

    // API Gateway is picky about return payload format. https://stackoverflow.com/a/43718963/16824901
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(retVal)
    }
  } catch (error) {
    console.error('Error invoking Lambda function:', error)
    return {
      statusCode: 500,
      body: 'Error invoking Lambda function'
    }
  }
}

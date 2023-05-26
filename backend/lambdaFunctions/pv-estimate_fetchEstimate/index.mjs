//  Get the raw / base data for a pv estimate

import https from 'https'

export const handler = async (event) => {
  // const estimateURL = 'https://pv-estimate.s3.eu-north-1.amazonaws.com/mockData/ApiResponse.json'
  const estimateURL = 'https://api.forecast.solar/estimate/52/12/37/0/5.67'

  try {
    const response = await new Promise((resolve, reject) => {
      https
        .get(estimateURL, (res) => {
          if (res.statusCode !== 200) {
            reject(
              new Error(
                `Error accessing S3 file. Status code: ${res.statusCode}`
              )
            )
          }

          let data = ''
          res.on('data', (chunk) => {
            data += chunk
          })

          res.on('end', () => {
            resolve(data)
          })
        })
        .on('error', (error) => {
          reject(error)
        })
    })

    return JSON.parse(response)
  } catch (error) {
    console.error('Error accessing estimate data:', error)
    return {
      statusCode: 500,
      body: 'Error accessing estimate data'
    }
  }
}

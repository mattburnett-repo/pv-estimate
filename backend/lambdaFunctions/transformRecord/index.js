exports.handler = async (event) => {
  let response = {}

  try {
    // sourcery skip: inline-immediately-returned-variable
    let record = await transformRecord(event)

    return record
  } catch (e) {
    console.error('error in transformRecord: ', e)

    return e.message
  }
}

async function transformRecord(apiRecord) {
  let theRecord = apiRecord.result

  // sourcery skip: inline-immediately-returned-variable
  let theResult = {
    watts: await parseRecord(theRecord.watts),
    watt_hours: await parseRecord(theRecord.watt_hours),
    watt_hours_period: await parseRecord(theRecord.watt_hours_period),
    watt_hours_day: await parseRecord(theRecord.watt_hours_day),
    message: apiRecord.message
  }

  return theResult
}

async function parseRecord(record) {
  let date = ''
  let time = ''
  let watts = ''
  let result = []
  let estimateDate = ''
  let estimate = {}

  const recordLength = Object.entries(record).length

  for (let i = 0; i < recordLength; i++) {
    date = Object.keys(record)[i].split(' ')[0]

    if (date != estimateDate) {
      estimateDate = date
      estimate[estimateDate] = []

      for (let j = 0; j < recordLength; j++) {
        if (Object.keys(record)[j].split(' ')[0] == estimateDate) {
          time = Object.keys(record)[j].split(' ')[1]
          watts = Object.values(record)[j]
          estimate[estimateDate].push({time, watts})
        }
      }

      // we're done with the current estimate. push it to the result array and make room for a new one.
      result.push(estimate)
      estimate = {}
    }
  }

  return result
}

var beacon = require('../index.js')

async function start() {
  let ts = beacon.timestampMinutesAgo(45)

  let certId =
    '5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7'
  try {
    let result = await beacon.getCertificateByIdAsync(certId)
    console.log(result)
  } catch (error) {
    console.error(
      `Could not retrieve certificate with id = ${certId} : ${error.message}`
    )
  }

  try {
    let result = await beacon.getClosestPulseAsync(ts)
    console.log(result)
  } catch (error) {
    console.error(
      `Could not retrieve closest pulse to ${ts} : ${error.message}`
    )
  }

  try {
    let result = await beacon.getNextPulseAsync(ts)
    console.log(result)
  } catch (error) {
    console.error(`Could not retrieve next pulse from ${ts} : ${error.message}`)
  }

  try {
    let result = await beacon.getPreviousPulseAsync(ts)
    console.log(result)
  } catch (error) {
    console.error(
      `Could not retrieve previous pulse from ${ts} : ${error.message}`
    )
  }

  try {
    let result = await beacon.getMostRecentPulseAsync()
    console.log(result)
  } catch (error) {
    console.error(`Could not retrieve most recent pulse : ${error.message}`)
  }

  try {
    let result = await beacon.getPulseByChainAndPulseIndexAsync(1, 1)
    console.log(result)
  } catch (error) {
    console.error(
      `Could not retrieve pulse at index 1 on chain 1 : ${error.message}`
    )
  }
}

start()

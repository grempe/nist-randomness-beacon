var beacon = require('../index.js')

async function start() {
  let ts = beacon.timestampMinutesAgo(45)

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

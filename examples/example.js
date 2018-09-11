#!/usr/bin/env node

var beacon = require('../index.js')

async function start() {
  let ts = beacon.timestampMinutesAgo(45)

  let certId =
    '5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7'

  beacon
    .getCertificateById(certId)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error(
        `Could not retrieve certificate with id = ${certId} : ${err.message}`
      )
    })

  beacon
    .getClosestPulse(ts)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error(
        `Could not retrieve closest pulse to ${ts} : ${err.message}`
      )
    })

  beacon
    .getNextPulse(ts)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error(`Could not retrieve next pulse from ${ts} : ${err.message}`)
    })

  beacon
    .getPreviousPulse(ts)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error(
        `Could not retrieve previous pulse from ${ts} : ${err.message}`
      )
    })

  beacon
    .getMostRecentPulse()
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error(`Could not retrieve most recent pulse : ${err.message}`)
    })

  beacon
    .getPulseByChainAndPulseIndex(1, 1)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.error(
        `Could not retrieve pulse at index 1 on chain 1 : ${err.message}`
      )
    })
}

start()

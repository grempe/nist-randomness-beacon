'use strict'

const request = require('request')
const xml2js = require('xml2js')

// Must have trailing slash
const BEACON_API_URI_BASE = 'https://beacon.nist.gov/rest/record/'

let _getBeacon = function (path, cb) {
  let options = {
    method: 'GET',
    uri: BEACON_API_URI_BASE + path,
    gzip: true
  }

  request(options, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      return _parseBeaconResponse(body, cb)
    } else {
      return cb(body)
    }
  })
}

let _parseBeaconResponse = function (xml, cb) {
  xml2js.parseString(xml, function (err, parsed) {
    if (err) {
      return cb('XML Parsing Error')
    }

    if (!parsed ||
        !parsed.record ||
        !parsed.record.version ||
        !parsed.record.frequency ||
        !parsed.record.timeStamp ||
        !parsed.record.seedValue ||
        !parsed.record.previousOutputValue ||
        !parsed.record.signatureValue ||
        !parsed.record.outputValue ||
        !parsed.record.statusCode ||
        !parsed.record.outputValue
        ) {
      return cb('Missing attributes in server response')
    }

    let obj = {}

    // A simple version string, e.g. “Version 1.0”
    obj.version = parsed.record.version[0]

    // The time interval, in seconds, between expected records
    obj.frequency = parseInt(parsed.record.frequency[0], 10)

    // The time the seed value was generated as the number of
    // seconds since January 1, 1970
    obj.timeStamp = parseInt(parsed.record.timeStamp[0], 10)

    // Convert timestamp in seconds to ms and output ISO8601 string
    var date = new Date(parseInt(parsed.record.timeStamp[0], 10) * 1000)
    obj.timeStampISO8601 = date.toISOString()

    // A seed value represented as a 64 byte (512-bit) hex string value
    obj.seedValue = parsed.record.seedValue[0]

    // The SHA-512 hash value for the previous record - 64 byte hex string
    obj.previousOutputValue = parsed.record.previousOutputValue[0]

    // A digital signature (RSA) computed over (in order):
    // version, frequency, timeStamp, seedValue, previousHashValue, errorCode
    // Note: Except for version, the hash is on the byte representations and
    // not the string representations of the data values
    obj.signatureValue = parsed.record.signatureValue[0]

    // The SHA-512 hash of the signatureValue as a 64 byte hex string
    obj.outputValue = parsed.record.outputValue[0]

    // The status code value:
    // 0 - Chain intact, values all good
    // 1 - Start of a new chain of values, previous hash value will be all zeroes
    // 2 - Time between values is greater than the frequency, but the chain is still intact
    obj.statusCode = parseInt(parsed.record.statusCode[0], 10)

    cb(null, obj)
  })
}

let isValidTimestamp = function (timestamp) {
  // Must be an Integer
  if (!timestamp === parseInt(timestamp, 10)) {
    return false
  }

  // Must not be before the beginning of time
  if (timestamp < 1) {
    return false
  }

  // Must not be in the future
  if (timestamp > exports.currentTimestampInSeconds()) {
    return false
  }

  return true
}

// Given a number of minutes, return a valid
// epoch timestamp (in seconds)
exports.timestampInSecondsMinutesAgo = function (min) {
  // Must be an Integer
  if (!min === parseInt(min, 10)) {
    return null
  }

  let currTime = new Date().getTime()
  let minInMs = min * 60000
  let oldTime = new Date(currTime - minInMs)
  return Math.round(oldTime.getTime() / 1000)
}

// Return a valid epoch timestamp for the current
// time (in seconds)
exports.currentTimestampInSeconds = function () {
  let d = new Date()
  return Math.round(d.getTime() / 1000)
}

exports.current = function (timestamp, cb) {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon(timestamp, cb)
}

exports.previous = function (timestamp, cb) {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon('/previous/' + timestamp, cb)
}

exports.next = function (timestamp, cb) {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon('/next/' + timestamp, cb)
}

exports.last = function (cb) {
  _getBeacon('/last', cb)
}

exports.startChain = function (timestamp, cb) {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon('/start-chain/' + timestamp, cb)
}

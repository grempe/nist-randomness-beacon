'use strict'

const request = require('request')
const xml2js = require('xml2js')
const crypto = require('crypto')
const Int64BE = require('int64-buffer').Int64BE
const path = require('path')
const fs = require('fs')

// Must have trailing slash
const BEACON_API_URI_BASE = 'https://beacon.nist.gov/rest/record/'

// The certificate (public key) used by beacon to sign a response
const BEACON_CERT = `-----BEGIN CERTIFICATE-----
MIIHZTCCBk2gAwIBAgIESTWNPjANBgkqhkiG9w0BAQsFADBtMQswCQYDVQQGEwJV
UzEQMA4GA1UEChMHRW50cnVzdDEiMCAGA1UECxMZQ2VydGlmaWNhdGlvbiBBdXRo
b3JpdGllczEoMCYGA1UECxMfRW50cnVzdCBNYW5hZ2VkIFNlcnZpY2VzIFNTUCBD
QTAeFw0xNDA1MDcxMzQ4MzZaFw0xNzA1MDcxNDE4MzZaMIGtMQswCQYDVQQGEwJV
UzEYMBYGA1UEChMPVS5TLiBHb3Zlcm5tZW50MR8wHQYDVQQLExZEZXBhcnRtZW50
IG9mIENvbW1lcmNlMTcwNQYDVQQLEy5OYXRpb25hbCBJbnN0aXR1dGUgb2YgU3Rh
bmRhcmRzIGFuZCBUZWNobm9sb2d5MRAwDgYDVQQLEwdEZXZpY2VzMRgwFgYDVQQD
Ew9iZWFjb24ubmlzdC5nb3YwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
AQC/m2xcckaSYztt6/6YezaUmqIqY5CLvrfO2esEIJyFg+cv7S7exL3hGYeDCnQL
VtUIGViAnO9yCXDC2Kymen+CekU7WEtSB96xz/xGrY3mbwjS46QSOND9xSRMroF9
xbgqXxzJ7rL/0RMUkku3uurGb/cxUpzKt6ra7iUnzkk3BBk73kr2OXFyYYbtrN71
s0B9qKKJZuPQqmA5n80Xc3E2YbaoAW4/gesncFNL7Sdxw9NIA1L4feu/o8xp3FNP
pv2e25C0113x+yagvb1W0mw6ISwAKhJ+6G4t4hFejl7RujuiDfORgzIhHMR4CyWt
PZFVn2qxZuVooj1+mduLIXhDAgMBAAGjggPKMIIDxjAOBgNVHQ8BAf8EBAMCBsAw
FwYDVR0gBBAwDjAMBgpghkgBZQMCAQMHMIIBXgYIKwYBBQUHAQEEggFQMIIBTDCB
uAYIKwYBBQUHMAKGgatsZGFwOi8vc3NwZGlyLm1hbmFnZWQuZW50cnVzdC5jb20v
b3U9RW50cnVzdCUyME1hbmFnZWQlMjBTZXJ2aWNlcyUyMFNTUCUyMENBLG91PUNl
cnRpZmljYXRpb24lMjBBdXRob3JpdGllcyxvPUVudHJ1c3QsYz1VUz9jQUNlcnRp
ZmljYXRlO2JpbmFyeSxjcm9zc0NlcnRpZmljYXRlUGFpcjtiaW5hcnkwSwYIKwYB
BQUHMAKGP2h0dHA6Ly9zc3B3ZWIubWFuYWdlZC5lbnRydXN0LmNvbS9BSUEvQ2Vy
dHNJc3N1ZWRUb0VNU1NTUENBLnA3YzBCBggrBgEFBQcwAYY2aHR0cDovL29jc3Au
bWFuYWdlZC5lbnRydXN0LmNvbS9PQ1NQL0VNU1NTUENBUmVzcG9uZGVyMBsGA1Ud
CQQUMBIwEAYJKoZIhvZ9B0QdMQMCASIwggGHBgNVHR8EggF+MIIBejCB6qCB56CB
5IaBq2xkYXA6Ly9zc3BkaXIubWFuYWdlZC5lbnRydXN0LmNvbS9jbj1XaW5Db21i
aW5lZDEsb3U9RW50cnVzdCUyME1hbmFnZWQlMjBTZXJ2aWNlcyUyMFNTUCUyMENB
LG91PUNlcnRpZmljYXRpb24lMjBBdXRob3JpdGllcyxvPUVudHJ1c3QsYz1VUz9j
ZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0O2JpbmFyeYY0aHR0cDovL3NzcHdlYi5t
YW5hZ2VkLmVudHJ1c3QuY29tL0NSTHMvRU1TU1NQQ0ExLmNybDCBiqCBh6CBhKSB
gTB/MQswCQYDVQQGEwJVUzEQMA4GA1UEChMHRW50cnVzdDEiMCAGA1UECxMZQ2Vy
dGlmaWNhdGlvbiBBdXRob3JpdGllczEoMCYGA1UECxMfRW50cnVzdCBNYW5hZ2Vk
IFNlcnZpY2VzIFNTUCBDQTEQMA4GA1UEAxMHQ1JMNjY3MzArBgNVHRAEJDAigA8y
MDE0MDUwNzEzNDgzNlqBDzIwMTYwNjEyMTgxODM2WjAfBgNVHSMEGDAWgBTTzudb
iafNbJHGZzapWHIJ7OI58zAdBgNVHQ4EFgQUGIOcf6r7Z9wk+2/YuG5oTs7Qwk8w
CQYDVR0TBAIwADAZBgkqhkiG9n0HQQAEDDAKGwRWOC4xAwIEsDANBgkqhkiG9w0B
AQsFAAOCAQEASc+lZBbJWsHB2WnaBr8ZfBqpgS51Eh+wLchgIq7JHhVn+LagkR8C
XmvP57a0L/E+MRBqvH2RMqwthEcjXio2WIu/lyKZmg2go9driU6H3s89X8snblDF
1B+iL73vhkLVdHXgStMS8AHbm+3BW6yjHens1tVmKSowg1P/bGT3Z4nmamdY9oLm
9sCgFccthC1BQqtPv1XsmLshJ9vmBbYMsjKq4PmS0aLA59J01YMSq4U1kzcNS7wI
1/YfUrfeV+r+j7LKBgNQTZ80By2cfSalEqCe8oxqViAz6DsfPCBeE57diZNLiJmj
a2wWIBquIAXxvD8w2Bue7pZVeUHls5V5dA==
-----END CERTIFICATE-----
`

const vendor = path.dirname(fs.realpathSync(__filename))
const BEACON_KEY = fs.readFileSync(vendor + '/pubkey.pem').toString()

let _getBeacon = (path, cb) => {
  let options = {
    method: 'GET',
    uri: BEACON_API_URI_BASE + path,
    gzip: true
  }

  request(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      return _parseBeaconResponse(body, cb)
    } else {
      return cb(body)
    }
  })
}

let _parseBeaconResponse = (xml, cb) => {
  xml2js.parseString(xml, (err, parsed) => {
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

    obj.validSignature = isValidSignature(obj)

    cb(null, obj)
  })
}

let reverse = (src) => {
  let buffer = new Buffer(src.length)

  for (let i = 0, j = src.length - 1; i <= j; ++i, --j) {
    buffer[i] = src[j]
    buffer[j] = src[i]
  }

  return buffer
}

let isValidSignature = (res) => {
  // The hash record contains
  //   Version number (ascii text)
  //   Update frequency (4 bytes)
  //   Time Stamp (8 bytes)
  //   The HW RNG seedValue (64 bytes)
  //   The previous output value, does the chaining (64 bytes)
  //   Status code (4 bytes)
  let certVerifier = crypto.createVerify('RSA-SHA512')
  let buf4 = new Buffer(4)
  certVerifier.update(res.version, 'ascii')
  buf4.writeIntBE(res.frequency, 0, 4)
  certVerifier.update(buf4)
  certVerifier.update(new Int64BE(res.timeStamp).toBuffer())
  certVerifier.update(Buffer.from(res.seedValue, 'hex'))
  certVerifier.update(Buffer.from(res.previousOutputValue, 'hex'))
  buf4.writeIntBE(res.statusCode, 0, 4)
  certVerifier.update(buf4)

  // duplicate this verifier since crypto.createVerify()
  // does not allow itself to be called twice.
  let keyVerifier = crypto.createVerify('RSA-SHA512')
  keyVerifier.update(res.version, 'ascii')
  buf4.writeIntBE(res.frequency, 0, 4)
  keyVerifier.update(buf4)
  keyVerifier.update(new Int64BE(res.timeStamp).toBuffer())
  keyVerifier.update(Buffer.from(res.seedValue, 'hex'))
  keyVerifier.update(Buffer.from(res.previousOutputValue, 'hex'))
  buf4.writeIntBE(res.statusCode, 0, 4)
  keyVerifier.update(buf4)

  // Create a bytewise reversed version of the signature.
  // This is necessary because Beacon signs with Microsoft CryptoAPI which outputs
  // the signature as little-endian instead of big-endian
  let signature = Buffer.from(res.signatureValue, 'hex')
  let revSignature = reverse(signature)

  // Auto-fallback from the pubkey that is used starting 8/8/2017
  // to the original x509 cert used prior to that.
  if (!keyVerifier.verify(BEACON_KEY, revSignature)) {
    if (!certVerifier.verify(BEACON_CERT, revSignature)) {
      return false
    }
  }

  // The output value is the SHA-512 hash of the signature
  let hash = crypto.createHash('sha512')
  hash.update(signature)
  return res.outputValue.toLowerCase() === hash.digest('hex')
}

let isValidTimestamp = (timestamp) => {
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
exports.timestampInSecondsMinutesAgo = (min) => {
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
exports.currentTimestampInSeconds = () => {
  let d = new Date()
  return Math.round(d.getTime() / 1000)
}

exports.current = (timestamp, cb) => {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon(timestamp, cb)
}

exports.previous = (timestamp, cb) => {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon('/previous/' + timestamp, cb)
}

exports.next = (timestamp, cb) => {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon('/next/' + timestamp, cb)
}

exports.last = (cb) => {
  _getBeacon('/last', cb)
}

exports.startChain = (timestamp, cb) => {
  if (!isValidTimestamp(timestamp)) {
    return cb('Invalid timestamp')
  }
  _getBeacon('/start-chain/' + timestamp, cb)
}

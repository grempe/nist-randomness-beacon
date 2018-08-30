const crypto = require('crypto')
const int64BE = require('int64-buffer').Int64BE
const rp = require('request-promise-native')

// Must have trailing slash
const BEACON_V2_API_URI_BASE = 'https://beacon.nist.gov/beacon/2.0/'

// The certificate (public key) used by beacon to sign a response
const BEACON_V2_CERT = `-----BEGIN CERTIFICATE-----
MIIHWzCCBkOgAwIBAgIQCrOnD+Dvk39rGwz3xX6StTANBgkqhkiG9w0BAQsFADBE
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMR4wHAYDVQQDExVE
aWdpQ2VydCBHbG9iYWwgQ0EgRzIwHhcNMTgwMTEwMDAwMDAwWhcNMTkwMTExMTIw
MDAwWjCBozELMAkGA1UEBhMCVVMxETAPBgNVBAgTCE1hcnlsYW5kMRUwEwYDVQQH
EwxHYWl0aGVyc2J1cmcxNzA1BgNVBAoTLk5hdGlvbmFsIEluc3RpdHV0ZSBvZiBT
dGFuZGFyZHMgYW5kIFRlY2hub2xvZ3kxEDAOBgNVBAsTB0lUTC9DU0QxHzAdBgNV
BAMTFmVuZ2luZS5iZWFjb24ubmlzdC5nb3YwggIiMA0GCSqGSIb3DQEBAQUAA4IC
DwAwggIKAoICAQDqdbhEDfBOCzCjW6cKBSKkkl8pc7v6VDDI21VAs5fOyZRoSwfW
tHc9YkVoYBaNTfmUBW5Q8hWbk65VftCznjEFIa05ldME/ABGKSkQKFyC3ELsE4+e
nkM1I9EJOt9dCSH9dSmzwjFf8C/fxhGqYEatH8GenuQ/FbU7shiigiqHUJU9SSVZ
trH4qV7szmcIBd/VzVTgLFipF8nl6EoScEIdgOC+ZmRo0LLfB/ulUT7iaXuzB0GP
ocMjwk4yfJgHNkHitgGMoDNYGVz4sU0QCtQSAXjjvwAMb+EzGBV08Zj2qNMEANKX
cvdRRA340t3oC6PbmeW+7w+IRo0to8AqhUlSAobmty6pOUzykEdhg/g6FKOowQEz
JZkhHd1/7Fh7XRHvc6EKz5tjAP+c5MUP9ni6O2N6uzrNbm94p0JmGk6DwJVWS0A1
l7M/xjON3aZN2f2ZSlezurBh9GBWENniHUsG/iOJdtjb+VE8VCr+J3Ltn62CfbgU
4aW+XbwHtZq+jtLzf2VKgHpeM4LKCzgQbhSbJNuuNCm2ib8PaS/f+kz+p9D8Rd/q
Te4/w03a+bqZRBcql8K7n73ysT+r595oos6AQujj4rgOHU7byZDLRGbMHPhox4OD
Dd7iYGhMHcfUez7FYJF0zNQafEt7iZP6U/PigtPoi3lJNPLcijbNcFNSowIDAQAB
o4IC5zCCAuMwHwYDVR0jBBgwFoAUJG4rLdBqklFRJWkBqppHponnQCAwHQYDVR0O
BBYEFB69FZvO+nhCyDuDd1uLZchw4+j3MCEGA1UdEQQaMBiCFmVuZ2luZS5iZWFj
b24ubmlzdC5nb3YwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMB
BggrBgEFBQcDAjB3BgNVHR8EcDBuMDWgM6Axhi9odHRwOi8vY3JsMy5kaWdpY2Vy
dC5jb20vRGlnaUNlcnRHbG9iYWxDQUcyLmNybDA1oDOgMYYvaHR0cDovL2NybDQu
ZGlnaWNlcnQuY29tL0RpZ2lDZXJ0R2xvYmFsQ0FHMi5jcmwwTAYDVR0gBEUwQzA3
BglghkgBhv1sAQEwKjAoBggrBgEFBQcCARYcaHR0cHM6Ly93d3cuZGlnaWNlcnQu
Y29tL0NQUzAIBgZngQwBAgIwdAYIKwYBBQUHAQEEaDBmMCQGCCsGAQUFBzABhhho
dHRwOi8vb2NzcC5kaWdpY2VydC5jb20wPgYIKwYBBQUHMAKGMmh0dHA6Ly9jYWNl
cnRzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEdsb2JhbENBRzIuY3J0MAkGA1UdEwQC
MAAwggEFBgorBgEEAdZ5AgQCBIH2BIHzAPEAdgC72d+8H4pxtZOUI5eqkntHOFeV
CqtS6BqQlmQ2jh7RhQAAAWDgpJnPAAAEAwBHMEUCIQC1eW0bNSeOZNYU8Of5/oZr
fruiiiIYK/QKct/hCsXgdwIgS5/nMOviHGu2/FLTMkWFAva+wBVGNrsRdbD6yLoQ
BNgAdwCHdb/nWXz4jEOZX73zbv9WjUdWNv9KtWDBtOr/XqCDDwAAAWDgpJm5AAAE
AwBIMEYCIQCq1AvkODGe/zTX56kishId42HRCiEDa1/Wq8F9/DOabwIhAI5UbEeE
Q20nuadFVxpJgirXFYpAzjlr6/emIXRc5E1LMA0GCSqGSIb3DQEBCwUAA4IBAQAs
WjP0Sj4r2nHWLKi45aUwhS+WZzq3cDPa92QDP6LnFTtzUicPpOyLYcWOsc7SKyGi
BlWgxHp9vmoO+25gCXSbet42Yl1PXFhTpZcPHPxO/BknRGe9CY1pmOOyjsxwMZ8a
qH2He7anCpHk5AEfLX0F+WHjEtnYBrRhMM6GtftHXXxuAhGuH0zmzbwakREOoWNO
Q2iTFVBb9UybxHbl9r0rVD3x5FpRrTf90l5dhrERzhtjone/DtQU/5wRagRTKjeQ
VaCu59An0vNCJYVWPbOypZCRdbcKlcd3GoMx2DosfFcdgSLR1h9+O0y3DsonJgiT
Q2l+vxzeaIsZqUEYrLaq
-----END CERTIFICATE-----`

// Private internal functions

async function _getBeaconAsync(path) {
  let options = {
    method: 'GET',
    uri: BEACON_V2_API_URI_BASE + path,
    json: true,
    gzip: true,
    resolveWithFullResponse: true,
    timeout: 5000
  }
  let response = await rp(options)
  let isValid = await _validateBeaconResponseAsync(response.body.pulse)
  if (!isValid) throw new Error('Unable to validate server response')
  return response.body
}

async function _validateBeaconResponseAsync(pulse) {
  if (!pulse) throw new Error('Missing attribute [pulse] in server response')
  if (!pulse.hasOwnProperty('uri'))
    throw new Error('Missing attribute [puls.uri] in server response')
  if (!pulse.hasOwnProperty('version'))
    throw new Error('Missing attribute [pulse.version] in server response')
  if (!pulse.hasOwnProperty('cipherSuite'))
    throw new Error('Missing attribute [pulse.cipherSuite] in server response')
  if (!pulse.hasOwnProperty('period'))
    throw new Error('Missing attribute [pulse.period] in server response')
  if (!pulse.hasOwnProperty('certificateId'))
    throw new Error(
      'Missing attribute [pulse.certificateId] in server response'
    )
  if (!pulse.hasOwnProperty('chainIndex'))
    throw new Error('Missing attribute [pulse.chainIndex] in server response')
  if (!pulse.hasOwnProperty('pulseIndex'))
    throw new Error('Missing attribute [pulse.pulseIndex] in server response')
  if (!pulse.hasOwnProperty('timeStamp'))
    throw new Error('Missing attribute [pulse.timeStamp] in server response')
  if (!pulse.hasOwnProperty('localRandomValue'))
    throw new Error(
      'Missing attribute [pulse.localRandomValue] in server response'
    )
  if (!pulse.hasOwnProperty('external'))
    throw new Error('Missing attribute [pulse.external] in server response')
  if (!pulse.external.hasOwnProperty('sourceId'))
    throw new Error(
      'Missing attribute [pulse.external.sourceId] in server response'
    )
  if (!pulse.external.hasOwnProperty('statusCode'))
    throw new Error(
      'Missing attribute [pulse.external.statusCode] in server response'
    )
  if (!pulse.external.hasOwnProperty('value'))
    throw new Error(
      'Missing attribute [pulse.external.value] in server response'
    )
  if (!pulse.hasOwnProperty('listValues'))
    throw new Error('Missing attribute [pulse.listValues] in server response')
  for (let item of pulse.listValues) {
    if (!item.hasOwnProperty('value'))
      throw new Error(
        'Missing attribute [pulse.listValues[x].value] in server response'
      )
  }
  if (!pulse.hasOwnProperty('precommitmentValue'))
    throw new Error(
      'Missing attribute [pulse.precommitmentValue] in server response'
    )
  if (!pulse.hasOwnProperty('statusCode'))
    throw new Error('Missing attribute [pulse.statusCode] in server response')
  if (!pulse.hasOwnProperty('signatureValue'))
    throw new Error(
      'Missing attribute [pulse.signatureValue] in server response'
    )
  if (!pulse.hasOwnProperty('outputValue'))
    throw new Error('Missing attribute [pulse.outputValue] in server response')

  return _validateSignatureAsync(pulse)
}

async function _validateSignatureAsync(pulse) {
  /*
  A big-endian hex encoded digital signature using the public key contained in certificateId
  computed over the SHA-512 hash of (in order):

  strlen(uri);
  uri as a UTF-8 sequence of characters;
  strlen(version);
  version as a UTF-8 sequence of characters;
  cipherSuite as a 4-byte big-endian integer value;
  period as a 4-byte big-endian integer value;
  length(certificateId);
  certificateId as a hex-decoded sequence of bytes;
  chainIndex as an 8-byte big-endian integer value;
  pulseIndex as an 8-byte big-endian integer value;
  strlen(timestamp);
  timestamp as a UTF-8 sequence of characters;
  length(localRandomValue);
  localRandomValue as a hex-decoded sequence of bytes;
  length(external/sourceId);
  external/sourceId as a hex-decoded sequence of bytes;
  external/statusCode as a 4-byte big-endian integer value;
  length(external/value);
  external/value as a hex-decoded sequence of bytes;
  length(listValue[@type=’previous’]);
  listValue[@type=’previous’] as a hex-decoded sequence of bytes;
  length(listValue[@type=’hour’]);
  listValue[@type=’hour’] as a hex-decoded sequence of bytes;
  length(listValue[@type=’day’]);
  listValue[@type=’day’] as a hex-decoded sequence of bytes;
  length(listValue[@type=’month’]);
  listValue[@type=’month’] as a hex-decoded sequence of bytes;
  length(listValue[@type=’year’]);
  listValue[@type=’year’] as a hex-decoded sequence of bytes;
  length(precommitmentValue);
  precommitmentValue as a hex-decoded sequence of bytes;
  statusCode as a 4-byte big-endian integer value.

  Note: strlen(x) returns the number of characters in the string x; length(x) returns the number of
  bytes after x has been hex decoded; both strlen(x) and length(x) are encoded as 4-byte big-endian
  integer values; different listValue types may be used, but if provided, they must be included in the
  hash in the order they are provided.
  */

  // strlen(uri);
  let uriLength = Buffer.alloc(4)
  uriLength.writeInt32BE(pulse.uri.length)
  // uri as a UTF-8 sequence of characters;
  let uri = Buffer.from(pulse.uri, 'utf8')
  // strlen(version);
  let versionLength = Buffer.alloc(4)
  versionLength.writeInt32BE(pulse.version.length)
  // version as a UTF-8 sequence of characters;
  let version = Buffer.from(pulse.version, 'utf8')
  // cipherSuite as a 4-byte big-endian integer value;
  let cipherSuite = Buffer.alloc(4)
  cipherSuite.writeInt32BE(pulse.cipherSuite)
  // period as a 4-byte big-endian integer value;
  let period = Buffer.alloc(4)
  period.writeInt32BE(pulse.period)
  // length(certificateId);
  // certificateId as a hex-decoded sequence of bytes;
  let certificateId = Buffer.from(pulse.certificateId, 'hex')
  let certificateIdLength = Buffer.alloc(4)
  certificateIdLength.writeInt32BE(certificateId.length)
  // chainIndex as an 8-byte big-endian integer value;
  let chainIndex = new int64BE(pulse.chainIndex).toBuffer()
  // pulseIndex as an 8-byte big-endian integer value;
  let pulseIndex = new int64BE(pulse.pulseIndex).toBuffer()
  // strlen(timestamp);
  let timestampLength = Buffer.alloc(4)
  timestampLength.writeInt32BE(pulse.timeStamp.length)
  // timestamp as a UTF-8 sequence of characters;
  let timestamp = Buffer.from(pulse.timeStamp, 'utf8')
  // length(localRandomValue);
  // localRandomValue as a hex-decoded sequence of bytes;
  let localRandomValue = Buffer.from(pulse.localRandomValue, 'hex')
  let localRandomValueLength = Buffer.alloc(4)
  localRandomValueLength.writeInt32BE(localRandomValue.length)
  // length(external/sourceId);
  // external/sourceId as a hex-decoded sequence of bytes;
  let externalSourceId = Buffer.from(pulse.external.sourceId, 'hex')
  let externalSourceIdLength = Buffer.alloc(4)
  externalSourceIdLength.writeInt32BE(externalSourceId.length)
  // external/statusCode as a 4-byte big-endian integer value;
  let externalStatusCode = Buffer.alloc(4)
  externalStatusCode.writeInt32BE(pulse.external.statusCode)
  // length(external/value);
  // external/value as a hex-decoded sequence of bytes;
  let externalValue = Buffer.from(pulse.external.value, 'hex')
  let externalValueLength = Buffer.alloc(4)
  externalValueLength.writeInt32BE(externalValue.length)
  // length(listValue[x]);
  // listValue[x] as a hex-decoded sequence of bytes;
  let listValuesBuffers = []
  for (let item of pulse.listValues) {
    let listValue = Buffer.from(item.value, 'hex')
    let listValueLength = Buffer.alloc(4)
    listValueLength.writeInt32BE(listValue.length)
    listValuesBuffers.push(listValueLength, listValue)
  }
  let listValues = Buffer.concat(listValuesBuffers)
  // length(precommitmentValue);
  // precommitmentValue as a hex-decoded sequence of bytes;
  let precommitmentValue = Buffer.from(pulse.precommitmentValue, 'hex')
  let precommitmentValueLength = Buffer.alloc(4)
  precommitmentValueLength.writeInt32BE(precommitmentValue.length)
  // statusCode as a 4-byte big-endian integer value.
  let statusCode = Buffer.alloc(4)
  statusCode.writeInt32BE(pulse.statusCode)

  let signatureInput = Buffer.concat([
    uriLength,
    uri,
    versionLength,
    version,
    cipherSuite,
    period,
    certificateIdLength,
    certificateId,
    chainIndex,
    pulseIndex,
    timestampLength,
    timestamp,
    localRandomValueLength,
    localRandomValue,
    externalSourceIdLength,
    externalSourceId,
    externalStatusCode,
    externalValueLength,
    externalValue,
    listValues,
    precommitmentValueLength,
    precommitmentValue,
    statusCode
  ])

  let hash512 = crypto.createHash('sha512')
  let signatureValue = Buffer.from(pulse.signatureValue, 'hex')

  let certVerifier = crypto.createVerify('RSA-SHA512')
  certVerifier.update(signatureInput)
  if (!certVerifier.verify(BEACON_V2_CERT, signatureValue)) {
    return false
  }

  // outputValue = A 64-byte hex string of the SHA-512 hash of the concatenation of the input into the
  // signatureValue and the hex decoded signatureValue as a sequence of bytes concatenated in that
  // order and then hashed.
  let outputValueSource = Buffer.concat([signatureInput, signatureValue])
  hash512 = crypto.createHash('sha512')
  let expectedOutputValue = hash512.update(outputValueSource).digest('hex')
  return pulse.outputValue.toLowerCase() === expectedOutputValue
}

function _reverseBuffer(src) {
  let result = Buffer.alloc(src.length)

  for (let i = 0, j = src.length - 1; i <= j; ++i, --j) {
    result[i] = src[j]
    result[j] = src[i]
  }

  return result
}

function _isValidTimestamp(timestamp) {
  // Must be an Integer
  if (!timestamp === parseInt(timestamp, 10)) {
    return false
  }

  // Must not be before the beginning of time
  if (timestamp < 1) {
    return false
  }

  // Must not be in the future
  if (timestamp > Date.now()) {
    return false
  }

  return true
}

// Public functions

// Given a number of minutes, return a valid epoch timestamp
function timestampMinutesAgo(min) {
  // Must be an Integer
  if (!min === parseInt(min, 10)) {
    return null
  }
  return Date.now() - min * 60000
}

async function getClosestPulseAsync(timestamp) {
  if (!_isValidTimestamp(timestamp)) throw new Error('Invalid timestamp')
  let result = await _getBeaconAsync(`pulse/time/${timestamp}`)
  return result
}

async function getPreviousPulseAsync(timestamp) {
  if (!_isValidTimestamp(timestamp)) throw new Error('Invalid timestamp')
  let result = await _getBeaconAsync(`pulse/time/previous/${timestamp}`)
  return result
}

async function getNextPulseAsync(timestamp) {
  if (!_isValidTimestamp(timestamp)) throw new Error('Invalid timestamp')
  let result = await _getBeaconAsync(`pulse/time/next/${timestamp}`)
  return result
}

async function getMostRecentPulseAsync() {
  let result = await _getBeaconAsync(`pulse/last`)
  return result
}

module.exports = {
  timestampMinutesAgo: timestampMinutesAgo,
  getClosestPulseAsync: getClosestPulseAsync,
  getPreviousPulseAsync: getPreviousPulseAsync,
  getNextPulseAsync: getNextPulseAsync,
  getMostRecentPulseAsync: getMostRecentPulseAsync
}

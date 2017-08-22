# nist-randomness-beacon

[![npm version](https://badge.fury.io/js/nist-randomness-beacon.svg)](https://badge.fury.io/js/nist-randomness-beacon)

This is a wrapper for the [NIST Randomness Beacon](https://beacon.nist.gov/home). The NIST Beacon:

* publishes 512 bits of high quality randomness every 60 seconds
* preserves all historical random values and makes them available by timestamp
* cryptographically signs each record
* hash-links each record with all previous records in a verifiable chain

**IMPORTANT**

There are many uses for these random values. However, DO NOT use these
random values as cryptographic key material! They are public and
explicitly not intended for that use. You have been warned!!!

Please also note that there is currently an issue with signatures
on NIST Beacon blocks after `1493245860`. More details on this can be found
on the [NIST Beacon homepage](https://beacon.nist.gov/home), and in 
[this Github issue](https://github.com/urda/nistbeacon/issues/26). This has
been worked around in the current version by performing an auto-fallback
to the old x509 cert if the most current pubkey.pem file does not verify.

## Features

* Converts Beacon response into a Javascript object
* Validates the response format and signature

## Installation

One of:

```
npm install nist-randomness-beacon --save
yarn add nist-randomness-beacon
```

## Usage Example

### Node.js

```javascript
let beacon = require('nist-randomness-beacon')

// Note: Returns timestamp measured in seconds since the UNIX Epoch
// and not milliseconds as Javascript does by default. The NIST
// API expects values measured in seconds.
let timestamp = beacon.currentTimestampInSeconds()  // 1493239410

beacon.last(function (err, res) {
  if (err) {
    console.error(err)
  } else {
    console.log(res)
  }
})

// {
//   version: 'Version 1.0',
//   frequency: 60,
//   timeStamp: 1493239440,
//   timeStampISO8601: '2017-04-26T20:44:00.000Z',
//   seedValue: '0E9AD149428F327B3DFDC9A89E85D59D2AE2F9B286CE892AECECC2C50E422E6B341C76888D16E5D58BE642281D12A4A38D9E1AF7BA77D111941DB8238B0C8F8D',
//   previousOutputValue: '9C015CF9E840E80E03879CB930C57B7821284D552C20BB8FDC46B3BAC0BAC37D4D27ADF7662E98994AF374C0094065114A1CFFF00B223DF21DC6214DE098318E',
//   signatureValue: '506283735F20BCE84464D1222E3FD73E2A90476C89C9A364AB4C8BB8581E71CC56F43A0401EE815083D0C8C09EDE2FA8E67A5A92775604FF0311E983FBEF49D7CA9B79928A4F044B0272AEB2C4704F86E9E54DF8DB5B68B9EF9A5E9B1136CDFFB72614879AE7D2C505F28F77C58D185A07B60CF62A33AD2D358071ED6D2C6FC99E7C7EB49C137630D31324834FB6DF596E929A82AB909D72E74735CFD1B118D8725CB6C1D71E9271824EBEB915311C8BDE793407673CFC36870C3816DDB81E6BEFB39661CB1BE1AD76E1DDC575FAD684C8224E43893201DE84C516239DB993EDF1D42C26BAD2235FBD5E1CC36E71D834688CE12733D9F6832D040D68974F8049',
//   outputValue: 'BBAAB5393F569A87493253B6ECB1FE88CC6AC00CD101A4A5135491D52A9F53E716F99075704A4E5C7C00BC33F924F3C741046DF450CDEE6FDDE3E3FCC17056CA',
//   statusCode: '0'
// }
```

### Browser

This does not currently work in the browser, even if you use a tool
like Browserify to package it. The NIST servers do not currently send
the necessary CORS headers.

Some additional work would also need to be done to trim down
the dependencies of this library for it to be practical in the
browser.

## Testing

Run the Mocha test suite once.

```
yarn test
```

Run the Mocha test suite and continue testing as files change.

```
yarn watch
```

## Credits

This library is a fork of the [nist-beacon](https://github.com/charlescharles/nist-beacon) project, as
of commit abb8d7f18882b207212b1d0a615a7027e4ad537a which was created
by Charles Guo. The API changes I had in mind were significant
enough to warrant the fork instead of a pull request.

My thanks to Charles for the good starting point. Charles continues
to be credited in the license and the code for his work.

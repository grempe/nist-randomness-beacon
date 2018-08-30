# nist-randomness-beacon

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![npm version](https://badge.fury.io/js/nist-randomness-beacon.svg)](https://badge.fury.io/js/nist-randomness-beacon)

This is a wrapper for the [NIST Randomness Beacon](https://beacon.nist.gov/home). The NIST Beacon:

* publishes 512 bits of high quality randomness every 60 seconds
* preserves all historical random values and makes them available by timestamp
* cryptographically signs each record
* hash-links each record with all previous records in a verifiable chain

**VERSION 2.x.x**

nist-randomness-beacon version 2+ is meant for use with NIST Randomness Beacon Version 2.0 only.

**IMPORTANT** 

There are many uses for these random values. However, DO NOT use these
random values as cryptographic key material! They are public and
explicitly not intended for that use. You have been warned!!!

## Features

* Retrieves beacon pulses as Javascript objects
* Retrieves and caches certificates as needed for validation
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

// define a sample timestamp to use for pulse retrieval
let timestamp = 1535650993225

beacon
  .getClosestPulseAsync(timestamp)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })

/*
{
  "pulse" : {
    "uri" : "https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54610",
    "version" : "Version 2.0",
    "cipherSuite" : 0,
    "period" : 60000,
    "certificateId" : "5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7",
    "chainIndex" : 1,
    "pulseIndex" : 54610,
    "timeStamp" : "2018-08-30T17:44:00.000Z",
    "localRandomValue" : "F6F8318BED4A7236330C81E948ACF4DBAFD7F3597A66683C95C731B391098823FE489358B5255FFC6FC429884F5749BEF296D1AD5D84B3DD96BAAA12FEDEC005",
    "external" : {
      "sourceId" : "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "statusCode" : 0,
      "value" : "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    },
    "listValues" : [ {
      "uri" : "https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54609",
      "type" : "previous",
      "value" : "20695B01257C5009EAB6CF7BF1F286EE7D825AC7B22E9F16AFCEE4F913BBCF4B707098DE4CBBD6788C9DC98F917E8C5B0F21EC926F348E2399C6459B57C6A4DA"
    }, {
      "uri" : "https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54566",
      "type" : "hour",
      "value" : "3935CB5E44B1AD0F3DE24694CFCC981B22B3521D9A31EA62B24E14853B9B7ACA5FBF548C0F54404A94ECE99739DCED1021AE830F08BF26B0B76399D75673926B"
    }, {
      "uri" : "https://beacon.nist.gov/beacon/2.0/chain/1/pulse/53546",
      "type" : "day",
      "value" : "F31907264F879C932A17547CCB2285540BA8DB9D5E797C9A047AD7FCA418C1BDFA679D3475EB6BB558285B166B661CEA0FFED8611B832C14B91264A914A2990D"
    }, {
      "uri" : "https://beacon.nist.gov/beacon/2.0/chain/1/pulse/11793",
      "type" : "month",
      "value" : "6774C12709D6514ABBC4B96D8A7AD5E73C5C68986B976A17ED4191452AF5098B1C390D6893D253DDA3C52B49BEFA4BB3E666F37EF6420F96974CAA1AF92FF5D7"
    }, {
      "uri" : "https://beacon.nist.gov/beacon/2.0/chain/1/pulse/1",
      "type" : "year",
      "value" : "7665F054F21B50DF62CD3E50AF8EB783E30D271B091DE051212D301E0E3D17FFCF0367DB41CFFD3C51E88BDE0B0621F49EB03435BC373D5D49480941A8B3547E"
    } ],
    "precommitmentValue" : "AF8C7965FBC15ED1F0F4C18659723D53E2648B1E6D152A3101798E59640CA59A8C83515A31E9AAEE0E942B276120AE500D0898C1FED272339BA847C7E0629049",
    "statusCode" : 0,
    "signatureValue" : "6C0BC22FB1C3422F0CDE311576A4B2C320E9E166E8FA0A729F451DD0D8A09D888FDAB1E84E8E68A4882F49E034AA8870B2EEFEC4B20C906B7D0F24D084D89136C89837116D7BFD33B5C45CAD96D38CEC76C05EBC764D92794353D376AC03B84E3FA837D02B6CD58283C16D2281867B3C045162C76527B9AC8958AE99582ADD6919C167446EEB254856AC6FF394A9865BB5E7552FF800907AFD29588EB475DF0CE515EE2A997C9289E8BDFD5CD8723F314F46B8C76ACBE2E951C764D48FDC99C9A07DB5EE8C75D076291B6BEA0A1ADA3A819E71AF423C47A1EB00AF66AAD1524EFD63BFAB4CECCB255DB06B510784C1A43884BDEFD77278A16863B2D29C2B763A142C1D01F8EB2BCE676D35ECB67B3E67102EA5F6DC9359DB87BA75D6B73B8E2750F7F1BF6774FA3A12C689B096C08E2BD816DE52AED735DE785EF46CDE320C692668B27949CA949F0B7DA9FEE3A0D7B5005E02FD246A461AF49732BCCA6DBDAF3E87C9E35B0BE8021E4E8A3E0559F2C9C980CBC55C649AF13D17B6A679DAD32FB4D320D75E6EB40B1A94549EA3921DFDCF415335B67E39BF4118DB20330E0F352F56AD417E4F01CA9FFB6B4260413C6AE83490C4D4382B9C6C7ED89E1545C4329CBE8C617FA8178DCC0BF035DB73B46D50204B7E9F340AD7F49C46E82185A53907AD7475933B76E61D0A47329ED200858CF8334DC0A122384C7546B2652667AD",
    "outputValue" : "274E031530B2C773494EBFD9827DF4B20BF83B65BCFC5107B97D7C307713E2FFB80C8FD3B7028F457783E88BB07BBD2BC190BC42BA3F56BA2E2F74E04D4E5E98"
  }
}
*/
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

/* global describe, it */

const beacon = require('../index')
const testTimestamp = 1535650993225

describe('getCertificateByIdAsync', function() {
  it('should return the expected value', function() {
    let certId =
      '5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7'
    let expectedValue =
      '-----BEGIN CERTIFICATE-----\r\n' +
      'MIIHWzCCBkOgAwIBAgIQCrOnD+Dvk39rGwz3xX6StTANBgkqhkiG9w0BAQsFADBE\r\n' +
      'MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMR4wHAYDVQQDExVE\r\n' +
      'aWdpQ2VydCBHbG9iYWwgQ0EgRzIwHhcNMTgwMTEwMDAwMDAwWhcNMTkwMTExMTIw\r\n' +
      'MDAwWjCBozELMAkGA1UEBhMCVVMxETAPBgNVBAgTCE1hcnlsYW5kMRUwEwYDVQQH\r\n' +
      'EwxHYWl0aGVyc2J1cmcxNzA1BgNVBAoTLk5hdGlvbmFsIEluc3RpdHV0ZSBvZiBT\r\n' +
      'dGFuZGFyZHMgYW5kIFRlY2hub2xvZ3kxEDAOBgNVBAsTB0lUTC9DU0QxHzAdBgNV\r\n' +
      'BAMTFmVuZ2luZS5iZWFjb24ubmlzdC5nb3YwggIiMA0GCSqGSIb3DQEBAQUAA4IC\r\n' +
      'DwAwggIKAoICAQDqdbhEDfBOCzCjW6cKBSKkkl8pc7v6VDDI21VAs5fOyZRoSwfW\r\n' +
      'tHc9YkVoYBaNTfmUBW5Q8hWbk65VftCznjEFIa05ldME/ABGKSkQKFyC3ELsE4+e\r\n' +
      'nkM1I9EJOt9dCSH9dSmzwjFf8C/fxhGqYEatH8GenuQ/FbU7shiigiqHUJU9SSVZ\r\n' +
      'trH4qV7szmcIBd/VzVTgLFipF8nl6EoScEIdgOC+ZmRo0LLfB/ulUT7iaXuzB0GP\r\n' +
      'ocMjwk4yfJgHNkHitgGMoDNYGVz4sU0QCtQSAXjjvwAMb+EzGBV08Zj2qNMEANKX\r\n' +
      'cvdRRA340t3oC6PbmeW+7w+IRo0to8AqhUlSAobmty6pOUzykEdhg/g6FKOowQEz\r\n' +
      'JZkhHd1/7Fh7XRHvc6EKz5tjAP+c5MUP9ni6O2N6uzrNbm94p0JmGk6DwJVWS0A1\r\n' +
      'l7M/xjON3aZN2f2ZSlezurBh9GBWENniHUsG/iOJdtjb+VE8VCr+J3Ltn62CfbgU\r\n' +
      '4aW+XbwHtZq+jtLzf2VKgHpeM4LKCzgQbhSbJNuuNCm2ib8PaS/f+kz+p9D8Rd/q\r\n' +
      'Te4/w03a+bqZRBcql8K7n73ysT+r595oos6AQujj4rgOHU7byZDLRGbMHPhox4OD\r\n' +
      'Dd7iYGhMHcfUez7FYJF0zNQafEt7iZP6U/PigtPoi3lJNPLcijbNcFNSowIDAQAB\r\n' +
      'o4IC5zCCAuMwHwYDVR0jBBgwFoAUJG4rLdBqklFRJWkBqppHponnQCAwHQYDVR0O\r\n' +
      'BBYEFB69FZvO+nhCyDuDd1uLZchw4+j3MCEGA1UdEQQaMBiCFmVuZ2luZS5iZWFj\r\n' +
      'b24ubmlzdC5nb3YwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMB\r\n' +
      'BggrBgEFBQcDAjB3BgNVHR8EcDBuMDWgM6Axhi9odHRwOi8vY3JsMy5kaWdpY2Vy\r\n' +
      'dC5jb20vRGlnaUNlcnRHbG9iYWxDQUcyLmNybDA1oDOgMYYvaHR0cDovL2NybDQu\r\n' +
      'ZGlnaWNlcnQuY29tL0RpZ2lDZXJ0R2xvYmFsQ0FHMi5jcmwwTAYDVR0gBEUwQzA3\r\n' +
      'BglghkgBhv1sAQEwKjAoBggrBgEFBQcCARYcaHR0cHM6Ly93d3cuZGlnaWNlcnQu\r\n' +
      'Y29tL0NQUzAIBgZngQwBAgIwdAYIKwYBBQUHAQEEaDBmMCQGCCsGAQUFBzABhhho\r\n' +
      'dHRwOi8vb2NzcC5kaWdpY2VydC5jb20wPgYIKwYBBQUHMAKGMmh0dHA6Ly9jYWNl\r\n' +
      'cnRzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydEdsb2JhbENBRzIuY3J0MAkGA1UdEwQC\r\n' +
      'MAAwggEFBgorBgEEAdZ5AgQCBIH2BIHzAPEAdgC72d+8H4pxtZOUI5eqkntHOFeV\r\n' +
      'CqtS6BqQlmQ2jh7RhQAAAWDgpJnPAAAEAwBHMEUCIQC1eW0bNSeOZNYU8Of5/oZr\r\n' +
      'fruiiiIYK/QKct/hCsXgdwIgS5/nMOviHGu2/FLTMkWFAva+wBVGNrsRdbD6yLoQ\r\n' +
      'BNgAdwCHdb/nWXz4jEOZX73zbv9WjUdWNv9KtWDBtOr/XqCDDwAAAWDgpJm5AAAE\r\n' +
      'AwBIMEYCIQCq1AvkODGe/zTX56kishId42HRCiEDa1/Wq8F9/DOabwIhAI5UbEeE\r\n' +
      'Q20nuadFVxpJgirXFYpAzjlr6/emIXRc5E1LMA0GCSqGSIb3DQEBCwUAA4IBAQAs\r\n' +
      'WjP0Sj4r2nHWLKi45aUwhS+WZzq3cDPa92QDP6LnFTtzUicPpOyLYcWOsc7SKyGi\r\n' +
      'BlWgxHp9vmoO+25gCXSbet42Yl1PXFhTpZcPHPxO/BknRGe9CY1pmOOyjsxwMZ8a\r\n' +
      'qH2He7anCpHk5AEfLX0F+WHjEtnYBrRhMM6GtftHXXxuAhGuH0zmzbwakREOoWNO\r\n' +
      'Q2iTFVBb9UybxHbl9r0rVD3x5FpRrTf90l5dhrERzhtjone/DtQU/5wRagRTKjeQ\r\n' +
      'VaCu59An0vNCJYVWPbOypZCRdbcKlcd3GoMx2DosfFcdgSLR1h9+O0y3DsonJgiT\r\n' +
      'Q2l+vxzeaIsZqUEYrLaq\r\n' +
      '-----END CERTIFICATE-----'

    return new Promise(async (resolve, reject) => {
      try {
        let cert = await beacon.getCertificateByIdAsync(certId)
        cert.should.equal(expectedValue)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
})

describe('getClosestPulseAsync', function() {
  it('should throw the proper error with a bad timestamp', function() {
    return new Promise(async (resolve, reject) => {
      try {
        await beacon.getClosestPulseAsync('bad')
        reject('no error thrown')
      } catch (error) {
        error.should.have.property('message', 'Invalid timestamp')
        resolve()
      }
    })
  })
  it('should return the expected value for the testTimestamp', function() {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await beacon.getClosestPulseAsync(testTimestamp)
        res.should.have.property('pulse')
        res.pulse.should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54610'
        )
        res.pulse.should.have.property('version', 'Version 2.0')
        res.pulse.should.have.property('cipherSuite', 0)
        res.pulse.should.have.property('period', 60000)
        res.pulse.should.have.property(
          'certificateId',
          '5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7'
        )
        res.pulse.should.have.property('chainIndex', 1)
        res.pulse.should.have.property('pulseIndex', 54610)
        res.pulse.should.have.property('timeStamp', '2018-08-30T17:44:00.000Z')
        res.pulse.should.have.property(
          'localRandomValue',
          'F6F8318BED4A7236330C81E948ACF4DBAFD7F3597A66683C95C731B391098823FE489358B5255FFC6FC429884F5749BEF296D1AD5D84B3DD96BAAA12FEDEC005'
        )
        res.pulse.should.have.property('external')
        res.pulse.external.should.have.property(
          'sourceId',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.external.should.have.property('statusCode', 0)
        res.pulse.external.should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.should.have.property('listValues')
        res.pulse.listValues.should.be.instanceof(Array).and.have.lengthOf(5)
        res.pulse.listValues[0].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54609'
        )
        res.pulse.listValues[0].should.have.property('type', 'previous')
        res.pulse.listValues[0].should.have.property(
          'value',
          '20695B01257C5009EAB6CF7BF1F286EE7D825AC7B22E9F16AFCEE4F913BBCF4B707098DE4CBBD6788C9DC98F917E8C5B0F21EC926F348E2399C6459B57C6A4DA'
        )
        res.pulse.listValues[1].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54566'
        )
        res.pulse.listValues[1].should.have.property('type', 'hour')
        res.pulse.listValues[1].should.have.property(
          'value',
          '3935CB5E44B1AD0F3DE24694CFCC981B22B3521D9A31EA62B24E14853B9B7ACA5FBF548C0F54404A94ECE99739DCED1021AE830F08BF26B0B76399D75673926B'
        )
        res.pulse.listValues[2].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/53546'
        )
        res.pulse.listValues[2].should.have.property('type', 'day')
        res.pulse.listValues[2].should.have.property(
          'value',
          'F31907264F879C932A17547CCB2285540BA8DB9D5E797C9A047AD7FCA418C1BDFA679D3475EB6BB558285B166B661CEA0FFED8611B832C14B91264A914A2990D'
        )
        res.pulse.listValues[3].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/11793'
        )
        res.pulse.listValues[3].should.have.property('type', 'month')
        res.pulse.listValues[3].should.have.property(
          'value',
          '6774C12709D6514ABBC4B96D8A7AD5E73C5C68986B976A17ED4191452AF5098B1C390D6893D253DDA3C52B49BEFA4BB3E666F37EF6420F96974CAA1AF92FF5D7'
        )
        res.pulse.listValues[4].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/1'
        )
        res.pulse.listValues[4].should.have.property('type', 'year')
        res.pulse.listValues[4].should.have.property(
          'value',
          '7665F054F21B50DF62CD3E50AF8EB783E30D271B091DE051212D301E0E3D17FFCF0367DB41CFFD3C51E88BDE0B0621F49EB03435BC373D5D49480941A8B3547E'
        )
        res.pulse.should.have.property(
          'precommitmentValue',
          'AF8C7965FBC15ED1F0F4C18659723D53E2648B1E6D152A3101798E59640CA59A8C83515A31E9AAEE0E942B276120AE500D0898C1FED272339BA847C7E0629049'
        )
        res.pulse.should.have.property('statusCode', 0)
        res.pulse.should.have.property(
          'signatureValue',
          '6C0BC22FB1C3422F0CDE311576A4B2C320E9E166E8FA0A729F451DD0D8A09D888FDAB1E84E8E68A4882F49E034AA8870B2EEFEC4B20C906B7D0F24D084D89136C89837116D7BFD33B5C45CAD96D38CEC76C05EBC764D92794353D376AC03B84E3FA837D02B6CD58283C16D2281867B3C045162C76527B9AC8958AE99582ADD6919C167446EEB254856AC6FF394A9865BB5E7552FF800907AFD29588EB475DF0CE515EE2A997C9289E8BDFD5CD8723F314F46B8C76ACBE2E951C764D48FDC99C9A07DB5EE8C75D076291B6BEA0A1ADA3A819E71AF423C47A1EB00AF66AAD1524EFD63BFAB4CECCB255DB06B510784C1A43884BDEFD77278A16863B2D29C2B763A142C1D01F8EB2BCE676D35ECB67B3E67102EA5F6DC9359DB87BA75D6B73B8E2750F7F1BF6774FA3A12C689B096C08E2BD816DE52AED735DE785EF46CDE320C692668B27949CA949F0B7DA9FEE3A0D7B5005E02FD246A461AF49732BCCA6DBDAF3E87C9E35B0BE8021E4E8A3E0559F2C9C980CBC55C649AF13D17B6A679DAD32FB4D320D75E6EB40B1A94549EA3921DFDCF415335B67E39BF4118DB20330E0F352F56AD417E4F01CA9FFB6B4260413C6AE83490C4D4382B9C6C7ED89E1545C4329CBE8C617FA8178DCC0BF035DB73B46D50204B7E9F340AD7F49C46E82185A53907AD7475933B76E61D0A47329ED200858CF8334DC0A122384C7546B2652667AD'
        )
        res.pulse.should.have.property(
          'outputValue',
          '274E031530B2C773494EBFD9827DF4B20BF83B65BCFC5107B97D7C307713E2FFB80C8FD3B7028F457783E88BB07BBD2BC190BC42BA3F56BA2E2F74E04D4E5E98'
        )
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
})

describe('getNextPulseAsync', function() {
  it('should throw the proper error with a bad timestamp', function() {
    return new Promise(async (resolve, reject) => {
      try {
        await beacon.getClosestPulseAsync('bad')
        reject('no error thrown')
      } catch (error) {
        error.should.have.property('message', 'Invalid timestamp')
        resolve()
      }
    })
  })
  it('should return the expected value for the testTimestamp', function() {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await beacon.getNextPulseAsync(testTimestamp)
        res.should.have.property('pulse')
        res.pulse.should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54610'
        )
        res.pulse.should.have.property('version', 'Version 2.0')
        res.pulse.should.have.property('cipherSuite', 0)
        res.pulse.should.have.property('period', 60000)
        res.pulse.should.have.property(
          'certificateId',
          '5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7'
        )
        res.pulse.should.have.property('chainIndex', 1)
        res.pulse.should.have.property('pulseIndex', 54610)
        res.pulse.should.have.property('timeStamp', '2018-08-30T17:44:00.000Z')
        res.pulse.should.have.property(
          'localRandomValue',
          'F6F8318BED4A7236330C81E948ACF4DBAFD7F3597A66683C95C731B391098823FE489358B5255FFC6FC429884F5749BEF296D1AD5D84B3DD96BAAA12FEDEC005'
        )
        res.pulse.should.have.property('external')
        res.pulse.external.should.have.property(
          'sourceId',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.external.should.have.property('statusCode', 0)
        res.pulse.external.should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.should.have.property('listValues')
        res.pulse.listValues.should.be.instanceof(Array).and.have.lengthOf(5)
        res.pulse.listValues[0].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54609'
        )
        res.pulse.listValues[0].should.have.property('type', 'previous')
        res.pulse.listValues[0].should.have.property(
          'value',
          '20695B01257C5009EAB6CF7BF1F286EE7D825AC7B22E9F16AFCEE4F913BBCF4B707098DE4CBBD6788C9DC98F917E8C5B0F21EC926F348E2399C6459B57C6A4DA'
        )
        res.pulse.listValues[1].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54566'
        )
        res.pulse.listValues[1].should.have.property('type', 'hour')
        res.pulse.listValues[1].should.have.property(
          'value',
          '3935CB5E44B1AD0F3DE24694CFCC981B22B3521D9A31EA62B24E14853B9B7ACA5FBF548C0F54404A94ECE99739DCED1021AE830F08BF26B0B76399D75673926B'
        )
        res.pulse.listValues[2].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/53546'
        )
        res.pulse.listValues[2].should.have.property('type', 'day')
        res.pulse.listValues[2].should.have.property(
          'value',
          'F31907264F879C932A17547CCB2285540BA8DB9D5E797C9A047AD7FCA418C1BDFA679D3475EB6BB558285B166B661CEA0FFED8611B832C14B91264A914A2990D'
        )
        res.pulse.listValues[3].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/11793'
        )
        res.pulse.listValues[3].should.have.property('type', 'month')
        res.pulse.listValues[3].should.have.property(
          'value',
          '6774C12709D6514ABBC4B96D8A7AD5E73C5C68986B976A17ED4191452AF5098B1C390D6893D253DDA3C52B49BEFA4BB3E666F37EF6420F96974CAA1AF92FF5D7'
        )
        res.pulse.listValues[4].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/1'
        )
        res.pulse.listValues[4].should.have.property('type', 'year')
        res.pulse.listValues[4].should.have.property(
          'value',
          '7665F054F21B50DF62CD3E50AF8EB783E30D271B091DE051212D301E0E3D17FFCF0367DB41CFFD3C51E88BDE0B0621F49EB03435BC373D5D49480941A8B3547E'
        )
        res.pulse.should.have.property(
          'precommitmentValue',
          'AF8C7965FBC15ED1F0F4C18659723D53E2648B1E6D152A3101798E59640CA59A8C83515A31E9AAEE0E942B276120AE500D0898C1FED272339BA847C7E0629049'
        )
        res.pulse.should.have.property('statusCode', 0)
        res.pulse.should.have.property(
          'signatureValue',
          '6C0BC22FB1C3422F0CDE311576A4B2C320E9E166E8FA0A729F451DD0D8A09D888FDAB1E84E8E68A4882F49E034AA8870B2EEFEC4B20C906B7D0F24D084D89136C89837116D7BFD33B5C45CAD96D38CEC76C05EBC764D92794353D376AC03B84E3FA837D02B6CD58283C16D2281867B3C045162C76527B9AC8958AE99582ADD6919C167446EEB254856AC6FF394A9865BB5E7552FF800907AFD29588EB475DF0CE515EE2A997C9289E8BDFD5CD8723F314F46B8C76ACBE2E951C764D48FDC99C9A07DB5EE8C75D076291B6BEA0A1ADA3A819E71AF423C47A1EB00AF66AAD1524EFD63BFAB4CECCB255DB06B510784C1A43884BDEFD77278A16863B2D29C2B763A142C1D01F8EB2BCE676D35ECB67B3E67102EA5F6DC9359DB87BA75D6B73B8E2750F7F1BF6774FA3A12C689B096C08E2BD816DE52AED735DE785EF46CDE320C692668B27949CA949F0B7DA9FEE3A0D7B5005E02FD246A461AF49732BCCA6DBDAF3E87C9E35B0BE8021E4E8A3E0559F2C9C980CBC55C649AF13D17B6A679DAD32FB4D320D75E6EB40B1A94549EA3921DFDCF415335B67E39BF4118DB20330E0F352F56AD417E4F01CA9FFB6B4260413C6AE83490C4D4382B9C6C7ED89E1545C4329CBE8C617FA8178DCC0BF035DB73B46D50204B7E9F340AD7F49C46E82185A53907AD7475933B76E61D0A47329ED200858CF8334DC0A122384C7546B2652667AD'
        )
        res.pulse.should.have.property(
          'outputValue',
          '274E031530B2C773494EBFD9827DF4B20BF83B65BCFC5107B97D7C307713E2FFB80C8FD3B7028F457783E88BB07BBD2BC190BC42BA3F56BA2E2F74E04D4E5E98'
        )
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
})

describe('getPreviousPulseAsync', function() {
  it('should throw the proper error with a bad timestamp', function() {
    return new Promise(async (resolve, reject) => {
      try {
        await beacon.getClosestPulseAsync('bad')
        reject('no error thrown')
      } catch (error) {
        error.should.have.property('message', 'Invalid timestamp')
        resolve()
      }
    })
  })
  it('should return the expected value for the testTimestamp', function() {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await beacon.getPreviousPulseAsync(testTimestamp)
        res.should.have.property('pulse')
        res.pulse.should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54609'
        )
        res.pulse.should.have.property('version', 'Version 2.0')
        res.pulse.should.have.property('cipherSuite', 0)
        res.pulse.should.have.property('period', 60000)
        res.pulse.should.have.property(
          'certificateId',
          '5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7'
        )
        res.pulse.should.have.property('chainIndex', 1)
        res.pulse.should.have.property('pulseIndex', 54609)
        res.pulse.should.have.property('timeStamp', '2018-08-30T17:43:00.000Z')
        res.pulse.should.have.property(
          'localRandomValue',
          'D6CB94B5850D45DEECDE6558DFA9CB74B44136043A4027BB1B70CF931122F010CB962AE6E82B46508377574BC0A8E23EE394612FF49FE8577D82385AFB24E19C'
        )
        res.pulse.should.have.property('external')
        res.pulse.external.should.have.property(
          'sourceId',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.external.should.have.property('statusCode', 0)
        res.pulse.external.should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.should.have.property('listValues')
        res.pulse.listValues.should.be.instanceof(Array).and.have.lengthOf(5)
        res.pulse.listValues[0].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54608'
        )
        res.pulse.listValues[0].should.have.property('type', 'previous')
        res.pulse.listValues[0].should.have.property(
          'value',
          '758EEDD4AFC6BC3693CC2CD367E4A4CDA7E6B033EE33EBE543D335F370CD35EFEAF5343B1FAFE4F7DA0EECA7882E7668E5C61DD98B55AFF4D6161ED87D0479F3'
        )
        res.pulse.listValues[1].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/54566'
        )
        res.pulse.listValues[1].should.have.property('type', 'hour')
        res.pulse.listValues[1].should.have.property(
          'value',
          '3935CB5E44B1AD0F3DE24694CFCC981B22B3521D9A31EA62B24E14853B9B7ACA5FBF548C0F54404A94ECE99739DCED1021AE830F08BF26B0B76399D75673926B'
        )
        res.pulse.listValues[2].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/53546'
        )
        res.pulse.listValues[2].should.have.property('type', 'day')
        res.pulse.listValues[2].should.have.property(
          'value',
          'F31907264F879C932A17547CCB2285540BA8DB9D5E797C9A047AD7FCA418C1BDFA679D3475EB6BB558285B166B661CEA0FFED8611B832C14B91264A914A2990D'
        )
        res.pulse.listValues[3].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/11793'
        )
        res.pulse.listValues[3].should.have.property('type', 'month')
        res.pulse.listValues[3].should.have.property(
          'value',
          '6774C12709D6514ABBC4B96D8A7AD5E73C5C68986B976A17ED4191452AF5098B1C390D6893D253DDA3C52B49BEFA4BB3E666F37EF6420F96974CAA1AF92FF5D7'
        )
        res.pulse.listValues[4].should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/1'
        )
        res.pulse.listValues[4].should.have.property('type', 'year')
        res.pulse.listValues[4].should.have.property(
          'value',
          '7665F054F21B50DF62CD3E50AF8EB783E30D271B091DE051212D301E0E3D17FFCF0367DB41CFFD3C51E88BDE0B0621F49EB03435BC373D5D49480941A8B3547E'
        )
        res.pulse.should.have.property(
          'precommitmentValue',
          '88C34D192954E0829524C6DC5098C37DE17A875EE1B2575BE07D388B5244917765B256B6DED0F6BB1C66BEE325324D9092416CAFC550A45C4E84DCEE2E6D1003'
        )
        res.pulse.should.have.property('statusCode', 0)
        res.pulse.should.have.property(
          'signatureValue',
          'B6601661B8816124FA2DFC56DC860B4C933F7FE26C361227D9145648D6F06FFFED76F0FF2E0D46BA7910F38683AE1F42947A0C9068F6C316AF750E6285236EEF460C02F5515637F47E3492DB3E3533E546310519F08303A3DE770872DDAD806580EBE18CFE6B543A7F6A8789694B2576AA3C2F3EE31A743AA9E7A05265EB7648620C580E174FE3DB5CC5A97BB3824E7863F5EB32328BD4169AB9504FE3BE97F0F59DD003F920558C376A3FF95BB977D038A7952D5D98E64244D42187DA0AAEE52B927BB6648BBEB338E06A522CE51D89B9800B02FF82BB6BBB695FBECE63F3F1893E1D451F6BE1ABD1631FF29F242F6747118A3FBE5CF1BDBBEFF76191C0C01080B8A0A5A4AB171E72291C5318BF437979172BF0930C8F7FEF7992F86A13CA048DFF88EFFF46900BDCCE998319A50F9E6B35EB5994E41DFBD9A1B309F13A8D9D51AE996B5E4A6823725F0D9983872DF387D2F242E2F685FAB4A7A7BB6EC7441BFC2FCA04127CD6E30CBE0B40F900B7A02129254848B80E99560FDD00EDD76ED327F11CDE26F810BB5EE6FFCCCABCA54347D5B7021AD3646F6942B79B985AE33C3BAC94DF7967ACC1CD185BC5B635C666C9CF95A425783917863B5738DA9715D110B9DA60B9E04C3A5A088736267DB270CFF6D34BB1F36E7FFD5207943EFC23D65C321D0F014516BF7A6F6A7ED133FA7F69EDCE0F626DF8C3A334453FC56396B1'
        )
        res.pulse.should.have.property(
          'outputValue',
          '20695B01257C5009EAB6CF7BF1F286EE7D825AC7B22E9F16AFCEE4F913BBCF4B707098DE4CBBD6788C9DC98F917E8C5B0F21EC926F348E2399C6459B57C6A4DA'
        )
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
})

describe('getMostRecentPulseAsync', function() {
  it('should return the most recent pulse', function() {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await beacon.getMostRecentPulseAsync()
        res.should.have.property('pulse')
        res.pulse.should.have.property('uri')
        res.pulse.should.have.property('version', 'Version 2.0')
        res.pulse.should.have.property('cipherSuite')
        res.pulse.should.have.property('period')
        res.pulse.should.have.property('certificateId')
        res.pulse.should.have.property('chainIndex')
        res.pulse.should.have.property('pulseIndex')
        res.pulse.should.have.property('timeStamp')
        res.pulse.should.have.property('localRandomValue')
        res.pulse.should.have.property('external')
        res.pulse.external.should.have.property('sourceId')
        res.pulse.external.should.have.property('statusCode')
        res.pulse.external.should.have.property('value')
        res.pulse.should.have.property('listValues')
        res.pulse.listValues.should.be.instanceof(Array).and.have.lengthOf(5)
        res.pulse.listValues[0].should.have.property('uri')
        res.pulse.listValues[0].should.have.property('type', 'previous')
        res.pulse.listValues[0].should.have.property('value')
        res.pulse.listValues[1].should.have.property('uri')
        res.pulse.listValues[1].should.have.property('type', 'hour')
        res.pulse.listValues[1].should.have.property('value')
        res.pulse.listValues[2].should.have.property('uri')
        res.pulse.listValues[2].should.have.property('type', 'day')
        res.pulse.listValues[2].should.have.property('value')
        res.pulse.listValues[3].should.have.property('uri')
        res.pulse.listValues[3].should.have.property('type', 'month')
        res.pulse.listValues[3].should.have.property('value')
        res.pulse.listValues[4].should.have.property('uri')
        res.pulse.listValues[4].should.have.property('type', 'year')
        res.pulse.listValues[4].should.have.property('value')
        res.pulse.should.have.property('precommitmentValue')
        res.pulse.should.have.property('statusCode')
        res.pulse.should.have.property('signatureValue')
        res.pulse.should.have.property('outputValue')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
})

describe('getPulseByChainAndPulseIndexAsync', function() {
  it('should throw the proper error with a bad chainIndex', function() {
    return new Promise(async (resolve, reject) => {
      try {
        await beacon.getPulseByChainAndPulseIndexAsync('bad', 1)
        reject('no error thrown')
      } catch (error) {
        error.should.have.property('message', 'Invalid chainIndex')
        resolve()
      }
    })
  })
  it('should throw the proper error with a bad pulseIndex', function() {
    return new Promise(async (resolve, reject) => {
      try {
        await beacon.getPulseByChainAndPulseIndexAsync(1, 'bad')
        reject('no error thrown')
      } catch (error) {
        error.should.have.property('message', 'Invalid pulseIndex')
        resolve()
      }
    })
  })
  it('should return the expected value for the pulse at index 1 on chain 1', function() {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await beacon.getPulseByChainAndPulseIndexAsync(1, 1)
        res.should.have.property('pulse')
        res.pulse.should.have.property(
          'uri',
          'https://beacon.nist.gov/beacon/2.0/chain/1/pulse/1'
        )
        res.pulse.should.have.property('version', 'Version 2.0')
        res.pulse.should.have.property('cipherSuite', 0)
        res.pulse.should.have.property('period', 60000)
        res.pulse.should.have.property(
          'certificateId',
          '5501e3d72bc42f3b96e16de4dcadcb16768e109662bd16d667d5fd9aee585af31bbdc5dd4f53592276064b53dddd76c8f3604b2a41db6e09f78f82bb5d6569e7'
        )
        res.pulse.should.have.property('chainIndex', 1)
        res.pulse.should.have.property('pulseIndex', 1)
        res.pulse.should.have.property('timeStamp', '2018-07-23T19:26:00.000Z')
        res.pulse.should.have.property(
          'localRandomValue',
          '88C3BF231794D4D6654924EF771268AF1DA9C2D6A3EA62A79C42D6399CD9DE811C5C32CA71DE2EC867510A8CE44BE6D8694488BE530C02EEB602D8703A4D294F'
        )
        res.pulse.should.have.property('external')
        res.pulse.external.should.have.property(
          'sourceId',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.external.should.have.property('statusCode', 0)
        res.pulse.external.should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.should.have.property('listValues')
        res.pulse.listValues.should.be.instanceof(Array).and.have.lengthOf(5)
        res.pulse.listValues[0].should.have.property('uri', null)
        res.pulse.listValues[0].should.have.property('type', 'previous')
        res.pulse.listValues[0].should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.listValues[1].should.have.property('uri', null)
        res.pulse.listValues[1].should.have.property('type', 'hour')
        res.pulse.listValues[1].should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.listValues[2].should.have.property('uri', null)
        res.pulse.listValues[2].should.have.property('type', 'day')
        res.pulse.listValues[2].should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.listValues[3].should.have.property('uri', null)
        res.pulse.listValues[3].should.have.property('type', 'month')
        res.pulse.listValues[3].should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.listValues[4].should.have.property('uri', null)
        res.pulse.listValues[4].should.have.property('type', 'year')
        res.pulse.listValues[4].should.have.property(
          'value',
          '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
        )
        res.pulse.should.have.property(
          'precommitmentValue',
          '6462C73A8D4913910C5AAA748EA82CD67EB4B73D2B3025121AA61354916CA65B9D25FD5FBECE2583E7C5EB172ECF2740472935A7A9013E6E7C84A9EBD6EFFA15'
        )
        res.pulse.should.have.property('statusCode', 1)
        res.pulse.should.have.property(
          'signatureValue',
          '8FD04C3CB2631064C7917C98B606870D6A38C7CFD05CB589EB5F139471F07C8D553B997B583EC14648A1ECACDF0C0ED5E7C8F888E7F1DAF8D34E697B8A64A969DB92DBC8D49A4085AFA6CA068667677E6442F6E368458DE7E32490BD6C80F79276A1EBBD602B8379936758444214A3B8B5C3BF70A21CF4FD468B6C69717CC779CFA2D195ADB9F95139BB334E441D0633A18B7475FAEF4CDDF0F1E04FC84B1497EFE544B2F16F6BDD533E6DA444517FBB4A6C016845CF3367E296097B469A3AE6A19C30669DE37BCA1984C5410E631FFEB6DA1CF12654C98B5062C681D49594682938DF1C0E76A08B8F1896FDAB79A2AF4B8E12BD1127E4C8C046E7CA5F02359342114DCC7A9178937865B004BA86B2995045AA8F5505D4824C9855218F44AE83A99DE091DE619E1D6CA9E8A0C7E3E1ACBD3BC1E6354087EA5306328541D77B9E68364EA9FA747C3794F1B90A77350FE5A7DE0B6907339D2C9A3C57A07AECD70EC71CD5371AEE203934A472E5A7FFCB31B01EFF52374D5A7BFA55E8722843ADBBD63183BEE5565C01F51DB47069DA5007D1CF76FDA9070EAF4A12929A66190FC594377D60044F4E1809BD297CB540A90FFEE22F14F8C2754A7F256A5CA07AB451366102ECC7DFF8642CAEE1AFCF0147ECA24C79E9163B6E9FB262D179690F2460F269C3B209FE67737A60DB98B807E1E3147F3A8BBB482BE4BA93372508AD837A'
        )
        res.pulse.should.have.property(
          'outputValue',
          '7665F054F21B50DF62CD3E50AF8EB783E30D271B091DE051212D301E0E3D17FFCF0367DB41CFFD3C51E88BDE0B0621F49EB03435BC373D5D49480941A8B3547E'
        )
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
})

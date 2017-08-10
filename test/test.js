'use strict'

const beacon = require('../index')

describe('beacon.current known value', function () {
  it('callback', function (done) {
    beacon.current(1493245860, function (err, res) {
      if (err !== null) done(err)
      res.should.have.property('version', 'Version 1.0')
      res.should.have.property('frequency', 60)
      res.should.have.property('timeStamp', 1493245860)
      res.should.have.property('timeStampISO8601', '2017-04-26T22:31:00.000Z')
      res.should.have.property('seedValue', '5367784CAC9A9D65264256A15BD3373F7C1982FFEB42B3B5427E3F5E358765E9E2474D6DCB0FC552DD3F4CF8AC3D169E1F31C12CCACD4765BCAE8AFDFC7448B9')
      res.should.have.property('previousOutputValue', 'ABE8C2106EEE15255A43C752CBE33C833B16D7120CAED143D1005275DDD1E5F4E16F0B1DEB1A02D4169D8B116D8A66C6AB7A788607D343D9B7164069B5DE07D2')
      res.should.have.property('signatureValue', '07DF220FC6D4768EBE41B66535F72CAD7BDAFFB9B871F64BCBB817D2FC43E8DC49F60D79BDEA3D9F39F80DA57B23E246806C4ECBA5FE76DE4EAA3E1F06B328FD34AA3369367CFAA5046C793E633C12B37C9834FDDB181BFCE252C130817991987669175E6E331179ABDB3264A6EF6A3145860B35257F49E244F18F6D9371935BB812B503FBE9A73FAE852514D396877817C9592535FAF42D596BF339AFD37263DA1C8E3DCEDE5C8D13C68EC2CB455E4ABF3C4E8769D44801B167362ACFE3117584DE3B23AA558F22D1358BAE7BA3CC2B73DFB3457DBCF66DBB9898880FC5AF906EA7E595FAC1E5F359A731935735E52F36186DACA904819D0C217351B8A97681')
      res.should.have.property('outputValue', '46D88151C915BD3DD65F0401BB7775D55AB0731170262084A20030C00C0A66D8DAA693E49DCE61F86C7AD176CC0EBEB1338ED0DA6A69994711C39718C98C4BDF')
      res.should.have.property('statusCode', 0)
      res.should.have.property('validSignature', true)
      done()
    })
  })

  // The beacon is currently signing with invalid signatures :-(
  it('callback', function (done) {
    beacon.last(function (err, res) {
      if (err !== null) done(err)
      res.should.have.property('validSignature', false)
      done()
    })
  })
})

var beacon = require('../index.js')

let ts = beacon.timestampInSecondsMinutesAgo(10)

beacon.current(ts, function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log(res)
  }
})

beacon.previous(ts, function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log(res)
  }
})

beacon.next(ts, function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log(res)
  }
})

beacon.last(function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log(res)
  }
})

beacon.startChain(ts, function (err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log(res)
  }
})

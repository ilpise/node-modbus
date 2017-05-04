'use strict'

let modbus = require('../../')
let SerialPort = require('serialport')
let socket = new SerialPort('/dev/ttyUSB0', { baudRate: 57600 })
let client = new modbus.client.Serial(socket)

socket.on('open', function () {
  client.readCoils(process.argv[4], process.argv[5])
    .then(function (resp) {
      console.log(resp)
      socket.end()
    }).catch(function () {
      console.error(arguments)
      socket.end()
    })
})

socket.on('error', console.error)


const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const serialport = new SerialPort("/dev/cu.usbmodem143101", {
    baudRate: 115200
});

const readParser = serialport.pipe(new Readline({ delimiter: "\r\n" }));
readParser.on("data", console.log);

// const Ready = require("@serialport/parser-ready");
const readyParser = serialport.pipe(new Ready({ delimiter: "\r\n" }));
readyParser.on("ready", message => {
    console.log("ready", message);
});

// setTimeout(() => {
//     console.log("****** SEND *********");
//     port.write("a");
// }, 8000);
// setTimeout(() => {
//     console.log("****** SEND *********");
//     port.write("a");
// }, 16000);
// var SerialPort = serialport.SerialPort;
// // Open the port
// var port = new SerialPort("/dev/cu.usbmodem144101", {
//     baudrate: 115200,
//     parser: serialport.parsers.readline("\n")
// });
// // Read the port data
// port.on("open", function() {
//     console.log("open");
//     port.on("data", function(data) {
//         console.log(data);
//     });
// });

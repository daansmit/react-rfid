const io = require('socket.io')();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Serial

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const serialport = new SerialPort("/dev/cu.usbmodem141101", {
    baudRate: 9600
});

const readParser = serialport.pipe(new Readline({ delimiter: "\r\n" }));
// console.log('start reading');
// readParser.on("data", message => { console.log('message: ', message); });


// Socket

io.on('connection', (client) => {
    console.log('connection opened');
    let data = '-';
    readParser.on("data", message => {
        console.log('new data: ', message);
        data = message;
    });
    
    client.on('subscribeToTimer', (interval) => {
      console.log('client is subscribing to timer with interval ', interval);
      setInterval(() => {
          console.log('interval', data);
        client.emit('timer', data);
        data = '-';
      }, interval);
    });
  });
const ioPort = 8000;
io.listen(ioPort);
console.log('listening on port ', ioPort);

// API

app.get("/api/hello", (req, res) => {
    res.send({ express: "Hello From Express" });
});
app.post("/api/world", (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${
            req.body.post
        }`
    );
});
app.post("/api/write", (req, res) => {
    console.log(req.body);
    port.write(req.body.post);
    res.send(
        `I received your POST request. This is what you sent me: ${
            req.body.post
        }`
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// require("./serial.js");

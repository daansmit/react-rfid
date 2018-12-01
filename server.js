const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const serialport = new SerialPort("/dev/cu.usbmodem143101", {
    baudRate: 115200
});

const readParser = serialport.pipe(new Readline({ delimiter: "\r\n" }));
readParser.on("data", console.log);

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

require("./serial.js");

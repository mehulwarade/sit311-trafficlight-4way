var express = require("express");
var tarfficLight = require('./TrafficLight.js');
const app = express();

app.get('/start', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    tarfficLight.startSimulation();
    return res.send('{"message":"Simulation is started"}');
});
app.get('/stop', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // tarfficLight.stopSimulation();
    return res.send('{"message":"Simulation is terminated"}');
});
app.get('/state', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    //console.log(tarfficLight.state);
    //return res.send(JSON.stringify(tarfficLight.state));
    res.send(tarfficLight.state);
});

app.get('/web', (req, res) => {
    res.sendFile(`./web.html`);
});

app.listen(3005, () =>
    console.log('Example app listening on port 3005!'),
);
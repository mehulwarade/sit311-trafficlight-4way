const awsIot = require('aws-iot-device-sdk');

const device = awsIot.device({
    certPath: '07b8258f85-certificate.pem.crt',
    keyPath: '07b8258f85-private.pem.key',
    caPath: 'AmazonRootCA1.pem.txt',
    clientId: 'traffic-light',
    host: 'a2plz9gg222mwz-ats.iot.us-east-1.amazonaws.com'
});
/*
device.on(
    'connect', () => {
        console.log('connected');

        device.publish('test', 'hello IoT Core');
        console.log('Message Sent');
        device.subscribe('ChangeState');
    }
);

device.on('message', (topic, payload) => {
    console.log('message', topic, payload.toString());
});
*/
device.on(
    'connect', () => {
        console.log('connected');
        //device is connected
        isConnected = true;
        device.subscribe('ChangeState');
    }
);

device.on('message', (topic, payload) => {
    //if the current state is red, change it to green or vica versa.
    state.state = state.state === 'RED' ? 'GREEN' : 'RED';
    console.log('message', topic, payload.toString());
});



//store state of the traffic light
let state = { state: 'RED', numberOfCars: 6 };
//store is device is connected or not
let isConnected = false;
//store a reference carSimulation method callback
let timeout = null;
//generates a random number between low and high
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}
//This method start the simulation when the device is connected. Otherwise, it will wait for 1 seconds and check again.
function startSimulation() {
    if (isConnected){
        console.log("Starting simulation");
        simulateCars();
    }
    else {
        setTimeout(startSimulation, 1000);
        console.log('not connected');
    }
}
//This method is used for stopping the simulation.
function stopSimulation() {
    //stop the simulation
    console.log("Stopping simulation");
    clearTimeout(timeout);
}
//this method simulates the number of cars waiting behind the traffic light
function simulateCars() {
    console.log(state);
    //Simulates the number of cars waiting behind a traffic light
    state.numberOfCars = Math.max(0, state.numberOfCars + (state.state ===
        'RED' ? 1 : -1) * randomInt(1, 5));;
    //Send an MQTT message with the current state to the AWS
    device.publish('NumberOfCars', JSON.stringify(state));
    //Callback; recalcuate the number of waiting cars in 5 seconds
    timeout = setTimeout(simulateCars, 5000);
}

module.exports = {
    state: state,
    startSimulation : startSimulation,
    stopSimulation: stopSimulation
}   
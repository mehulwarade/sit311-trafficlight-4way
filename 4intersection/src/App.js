import React from 'react';
import './App.css';
let i = 0;
let timeout = setInterval(update, 1000);
let z=6;
var showcars = ['',
    '#',
    '##',
    '###',
    '####',
    "#####",
    '######',
    '#######',
    '########',
    '#########',
    "##########",
    "###########",
    "############",
    "#############",
    "##############",
    "###############",
]

function update() {
    //stop the simulation
    //console.log("Stopping simulation");
    //console.log(i);
    if (i === 1000) {
        clearTimeout(timeout);
    }
    else {
        /*document.getElementById("state").innerHTML =i ;
        document.getElementById("noofcar").innerHTML = i+10;  */

        fetch('http://localhost:3005/state')
            .then(response => response.json())
            .then(data => {
                document.getElementById("statergt").innerHTML = JSON.stringify(data.state);
                //document.getElementById("noofcar").innerHTML = JSON.stringify(data.numberOfCars);
                document.getElementById("noofcarrgt").innerHTML = showcars[data.numberOfCars] + ' { ' + JSON.stringify(data.numberOfCars) + ' }';

                document.getElementById("statelft").innerHTML = JSON.stringify(data.state);
                document.getElementById("noofcarlft").innerHTML = showcars[data.numberOfCars] + ' { ' + JSON.stringify(data.numberOfCars) + ' }';
                
                
                if(data.state === 'RED'){
                    
                    var abc = Math.max(0, data.numberOfCars + (data.state === 'RED' ? 1 : -1) * randomInt(1, data.numberOfCars));;
                    document.getElementById("statetop").innerHTML = "GREEN";
                    document.getElementById("noofcartop").innerHTML = showcars[abc] + ' { ' + abc + ' }';
                    console.log("z :::" + z);
                    console.log("GREEN ::: abc :::" + abc);
                }
                else{
                    var abcd = Math.max(0, data.numberOfCars + (data.state === 'RED' ? 1 : -1) * randomInt(1, data.numberOfCars));;
                    document.getElementById("statetop").innerHTML = "RED";
                    document.getElementById("noofcartop").innerHTML = showcars[abcd] + ' { ' + abcd + ' }';
                    console.log("z :::" + z);
                    console.log("RED ::: abc :::" + abc);
                
                }
                
                //var abc = Math.max(0, data.numberOfCars + (data.state === 'RED' ? 1 : -1) * randomInt(1, 5));;
                //console.log(abc);
                //console.log("State:" + JSON.stringify(data));
            })
            .catch(error => {
                console.log(error);
            })



        i++;
    }

}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}

class App extends React.Component {
    render() {
        return (
            <div className="App" >
                <header className="App-header" >
                    <input class="button buttonstart"
                        onClick={this.ButtonclickStart}
                        value={'Start Simulation'} />
                    <input class="button buttonstate"
                        onClick={this.ButtonclickState}
                        value={'Simulation State'} />
                    <input class="button buttonstop"
                        onClick={this.ButtonclickStop}
                        value={'Stop Simulation'} />

                    <table>
                        <tr>
                            <td>State</td>
                            <td id="state"></td>
                        </tr>
                        <tr>
                            <td>Number of Cars</td>
                            <td id="noofcar"></td>
                        </tr>
                    </table>


                    <table class="top">
                        <tr>
                            <td></td>
                            <td style={{ height: '75px' }} id="statetop"></td>
                        </tr>
                        <tr>
                            <td style={{ height: '200px' }} id="noofcartop"></td>
                            <td></td>

                        </tr>
                    </table>
                    <table class="hori">
                        <tr>
                            <td></td>
                            <td style={{ width: '75px' }} id="statelft"></td>
                            <td></td>
                            <td></td>
                            <td style={{ width: '200px' }} id="noofcarrgt"></td>

                        </tr>
                        <tr>
                            <td style={{ width: '200px' }} id="noofcarlft"></td>
                            <td></td>
                            <td style={{ width: '100px' }}></td>
                            <td style={{ width: '75px' }} id="statergt"></td>
                            <td></td>

                        </tr>
                    </table>

                    <table class="top">
                        <tr>
                            <td></td>
                            <td style={{ height: '75px' }} id="statebtm"></td>
                        </tr>
                        <tr>
                            <td style={{ height: '200px' }} id="noofcarbtm"></td>
                            <td></td>

                        </tr>
                    </table>

                </header >
                <body >
                </body>
            </div >
        );
    }

    ButtonclickStart = () => {
        fetch(`http://localhost:3005/start`)
            .then(response => response.json())
            .then(data => {
                console.log("Starting Simulation");
            })
            .catch(error => {
                console.log(error);
            })
    }

    ButtonclickStop = () => {
        fetch(`http://localhost:3005/stop`)
            .then(response => response.json())
            .then(data => {
                console.log("Stopping Simulation");
            })
            .catch(error => {
                console.log(error);
            })
    }

    ButtonclickState = () => {
        fetch('http://localhost:3005/state')
            .then(response => response.json())
            .then(data => {
                document.getElementById("state").innerHTML = JSON.stringify(data.state);
                document.getElementById("noofcar").innerHTML = JSON.stringify(data.numberOfCars);
                console.log("State:" + JSON.stringify(data));
            })
            .catch(error => {
                console.log(error);
            })
    }

}
export default App;

import React, { useEffect, useState } from "react";
// import { // (keeping structure for future anesthesia information)
// }
//import "../CSS/variables";
import { HourlyBaseAnesthesia } from "../Functions/FakePatient";
import "../CSS/Dashboard.css";
import {useLocation} from "react-router-dom";
import LineChartPlotly from "./LineChartPlotly";
function AnesthesiaChart(props) {
    const location = useLocation();
    const patient = location.state.patient;
    const [anesthesiaHourly, setHourly] = useState(HourlyBaseAnesthesia(patient.weight));  // setting hourly Anesthesia
    const [Display, setDisplay] = useState(false);  // display is off 
    const [anesthesiaInterval, setAnesthesiaInterval] = useState(anesthesiaHourly/60);  // this is anesthesia intervals

    useEffect(() => {
        if (Display) {
            let anesthesiaInterval = setInterval(() => {
                props.setHourly(HourlyBaseAnesthesia(patient.weight) / 60);  // setting to 100 kg for testing
            }, 500);
        }
    }, [Display]);

    if (Display) {
        return (
            <div className="anesthesiaContainer">
                <h2 className="titalAnesthesia">Automated Anesthesia</h2>
                {/* We are using one thing to determine the hourly rate of
                    Anesthesia. This is only the maintenence amount so far,
                    not including surgery or if they are NPO (not by mouth)*/}
                <div className="data">
                    <p>Patient Connected</p>
                    <p>Weight: {patient.weight}</p>  
                </div>
                <div class="centerObjectDash">
                    <LineChartPlotly title={"Anesthesia"} data={HourlyBaseAnesthesia(patient.weight)/60}/>
                    <button
                        class="button-72"
                        role="button"
                        onClick={() => {
                            clearInterval(anesthesiaInterval);
                            setDisplay(false);
                            props.setConnected(false);
                        }}
                    >
                        Turn off Anesthesia
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div class="anesthesia-containter">
                <h2>Anesthesia Connection</h2>
                <p>Patient Not Being Administered Anesthesia</p>
                <button
                    class="button-72"
                    role="button"
                    onClick={() => {
                        setInterval(anesthesiaInterval);
                        setDisplay(true);
                        props.setConnected(true);
                    }}
                >
                    Administer Anesthesia
                </button>
            </div>
        );
    }
}

export default AnesthesiaChart;
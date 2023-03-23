import React, { useEffect, useState } from "react";
import {
  HeartRate,
  BloodPressure,
  Respiration,
  HourlyBaseAnesthesia,
} from "../Functions/FakePatient.js";
import "../CSS/Dashboard.css";

//import "../CSS/variables";

function Vitals(props) {
  var anesthesiaAmount = 0;
  const [hr, setHR] = useState(80);
  const [bp, setBP] = useState({ sys: 120, dia: 80 });
  const [anesth, setAnesth] = useState(0);
  const [Display, setDisplay] = useState(false);
  const [hrInterval, setHrInterval] = useState();
  const [respInterval, setRespInterval] = useState();
  const [anesthInterval, setAnesthInterval] = useState();
  const [resp_S, setResp_S] = useState(0);
  useEffect(() => {
    let HRinterval = setInterval(() => {}, 1000);
    let RespInterval = setInterval(() => {}, 500);
    let anesthInterval = setInterval(() => {}, 1000);
    let BPInterval = setInterval(() => {}, 1000);
    if (Display) {
      // generates heartrate data
      HRinterval = setInterval(() => {
        let tmpHR = HeartRate();
        props.sethr(tmpHR);
        setHR(tmpHR);
      }, 1000);
      setHrInterval(HRinterval);

      // separated because respiration should be smoother than the above
      let s = resp_S;
      RespInterval = setInterval(() => {
        s += 0.5;
        setResp_S(s);
        props.setresp(Respiration(s));
      }, 500); // poll respiration every half second
      setRespInterval(RespInterval);

      // generates anesthesia data
      anesthesiaAmount -= 0.3; // unused
      anesthInterval = setInterval(() => {
        //anesthesiaAmount += .3;
        let tmpAnesth = HourlyBaseAnesthesia(props.patientWeight) / 600; // idk why we divide by 600
        props.setAnesth(tmpAnesth);
        setAnesth(tmpAnesth);
      }, 1000);
      setAnesthInterval(anesthInterval / 3600);

      BPInterval = setInterval(() => {
        let tmpBP = BloodPressure(anesth);
        setBP(tmpBP);
      }, 2000);
    }
    // clear intervals
    return () => {
      // solves exponential incrementing problem
      clearInterval(HRinterval);
      clearInterval(RespInterval);
      clearInterval(anesthInterval);
      clearInterval(BPInterval);
    };
  }, [Display]);

  if (Display) {
    return (
      <div className="vitals-container">
        <h2 className="titalVitals">Vitals</h2>
        <div className="numbers">
          <div>
            <span>HR:</span> <span>{hr}</span>
          </div>
          <div>
            <span>Systolic:</span>
            <span> {bp.sys}</span>
          </div>
          <div>
            <span>Diastolic:</span>
            <span> {bp.dia}</span>
          </div>
        </div>
        <button
          class="button-72"
          role="button"
          onClick={() => {
            setDisplay(false);
            props.setConnected(false);
          }}
        >
          Disconnect Patient
        </button>
      </div>
    );
  } else {
    return (
      <div class="vitals-container">
        <h2>Vitals</h2>
        <p>Patient Not Connected</p>
        <button
          class="button-72"
          role="button"
          onClick={() => {
            setDisplay(true);
            props.setConnected(true);
          }}
        >
          Connect Patient
        </button>
      </div>
    );
  }
}

export default Vitals;

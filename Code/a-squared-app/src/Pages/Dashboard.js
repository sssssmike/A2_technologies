import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header.js";
import PatientInfo from "../Components/PatientInfo.js";
import Vitals from "../Components/Vitals.js";
import "../CSS/Dashboard.css";
import LineChartPlotly from "../Components/LineChartPlotly.js";
import Timer from "../Components/Timer";

function Dashboard() {
  const location = useLocation();
  const patient = location.state.patient;
  const [connected, setConnected] = useState(false);
  const [hr, sethr] = useState();
  const [resp, setresp] = useState();
  const [anesthesia, setAnesth] = useState();
  const [anesthesiaInc, setAnesthesiaInc] = useState(0);
  const [manualAnesth, setManualAnesth] = useState(0);
  return (
    <div className="Dashboard-Container">
      <h1 class="boxDash">Welcome {location.state.username}</h1>
      <Header username={location.state.username} patient={patient} />
      <PatientInfo
        username={location.state.username}
        patient={location.state.patient}
      />
      <Vitals
        setConnected={setConnected}
        sethr={sethr}
        setresp={setresp}
        setAnesth={setAnesth}
        patientWeight={patient.weight}
      />
      {/* charts conditionally rendered if patient is connected */}
      {connected ? (
        <>
          {/* Heart Rate Chart */}
          <div className="chart-one chart">
            <LineChartPlotly title={"Heart Rate"} data={hr} autorange={true} />
          </div>
          {/* Respiration Chart */}
          <div className="chart-two chart">
            <LineChartPlotly
              title={"Respiration"}
              data={resp}
              autorange={true}
            />
          </div>
          {/* Anesthesia Chart */}
          <div className="chart-three chart">
            {/* anesthesia is set by setAnesth in FakePatent file */}
            <LineChartPlotly
              title={"Anesthesia"}
              data={anesthesia + anesthesiaInc}
              autorange={false}
            />
            <div className="buttons">
              <div className="incrementers">
                <button
                  onClick={() => {
                    let tmp = anesthesiaInc;
                    setAnesthesiaInc(tmp - 0.1);
                    console.log(anesthesia);
                  }}
                >
                  - 0.1 ML
                </button>
                <button
                  onClick={() => {
                    let tmp = anesthesiaInc;
                    setAnesthesiaInc(tmp + 0.1);
                  }}
                >
                  + 0.1 ML
                </button>
              </div>

              {/* custom anesthesia amount */}
              <input
                id="anesth"
                placeholder="Add anesthesia"
                onChange={(e) => {
                  console.log(e.target.value);
                  setManualAnesth(Number(e.target.value));
                }}
              />
              <button
                onClick={() => {
                  let tmp = anesthesiaInc;
                  setAnesthesiaInc(tmp + manualAnesth);
                }}
              >
                Add
              </button>
            </div>
          </div>
          {/* Timer */}
          <div className="timer">
            <Timer />
          </div>
        </>
      ) : (
        <span /> // renders nothing in place of the charts
      )}
    </div>
  );
}

export default Dashboard;

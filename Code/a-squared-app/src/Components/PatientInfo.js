import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import getAge from "../Functions/getAge";
import "../CSS/Dashboard.css";

function PatientInfo(props) {
  const patient = props.patient;
  const navigate = useNavigate();

  return (
    <div className="patientInfo-Container">
      <div class="centerObjectDash">
        {/* <h2 className="titleDash">Patient Info:</h2> */}
        <h2 className="nameDash">
          {patient.lastName}, {patient.firstName}
        </h2>
      </div>

      <div className="patientInfoDash">
        <p>DOB: {patient.dateOfBirth}</p>
        <p>Age: {getAge(patient.dateOfBirth)}</p>
        <p>Height: {patient.height} cm</p>
        <p>Weight: {patient.weight} kg</p>
        <p>Sex: {patient.sex}</p>
      </div>
      <div class="centerObjectDash">
        <button
          class="button-72"
          role="button"
          onClick={() => {
            navigate("/PatientRecords", {
              state: { username: props.username, patient: patient },
            });
          }}
        >
          Show full data
        </button>
      </div>
    </div>
  );
}

export default PatientInfo;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/PatientCard.css";

function Patient(props) {
  const navigate = useNavigate();

  return (
    <div
      className="patient-card"
      onClick={() => {
        navigate("/Dashboard", {
          state: { username: props.username, patient: props.patient },
        });
      }}
    >
      <div className="patient-name">
        <h3>
          {props.patient.lastName}, {props.patient.firstName}
        </h3>
        <p>{props.id}</p>
      </div>
      <div className="patient-data">
        <div className="data-item">
          <p>DOB:</p>
          <p> {props.patient.dateOfBirth}</p>
        </div>
        <div className="data-item">
          <p>Sex: </p>
          <p>{props.patient.sex}</p>
        </div>
      </div>
    </div>
  );
}

export default Patient;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Header.css";
import NewPatient from "../Pages/NewPatient";

function Header(props) {
  const navigate = useNavigate();
  const locState = { state: { username: props.username } };
  const [addPatient, setAddPatient] = useState(false);

  const closeHandler = () => {
    setAddPatient(false);
    // re-enables scolling after closing add patient modal
    document.body.classList = "";
  };

  return (
    <div>
      <div className="header-container">
        <span
          onClick={() => {
            setAddPatient(true);
            document.body.className = "hideScroll";
          }}
          id="addpatient"
        >
          {/* <CustomizedDialogs>  <NewPatient /> </CustomizedDialogs> */}
          Add Patient
        </span>

        <span
          id="records"
          onClick={() => {
            navigate("/PatientRecords", {
              state: { username: props.username, patient: props.patient },
            });
          }}
        >
          Patient Records
        </span>
        <span
          id="patients"
          onClick={() => {
            navigate("/PatientSelect", locState);
          }}
        >
          All Patients
        </span>
        <span
          id="exit"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit
        </span>
      </div>
      {addPatient ? <NewPatient closeHandler={closeHandler} /> : <div></div>}
    </div>
  );
}

export default Header;

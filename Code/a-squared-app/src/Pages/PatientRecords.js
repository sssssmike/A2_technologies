import Note from "../Components/Note";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import getAge from "../Functions/getAge";
import "../CSS/PatientRecords.css";
import { db } from "../db/dbInstance";
import NewPatData from "../Components/NewPatData";
import {
  addPatientNote,
  getAllNotes,
  getAllPrescriptions,
  addPatientScript,
  addPatientAllergy,
  getAllAllergies,
} from "../db/dbFuncs";
var CryptoJS = require("crypto-js");
const password = process.env.REACT_APP_SECRET_KEY;

function PatientRecords() {
  const backToDash = (
    <div>
      <button
        class="button-72"
        role="button"
        onClick={() => {
          console.log("should go to dashboard");
          navigate("/Dashboard", {
            state: { username: location.state.username, patient: patient },
          });
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
  const location = useLocation();
  const patient = location.state.patient;
  const [Notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [numCards, setNumCards] = useState({
    notes: 5,
    allergies: 5,
    prescriptions: 5,
  });

  useEffect(() => {
    (async () => {
      // get all notes from database and set them
      let val = await getAllNotes(db, patient.id);
      let tmpNote = Notes;
      for (let i = 0; i < val.length; i++) {
        tmpNote = tmpNote.concat([
          <Note key={tmpNote.length} note={val[i].context} />,
        ]);
      }
      setNotes(tmpNote);

      // get all prescriptions
      let dbVals = await getAllPrescriptions(db, patient.id);
      let tmpPres = prescriptions;
      for (let i = 0; i < dbVals.length; i++) {
        tmpPres = tmpPres.concat([
          <Note key={tmpPres.length} note={dbVals[i].context} />,
        ]);
      }
      setPrescriptions(tmpPres);

      // get all allergies
      let dbAller = await getAllAllergies(db, patient.id);
      let tmpAller = allergies;
      for (let i = 0; i < dbAller.length; i++) {
        tmpAller = tmpAller.concat([
          <Note key={tmpAller.length} note={dbAller[i].context} />,
        ]);
      }
      setAllergies(tmpAller);
    })();
  }, []);

  // handles adding a new note to the list of notes
  function addToNotes(note) {
    let tmp = {
      context: CryptoJS.AES.encrypt(note, password).toString(),
    };
    let tmpNote = Notes;
    addPatientNote(db, patient.id, tmp);
    setNotes(tmpNote.concat([<Note key={note.length} note={note} />]));
  }

  // handles adding a new prescription to the list of prescriptions
  function addToPrescriptions(script) {
    let tmp = {
      context: CryptoJS.AES.encrypt(script, password).toString(),
    };
    let tmpPre = prescriptions;
    addPatientScript(db, patient.id, tmp);
    setPrescriptions(
      tmpPre.concat([<Note key={tmpPre.length} note={script} />])
    );
  }

  // handles adding a new allergy to the list of allergies
  function addToAllergies(name) {
    let tmp = {
      context: CryptoJS.AES.encrypt(name, password).toString(),
    };
    let tmpAll = allergies;
    addPatientAllergy(db, patient.id, tmp);
    setAllergies(tmpAll.concat([<Note key={tmpAll.length} note={name} />]));
  }

  if (patient) {
    return (
      <div>
        <Header username={location.state.username} />
        <h3>Admin: {location.state.username}</h3>
        <div className="statistics-container">
          <div className="statistics-text">
            <h2>
              {patient.lastName}, {patient.firstName}
            </h2>
            <h3>Statistics</h3>
            <p>ID: {patient.id}</p>
            <p>Age: {getAge(patient.dateOfBirth)}</p>
            <p>Height: {patient.height} cm</p>
            <p>Weight: {patient.weight} kg</p>
            <p>DOB: {patient.dateOfBirth}</p>
            <p>Sex: {patient.sex}</p>
          </div>
          {backToDash}
        </div>

        <div className="content-container">
          {/* allergies section */}
          <div className="data-container">
            <h3>Allergies</h3>
            {allergies.slice(0, numCards.allergies)}
            {/* show more logic */}
            {allergies.length > numCards.allergies ? (
              <showmore
                onClick={() => {
                  let tmp = numCards.allergies + 5;
                  setNumCards((numCards) => {
                    return { ...numCards, allergies: tmp };
                  });
                }}
              >
                Show More
              </showmore>
            ) : (
              <showmore
                onClick={() => {
                  let tmp = 5;
                  setNumCards((numCards) => {
                    return { ...numCards, allergies: tmp };
                  });
                }}
              >
                Show Less
              </showmore>
            )}
            <NewPatData
              addDataHook={addToAllergies}
              patient={patient}
              dataType="Allergy"
            />
          </div>
          {/* Notes Section */}
          <div className="data-container">
            <h3>Notes</h3>
            {Notes.slice(0, numCards.notes)}
            {/* show more logic */}
            {Notes.length > numCards.notes ? (
              <showmore
                onClick={() => {
                  let tmp = numCards.notes + 5;
                  setNumCards((numCards) => {
                    return { ...numCards, notes: tmp };
                  });
                }}
              >
                Show More
              </showmore>
            ) : (
              <showmore
                onClick={() => {
                  let tmp = 5;
                  setNumCards((numCards) => {
                    return { ...numCards, notes: tmp };
                  });
                }}
              >
                Show Less
              </showmore>
            )}
            <NewPatData
              addDataHook={addToNotes}
              patient={patient}
              dataType="Note"
            />
          </div>
          {/* Prescriptions Section */}
          <div className="data-container">
            <h3>Prescriptions</h3>
            {prescriptions.slice(0, numCards.prescriptions)}
            {/* show more logic */}
            {prescriptions.length > numCards.prescriptions ? (
              <showmore
                onClick={() => {
                  let tmp = numCards.prescriptions + 5;
                  setNumCards((numCards) => {
                    return { ...numCards, prescriptions: tmp };
                  });
                }}
              >
                Show More
              </showmore>
            ) : (
              <showmore
                onClick={() => {
                  let tmp = 5;
                  setNumCards((numCards) => {
                    return { ...numCards, prescriptions: tmp };
                  });
                }}
              >
                Show Less
              </showmore>
            )}
            <NewPatData
              addDataHook={addToPrescriptions}
              patient={patient}
              dataType="Prescription"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header username={location.state.username} />
        <h1>No patient selected!</h1>
      </div>
    );
  }
}

export default PatientRecords;

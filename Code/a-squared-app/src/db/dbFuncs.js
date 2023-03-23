/*
    dbFuncs.js

    Functions used to interact with the database. Used to update, get, and set data in the firebase firestore database.
    Makes a connection to the database using and instance of the dbInstance class passed to each function.

    references:
        https://firebase.google.com/docs/firestore/manage-data/add-data
        https://firebase.google.com/docs/firestore/query-data/get-data
        https://firebase.google.com/docs/firestore/query-data/queries
*/
import {
  collection,
  query,
  doc,
  setDoc,
  getDoc,
  getDocFromCache,
  getDocs,
  addDoc,
  orderBy,
} from "firebase/firestore";
var CryptoJS = require("crypto-js");
const password = process.env.REACT_APP_SECRET_KEY;

/*
addPatient

adds a patient to the database given a db referenced and initial vars
*/
async function addPatient(db, data) {
  const q = query(collection(db, "patients"));
  const snapshot = await getDocs(q);
  const nextId = snapshot.size + 1;

  data = { ...data, id: nextId };

  // await addDoc(collection(db, "patients", nextId), data);
  await setDoc(doc(db, "patients", `${nextId}`), data);
}

async function addPatientNote(db, patientId, data) {
  /*
  data = {
    timeStamp: time,
    author: user,
    context: note
  }
  */
  await addDoc(collection(db, `patients/${patientId}/notes`), data);
}

async function addPatientScript(db, patientId, data) {
  /*
  data = {
    startDate: sDate,
    endDate: eDate,
    refills: refillCount,
    doctor: drName,
    med: medName,
    dosage: dose,
    quantity: qty,
    pharmacy: pharmName,
    pharmAddress: pharmAddress
  }
  */

  await addDoc(collection(db, `patients/${patientId}/prescriptions`), data);
}

async function addPatientAllergy(db, patientId, data) {
  /*
  data = {
    name: allergy
  }
  */
  await addDoc(collection(db, `patients/${patientId}/allergies`), data);
}

/*
get all patients in the database for patient selection
*/
async function getAllPatients(db) {

  const q = query(collection(db, "patients"), orderBy("id", "asc"));

  const snapshot = await getDocs(q);
  let pats = [];
  snapshot.forEach((doc) => {
    // let tempData = doc.data();
    // tempData = { ...tempData, id: doc.id }; // appends the document id to the existing patient data structure
    // pats.push(tempData);

    pats.push(doc.data());
  });
  return pats;
}

/*
Get all patient notes by patient id (string)
*/
async function getAllNotes(db, patientId) {
  const q = query(collection(db, `patients/${patientId}/notes`));

  const snapshot = await getDocs(q);
  let notes = [];
  snapshot.forEach((doc) => {
    let d = {
      context: CryptoJS.AES.decrypt(doc.data().context, password).toString(
        CryptoJS.enc.Utf8
      )
    }
    notes.push(d);
  })

  return notes;
}

/*
Get all prescriptions by patient id (string)
*/
async function getAllPrescriptions(db, patientId) {
  const q = query(collection(db, `patients/${patientId}/prescriptions`));

  const snapshot = await getDocs(q);
  let notes = [];
  snapshot.forEach((doc) => {
    let d = {
      context: CryptoJS.AES.decrypt(doc.data().context, password).toString(
        CryptoJS.enc.Utf8
      )
    }
    notes.push(d);
  })
  return notes;
}


/*
Get all prescriptions by patient id (string)
*/
async function getAllAllergies(db, patientId) {
  const q = query(collection(db, `patients/${patientId}/allergies`));

  const snapshot = await getDocs(q);
  let notes = [];
  snapshot.forEach((doc) => {
    let d = {
      context: CryptoJS.AES.decrypt(doc.data().context, password).toString(
        CryptoJS.enc.Utf8
      )
    }
    notes.push(d);
  })

  return notes;
}

export { getAllPatients, addPatient, addPatientNote, getAllNotes, getAllPrescriptions, addPatientScript, getAllAllergies, addPatientAllergy};

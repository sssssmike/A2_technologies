import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Patient from "../Components/Patient";
import "../CSS/PatientSelect.css";
import { db } from "../db/dbInstance";
import { getAllPatients } from "../db/dbFuncs";
import { collection, query, where, onSnapshot } from "firebase/firestore";
var CryptoJS = require("crypto-js");
const password = process.env.REACT_APP_SECRET_KEY;

function PatientSelect() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [startup, setStartup] = useState(true); // true if on startup still, false if initial startup is over
  const [Search, setSearch] = useState("");
  const [querySnapshot, setQuery] = useState(null);
  const searchParam = ["firstName", "lastName"];

  function decryptData(data) {
    let patient = {
      firstName: CryptoJS.AES.decrypt(data.firstName, password).toString(
        CryptoJS.enc.Utf8
      ),
      lastName: CryptoJS.AES.decrypt(data.lastName, password).toString(
        CryptoJS.enc.Utf8
      ),
      dateOfBirth: CryptoJS.AES.decrypt(data.dateOfBirth, password).toString(
        CryptoJS.enc.Utf8
      ),
      sex: CryptoJS.AES.decrypt(data.sex, password).toString(CryptoJS.enc.Utf8),
      id: data.id,
      height: CryptoJS.AES.decrypt(data.height, password).toString(
        CryptoJS.enc.Utf8
      ),
      weight: CryptoJS.AES.decrypt(data.weight, password).toString(
        CryptoJS.enc.Utf8
      ),
      //id: data.id
    };
    // console.log(patient);
    return patient;
  }

  useEffect(() => {
    // fetch patients from db here
    // TODO: this call to getAllPatients happens too often and should only happen once per page load
    (async () => {
      let pats = await getAllPatients(db);
      for (var i = 0; i < pats.length; i++) {
        pats[i] = decryptData(pats[i]);
      }

      setData(pats);
      setLoaded(true);
      
      // const q = query(collection(db, "patients")); // gets a snapshot of the current data to compare changes to
      // setQuery(q);
      // compares databsae changes to q and identifies new documents added. If there is a new patient added update data
      // const snapListener = onSnapshot(q, (snapshot) => {
      //   // call this snapListener() to detach, this will avoid data usage when unecessary
      //   snapshot.docChanges().forEach((change) => {
      //     if (change.type == "added") {
      //       console.log("new patient added: ", change.doc.data());
      //       // let pat = { ...decryptData(change.doc.data()), id: change.doc.id };
      //       let pat = decryptData(change.doc.data());
      //       setData(pats.concat(pat));
      //       setLoaded(true);
      //     }
      //   });
      // });

      // setStartup(false);
    })();
  }, []);

  function search(items) {
    // console.log(items);
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        if (item[newItem] !== undefined) {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(Search.toLowerCase()) > -1
          );
        }
      });
    });
  }
  return (
    <div>
      <Header username={location.state.username} />
      <h1 className="greeting">Welcome {location.state.username}</h1>
      <div className="search-container">
        <input
          className="search"
          autoComplete="off"
          name="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
        />
      </div>
      <div>
        <div>
          {loaded ? (
            search(data).map((item) => {
              return (
                <Patient
                  key={item.id}
                  id={item.id}
                  patient={item}
                  username={location.state.username}
                />
              );
            })
          ) : (
            <center>
              <p>Loading...</p>
            </center>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientSelect;

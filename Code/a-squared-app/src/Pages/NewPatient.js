import React, { useEffect } from "react";
import { addPatient } from "../db/dbFuncs";
import { db } from "../db/dbInstance";
var CryptoJS = require("crypto-js");
const password = process.env.REACT_APP_SECRET_KEY;

function NewPatient(props) {
  useEffect(() => {
    document.body.className = "hideScroll";
  }, []);

  return (
    <div>
      <div className="shield"></div>
      <div className="form-container">
        <div className="form-title">
          <h2>Add a new patient</h2>
          <p onClick={props.closeHandler}>CLOSE</p>
        </div>

        <form
          className="patient-form"
          onSubmit={(e) => {
            e.preventDefault();
            props.closeHandler();
            let form = e.target;

            let patData = {
              firstName: CryptoJS.AES.encrypt(
                form.fname.value,
                password
              ).toString(),
              lastName: CryptoJS.AES.encrypt(
                form.lname.value,
                password
              ).toString(),
              sex: CryptoJS.AES.encrypt(form.sex.value, password).toString(),
              dateOfBirth: CryptoJS.AES.encrypt(
                form.date.value,
                password
              ).toString(),
              height: CryptoJS.AES.encrypt(form.hgt.value, password).toString(),
              weight: CryptoJS.AES.encrypt(form.wgt.value, password).toString(),
              //id: nextId
            };

            try {
              addPatient(db, patData);
              alert("Successfully added new patient!");
            } catch (err) {
              alert("Patient not added, database error.");
            }
          }}
        >
          <div className="form-item">
            <label>First Name:</label>
            <input
              name="fname"
              id="fname"
              placeholder="First Name"
              pattern="[a-zA-Z]+"
              title="First name should only contain alphabetical characters. e.g. John"
              required
            />
          </div>
          <div className="form-item">
            <label>Last Name:</label>
            <input
              name="lname"
              id="lname"
              placeholder="Last Name"
              pattern="[a-zA-Z]+"
              title="Last name should only contain alphabetical characters. e.g. John"
              required
            />
          </div>

          <div className="form-item">
            <label>Date of Birth:</label>
            <input type="date" id="date" name="date of birth" required />
          </div>

          <div className="form-item">
            <label>Sex:</label>
            <div className="form-input-item">
              <select name="sex" id="gender" placeholder="sex" required>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="other">other</option>
              </select>
            </div>
          </div>

          <div className="form-item">
            <label>Height (cm):</label>
            <input
              name="hgt"
              id="hgt"
              placeholder="Height"
              pattern="[0-9]{1,3}"
              title="Height should only contain numeric characters and be in centimeters. e.g 182"
              required
            />
          </div>

          <div className="form-item">
            <label>Weight (kg):</label>
            <input
              name="wgt"
              id="wgt"
              placeholder="Weight"
              pattern="[0-9]{1,3}"
              title="Weight should only contain numeric characters and be in pounds. e.g 160"
              required
            />
          </div>
          <button id="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default NewPatient;

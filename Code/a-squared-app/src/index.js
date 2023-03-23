import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import PatientSelect from "./Pages/PatientSelect";
import NewPatient from "./Pages/NewPatient";
import PatientRecords from "./Pages/PatientRecords";
import CustomizedDialogs from "./Components/PopoutDialog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <div>
      <main>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Home" element={<Home />} /> //this is just a placeholder
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/PatientSelect" element={<PatientSelect />} />
          <Route path="/NewPatient" element={<CustomizedDialogs>  <NewPatient /> </CustomizedDialogs>} />
          <Route path="/PatientRecords" element={<PatientRecords />} />
        </Routes>
      </main>
    </div>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

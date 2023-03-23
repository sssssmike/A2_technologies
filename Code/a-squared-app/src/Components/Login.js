import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../db/dbInstance.js";

// import {auth} from "../firebase";

// components are individual sections of a page. Think tweets on twitter or Youtube videos (thumbnails and title on homepage)
//  They are most efficient when you repeat them multiple times on the same page

const app = db;
const auth = getAuth();

function Login() {
  const [loginfail, invalidlogin] = useState(false);
  const [email, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  // const register = (e) => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode + errorMessage);
  //     });
  // };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        invalidlogin(false);
        navigate("/PatientSelect", { state: { username: email } });
      })
      .catch((error) => {
        invalidlogin(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  };

  return (
    <div className="login-container">
      <form>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />
        <button onClick={signIn}>Log in</button>
        <span>{loginfail ? 'Invalid username or password' : ''}</span>
      </form>
    </div>
  );
}

export default Login;

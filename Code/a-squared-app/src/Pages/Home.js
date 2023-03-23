import React, { useState } from "react";
import Login from "../Components/Login";
import "../CSS/Home.css";

// Pages are good for organizing multiple components together

function Home() {
  return (
    <div className="App">
      <h1>A² Technologies</h1>
      <Login />
    </div>
  );
}

export default Home;

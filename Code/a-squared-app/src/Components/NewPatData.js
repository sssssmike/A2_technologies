import React, { useState } from "react";

function NewPatData(props) {
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState("");

  if (!clicked) {
    return (
      <div>
        <button
          class="add-content-btn"
          role="button"
          onClick={() => {
            setClicked(true);
          }}
        >
          Add {props.dataType}
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h4>New Note on {props.patient.firstName}:</h4>
        <textarea
          onChange={(e) => {
            setData(e.target.value);
          }}
          id={props.dataType}
          rows={5}
          cols={50}
        ></textarea>
        <button
          style={{ margin: "1em auto", width: "150px" }}
          onClick={() => {
            props.addDataHook(data);
            setClicked(false);
          }}
        >
          Add
        </button>
      </div>
    );
  }
}

export default NewPatData;

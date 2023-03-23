import React from "react";

function Note(props) {
  return (
    <div className="Note">
      <p>{props.note}</p>
    </div>
  );
}

export default Note;

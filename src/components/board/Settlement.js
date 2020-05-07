import React from "react";

export default function Settlement(props){

  return(
    <div
      style={{
        position: "absolute",
        top: props.y,
        left: props.x,
        transform: "translate(-50%, -50%)",
        fontSize: "0.5em",
        width: "20px",
        height: "20px",
        border: "1.5px solid black",
        borderRadius: "10px",
        backgroundColor: props.colorSet
      }}
    />
  )
}
import React from "react";
import {api} from "../../helpers/api";

export default function NewRoad(props){

  const requestBody = JSON.stringify({
    moveId: props.moveId
  });

  // const [streetColor, setStreetColor] = React.useState("transparent");
  return (

    <button
      style={{
        position: "absolute",
        top: props.midY - 5,
        left: props.midX - 20,
        transform: props.rotation,
        fontSize: "0.5em",
        width: "40px",
        height: "10px",
        border: "2px solid transparent",
        borderRadius: "10px",
        backgroundColor: props.color
      }}
      onClick={async () => await api.put("/games/" + localStorage.getItem("gameID"), requestBody)} />
  )
}
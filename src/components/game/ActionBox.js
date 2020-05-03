import React from "react";
import { api, handleError } from "../../helpers/api";
import './style.css';


const isClassDisabled = (move)=>{

}

export default function ActionBox(props) {

  return (
    <div className={'actionBox'}>
      <div>
        <button className={`actionBoxButton ${props.moves[0].moveName !== "BuildMove" && props.moves[0].moveName !== "FirstRoadMove" && props.moves[0].moveName !== "FirstSettlementMove"? "actionBoxButtonGrey" : ''}`}
                disabled={props.moves === "emptyMoves"}
                onClick={
                  async () => await api.get("/games/" + props.gameId)
                }
        >
          Build
        </button>
      </div>

      <div>
        <button className={`actionBoxButton ${props.moves[0].moveName !== "DiceMove"  ? "actionBoxButtonGrey" : ''}`}
                disabled={props.moves === "emptyMoves"}
                onClick={
                  props.moves[0].moveName === "DiceMove"  ?
                    async () => await api.put("/games/" + props.gameId,
                      JSON.stringify({moveId: props.moves[0].moveId})) : ""
                }
        >
          Roll dice
        </button>
      </div>

      <div>
        <button className={`actionBoxButton ${props.moves[0].moveName !== "DevMove"  ? "actionBoxButtonGrey" : ''}`}
                disabled= {props.moves === "emptyMoves"}
        >
          Dev cards
        </button>
      </div>

      <div>
        <button className={`actionBoxButton ${props.moves[0].moveName !== "FirstPassMove" && props.moves[0].moveName !== "PassMove"  ? "actionBoxButtonGrey" : ''}`}
                disabled= {props.moves === "emptyMoves"}
                onClick={
                  props.moves[0].moveName === "FirstPassMove" || props.moves[0].moveName === "PassMove" ?
                    async () => await api.put("/games/" + props.gameId,
                      JSON.stringify({moveId: props.moves[0].moveId})) : ""
                }
        >
          Pass turn
        </button>
      </div>
    </div>
  )
}
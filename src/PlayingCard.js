import React, { useState } from "react";
import backOfCard from "./back.png";
import useAxios, { useFlip } from "./Hooks";
import "./PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard() {
  const [isFacingUp, flip] = useFlip(true);
  const { response, error, isLoading } = useAxios("https://deckofcardsapi.com/api/deck/new/draw/");

  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>Error: {error.message}</div>
  }

  const front = response.data.cards[0].image;
  const back = backOfCard;

  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={flip}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;

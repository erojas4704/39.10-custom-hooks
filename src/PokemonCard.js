import React, { useState } from "react";
import useAxios, {useFlip} from "./Hooks";
import "./PokemonCard.css";

/* Renders a single pokemon card. */
function PokemonCard({ name }) {
  const [isFaceUp, flip] = useFlip(true);
  const { response, error, isLoading } = useAxios(`https://pokeapi.co/api/v2/pokemon/${name}/`);

  if (isLoading) {
    return <div className="PokemonCard Card">Loading...</div>;
  }

  if (error) {
    return <div className="PokemonCard Card">Error: ${error.message}</div>;
  }

  const stats = response.data.stats.map(stat => ({
    value: stat.base_stat,
    name: stat.stat.name
  }));
  const front = response.data.sprites.front_default;
  const back = response.data.sprites.back_default;

  return (
    <div onClick={flip} className="PokemonCard Card">
      {isFaceUp ? (
        <div className="PokemonCard-front">
          <img src={front} alt={`{name} front`} />
          <div>
            <p className="PokemonCard-name">{name}</p>
            <ul className="PokemonCard-stats">
              {stats.map(stat => (
                <li key={stat.name}>
                  <em>{stat.name}</em>: {stat.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="PokemonCard-back">
          <img src={back} alt={`{name} back`} />
        </div>
      )}
    </div>
  );
}

export default PokemonCard;

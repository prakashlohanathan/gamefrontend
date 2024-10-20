import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import assert from "./assert.js";

let backend_api = assert.backend_url;

const choices = ["Stone", "Paper", "Scissors"];

const Game = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [rounds, setRounds] = useState([]);
  const [round, setRound] = useState(1);
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");
  const [winner, setWinner] = useState("");

  const determineWinner = (choice1, choice2) => {
    if (choice1 === choice2) return "Tie";
    if (
      (choice1 === "Stone" && choice2 === "Scissors") ||
      (choice1 === "Scissors" && choice2 === "Paper") ||
      (choice1 === "Paper" && choice2 === "Stone")
    )
      return player1Name;
    return player2Name;
  };

  const handleRound = () => {
    const roundWinner = determineWinner(player1Choice, player2Choice);
    setRounds([...rounds, { round, player1Choice, player2Choice, roundWinner }]);
    if (round === 6) {
      const player1Wins = rounds.filter((r) => r.roundWinner === player1Name).length;
      const player2Wins = rounds.filter((r) => r.roundWinner === player2Name).length;
      const finalWinner = player1Wins > player2Wins ? player1Name : player2Name;
      setWinner(finalWinner);

      // Save game data
      axios.post(`${backend_api}/save-game`, {
        player1Name,
        player2Name,
        rounds,
        winner: finalWinner,
      });
    } else {
      setRound(round + 1);
    }
  };

  return (
    <div>
      <h1>Stone Paper Scissors</h1>
      <div>
        <input
          type="text"
          placeholder="Player 1 Name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
        />
      </div>
      <div>
        <h2>Round(1-6 stages) {round}</h2>
        <div>
          <h3>{player1Name}</h3>
          {choices.map((choice) => (
            <button key={choice} onClick={() => setPlayer1Choice(choice)}>
              {choice}
            </button>
          ))}
        </div>
        <div>
          <h3>{player2Name}</h3>
          {choices.map((choice) => (
            <button key={choice} onClick={() => setPlayer2Choice(choice)}>
              {choice}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleRound}>Submit Round</button>
      {winner && <h2>Winner: {winner}</h2>}
    </div>
  );
};

export default Game;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";  
import assert from "./assert.js";

let backend_api = assert.backend_url;

const GameHistory = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      const response = await axios.get(`${backend_api}/games`);
      setGames(response.data);
    };
    fetchGames();
  }, []);

  return (
    <div className="container">
      <h1>Game History</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>
            <span>{game.player1Name}</span> vs <span>{game.player2Name}</span> - Winner: <span>{game.winner}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;

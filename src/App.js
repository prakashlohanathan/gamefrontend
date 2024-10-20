import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./Game";
import GameHistory from "./GameHistory";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/history" element={<GameHistory />} />
    </Routes>
  );
};


export default App;

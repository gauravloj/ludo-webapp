import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";

export default function App() {
  let [startGame, setStart] = useState(false);
  let startGameHandler = (state) => {
    setStart(state);
  };
  return startGame ? (
    <GameBoard startGameHandler={startGameHandler} />
  ) : (
    <LandingPage startGameHandler={startGameHandler} />
  );
}

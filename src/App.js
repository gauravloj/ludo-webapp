import "./App.css";
import { LandingPage } from "./components/LandingPage";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";

export default function App() {
  let [startGame, setStart] = useState(false);
  let startGameHandler = (state) => {
    setStart(state);
  };
  return (
    <div className="bg-pink-50 w-screen h-screen">
      {startGame ? (
        <GameBoard startGameHandler={startGameHandler} />
      ) : (
        <LandingPage startGameHandler={startGameHandler} />
      )}
    </div>
  );
}

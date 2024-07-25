import { COLORS } from "../constants";

export function LandingPage({ startGameHandler }) {
  let colorSelectionHandler = (color) => {
    localStorage.setItem("selectedColor", color);
    startGameHandler(true);
  };
  return (
    <div className="flex flex-col">
      <div className="text-7xl text-center">Welcome to the world of Ludo</div>
      <div className="flex">
        <div className="flex flex-col border-solid border-2 border-sky-500 space-y-4 m-4 p-4">
          <div className="">How to Play</div>
          <div className="">Instruction 1</div>
        </div>
        <div className="flex flex-col border-solid border-2 border-sky-500 space-y-4 m-4 p-4">
          <div className="">Lets start a new game!</div>
          <div className=""> Choose your lucky color:</div>
          <div className="flex flex-row space-x-4">
            <button
              className="rounded-full bg-lime-600 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(COLORS.lime);
              }}
            ></button>
            <button
              className="rounded-full bg-cyan-400 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(COLORS.cyan);
              }}
            ></button>
            <button
              className="rounded-full bg-purple-600 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(COLORS.purple);
              }}
            ></button>
            <button
              className="rounded-full bg-rose-600 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(COLORS.rose);
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

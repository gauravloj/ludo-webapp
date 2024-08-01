import { all_constants } from "../constants";

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
          <div className="text-3xl">How to Play</div>
          <ol className="list-disc list-inside text-2xl">
            <li>
              Pick your favorite color on the right side to start the game
            </li>
            <li>Roll the dice to get a number</li>
            <li>You need to roll a 6 or 1 to unlock the piece</li>
            <li>If you get a 6, you get another chance to roll the dice</li>
            <li>Select the piece to move based on your wise strategy</li>
            <li>Kill the opponent's piece if you land on the same position</li>

            <li> If you land on the colored box, you are safe</li>

            <li>
              If you land on the same position as your piece, you can stack them
            </li>
            <li>
              Reach the center position with all your pieces to win the game
            </li>
            <li>Enjoy the game!</li>
          </ol>
        </div>
        <div className="flex flex-col border-solid border-2 border-sky-500 space-y-4 m-4 p-4">
          <div className="">Lets start a new game!</div>
          <div className=""> Choose your lucky color:</div>
          <div className="flex flex-row space-x-4">
            <button
              className="rounded-full bg-lime-600 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(all_constants.COLORS.lime);
              }}
            ></button>
            <button
              className="rounded-full bg-cyan-400 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(all_constants.COLORS.cyan);
              }}
            ></button>
            <button
              className="rounded-full bg-purple-600 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(all_constants.COLORS.purple);
              }}
            ></button>
            <button
              className="rounded-full bg-rose-600 h-20 w-20"
              onClick={() => {
                colorSelectionHandler(all_constants.COLORS.rose);
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

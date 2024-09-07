import { all_constants } from "../constants";
import { PlayerPiece } from "./PlayerPiece";
import ludoboard from "../images/ludo-board.png";

export function LandingPage({ startGameHandler }) {
  let colorSelectionHandler = (color) => {
    localStorage.setItem("selectedColor", color);
    startGameHandler(true);
  };
  return (
    <div className="flex flex-col pt-8 px-16">
      <div className="shadow-lg text-7xl text-center m-4 p-4">
        Welcome to the world of Ludo
      </div>
      <div className="grid grid-cols-4 auto-rows-fr m-4 p-4 shadow-lg">
        <div className="col-span-2 text-3xl">Lets start a new game!</div>
        <div className="row-start-2 col-span-2 text-3xl">
          {" "}
          Choose your lucky color:
        </div>
        <div className="flex flex-row space-x-4 row-span-2">
          <PlayerPiece
            color={all_constants.COLORS_HEX[all_constants.COLORS.lime]}
            onClick={() => {
              colorSelectionHandler(all_constants.COLORS.lime);
            }}
            isPlayer={true}
          />
          <PlayerPiece
            color={all_constants.COLORS_HEX[all_constants.COLORS.cyan]}
            onClick={() => {
              colorSelectionHandler(all_constants.COLORS.cyan);
            }}
            isPlayer={true}
          />
          <PlayerPiece
            color={all_constants.COLORS_HEX[all_constants.COLORS.purple]}
            onClick={() => {
              colorSelectionHandler(all_constants.COLORS.purple);
            }}
            isPlayer={true}
          />
          <PlayerPiece
            color={all_constants.COLORS_HEX[all_constants.COLORS.rose]}
            onClick={() => {
              colorSelectionHandler(all_constants.COLORS.rose);
            }}
            isPlayer={true}
          />
        </div>
      </div>

      <div className="flex justify-around mr-16">
        <div className="shadow-lg flex flex-col space-y-4 m-4 p-4">
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
        <img
          src={ludoboard}
          alt="Ludo King"
          className="shadow-lg"
          width="500px"
          height="500px"
        />
      </div>
    </div>
  );
}

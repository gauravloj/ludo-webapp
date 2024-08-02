import { all_constants } from "../constants";
import { PlayerPiece } from "./PlayerPiece";

export function FinalDestination({
  playerPieces,
  minionOnePieces,
  minionTooPieces,
  nemesisPieces,
}) {
  return (
    <div
      className={`w-full h-full border-solid border-2 border-black bg-pink-200 flex justify-center items-center`}
    >
      <div className="w-4/6 h-4/6 bg-white rounded-xl grid grid-cols-4 place-items-center">
        {Object.keys(nemesisPieces).map((key) => {
          let piece = nemesisPieces[key];
          return piece.isCompleted ? (
            <PlayerPiece
              key={key}
              color={all_constants.COLORS_HEX[nemesisPieces.color]}
            />
          ) : (
            key !== "color" && <div key={key} />
          );
        })}
        {Object.keys(playerPieces).map((key) => {
          let piece = playerPieces[key];
          return piece.isCompleted ? (
            <PlayerPiece
              key={key}
              color={all_constants.COLORS_HEX[playerPieces.color]}
            />
          ) : (
            key !== "color" && <div key={key} />
          );
        })}
      </div>
    </div>
  );
}

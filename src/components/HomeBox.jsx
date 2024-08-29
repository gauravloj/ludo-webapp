import { all_constants } from "../constants";
import { colorSymbol } from "../gameplay";
import { PlayerPiece } from "./PlayerPiece";

function PieceHome({ color }) {
  return <div className={`rounded-full ${color} h-1/2 w-1/2`}></div>;
}

export function HomeBox({
  isPieceEnabled,
  pieceInfo,
  onClickHandler = () => {},
}) {
  return (
    <div
      className={`w-full h-full border-solid border-2 border-black ${pieceInfo[colorSymbol]} flex justify-center items-center`}
    >
      <div className="m-2 rotate-45 w-2/3 h-2/3 bg-white rounded-xl grid grid-cols-2 grid-rows-2 place-items-center">
        {Object.keys(pieceInfo).map((key) => {
          let piece = pieceInfo[key];
          return piece.location === -1 ? (
            <PlayerPiece
              disabled={!isPieceEnabled}
              key={key}
              color={all_constants.COLORS_HEX[pieceInfo[colorSymbol]]}
              boxColor={all_constants.COLORS.white}
              onClick={() => {
                isPieceEnabled && onClickHandler(key);
              }}
            />
          ) : (
            <PieceHome key={key} color={pieceInfo[colorSymbol]} />
          );
        })}
      </div>
    </div>
  );
}

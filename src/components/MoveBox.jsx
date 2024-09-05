import { all_constants } from "../constants";
import { colorSymbol } from "../gameplay";
import { PlayerPiece } from "./PlayerPiece";

export function MoveBox({
  boxColor,
  idx,
  isPieceEnabled,
  playerPieceInfo,
  nemesisPieceInfo,
  onClickHandler,
}) {
  let to_rotate = -45;
  return (
    <div
      className={`grid grid-cols-1 w-full h-full border-solid border border-black ${boxColor}`}
    >
      {idx}

      {Object.keys(nemesisPieceInfo).map((key) => {
        let piece = nemesisPieceInfo[key];
        if (piece.location === idx) {
          to_rotate += 45;
        }
        return (
          piece.location === idx && (
            <div
              className={`col-start-1 row-start-1 z-10 rotate-${to_rotate}`}
              key={key}
            >
              <PlayerPiece
                color={all_constants.COLORS_HEX[nemesisPieceInfo[colorSymbol]]}
                boxColor={boxColor}
              />
            </div>
          )
        );
      })}
      {Object.keys(playerPieceInfo).map((key) => {
        let piece = playerPieceInfo[key];
        if (piece.location === idx) {
          to_rotate += 45;
        }
        return (
          piece.location === idx && (
            <div
              className={`col-start-1 row-start-1 z-20 rotate-${to_rotate}`}
              key={key}
            >
              <PlayerPiece
                isPlayer={true}
                color={all_constants.COLORS_HEX[playerPieceInfo[colorSymbol]]}
                boxColor={boxColor}
                onClick={() => {
                  if (isPieceEnabled) {
                    onClickHandler(key);
                  }
                }}
              />
            </div>
          )
        );
      })}

      {/*<div >
        {pieceColor && (
          <PlayerPiece color={COLORS_HEX[pieceColor]} boxColor={boxColor} />
        )}
      </div>*/}
    </div>
  );
}

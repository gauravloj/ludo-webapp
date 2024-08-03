import { all_constants } from "../constants";
import { PlayerPiece } from "./PlayerPiece";

export function MoveBox({
  boxColor,
  idx,
  pieceColor,
  playerPieceInfo,
  nemesisPieceInfo,
  onClickHandler,
}) {
  let to_rotate = -45;
  return (
    <div
      className={`grid grid-cols-1 w-8 h-8 border-solid border-2 border-black ${boxColor}`}
    >
      {idx}
      {Object.keys(playerPieceInfo).map((key) => {
        let piece = playerPieceInfo[key];
        if (piece.location === idx) {
          to_rotate += 45;
        }
        return (
          piece.location === idx && (
            <div
              className={`col-start-1 row-start-1 rotate-${to_rotate}`}
              key={key}
            >
              <PlayerPiece
                color={all_constants.COLORS_HEX[playerPieceInfo.color]}
                boxColor={boxColor}
                onClick={() => {
                  onClickHandler(key);
                }}
              />
            </div>
          )
        );
      })}

      {Object.keys(nemesisPieceInfo).map((key) => {
        let piece = nemesisPieceInfo[key];
        if (piece.location === idx) {
          to_rotate += 45;
        }
        return (
          piece.location === idx && (
            <div
              className={`col-start-1 row-start-1 rotate-${to_rotate}`}
              key={key}
            >
              <PlayerPiece
                color={all_constants.COLORS_HEX[nemesisPieceInfo.color]}
                boxColor={boxColor}
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

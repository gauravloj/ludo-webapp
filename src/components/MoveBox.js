import { all_constants } from "../constants";
import { PlayerPiece } from "./PlayerPiece";

export function MoveBox({
  boxColor,
  idx,
  pieceColor,
  playerPieceInfo,
  computerPieceInfo,
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
          console.log(to_rotate);
        }
        return piece.location === idx ? (
          <div className={`col-start-1 row-start-1 rotate-${to_rotate}`}>
            <PlayerPiece
              key={key}
              color={all_constants.COLORS_HEX[playerPieceInfo.color]}
              boxColor={boxColor}
            />
          </div>
        ) : null;
      })}

      {Object.keys(computerPieceInfo).map((key) => {
        let piece = computerPieceInfo[key];
        if (piece.location === idx) {
          to_rotate += 45;
          console.log(to_rotate);
        }
        return piece.location === idx ? (
          <div className={`col-start-1 row-start-1 rotate-${to_rotate}`}>
            <PlayerPiece
              key={key}
              color={all_constants.COLORS_HEX[computerPieceInfo.color]}
              boxColor={boxColor}
            />
          </div>
        ) : null;
      })}

      {/*<div >
        {pieceColor && (
          <PlayerPiece color={COLORS_HEX[pieceColor]} boxColor={boxColor} />
        )}
      </div>*/}
    </div>
  );
}

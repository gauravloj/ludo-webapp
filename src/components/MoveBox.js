import { COLORS, COLORS_HEX } from "../constants";
import { PlayerPiece } from "./PlayerPiece";

export function MoveBox({
  color,
  idx,
  pieceColor,
  playerPieceInfo,
  computerPieceInfo,
}) {
  return (
    <div className={`w-8 h-8 border-solid border-2 border-black ${color}`}>
      <div style={{ opacity: 100 }}>
        {pieceColor && (
          <PlayerPiece color={COLORS_HEX[pieceColor]} boxColor={color} />
        )}
      </div>
    </div>
  );
}

import { COLORS, COLORS_HEX } from "../constants";
import { PlayerPiece } from "./PlayerPiece";

function PieceHome({ color }) {
  return <button className={`rounded-full ${color} h-1/2 w-1/2`}></button>;
}

export function HomeBox({
  color,
  homePieces,
  playerPieceInfo,
  computerPieceInfo,
}) {
  let blankHome = 4 - homePieces;
  return (
    <div
      className={`w-full h-full border-solid border-2 border-black ${color} flex justify-center items-center`}
    >
      <div className="m-2 rotate-45 w-4/6 h-4/6 bg-white rounded-xl grid grid-cols-2 grid-rows-2 place-items-center">
        {Array(homePieces)
          .fill(0)
          .map((_, i) => (
            <PlayerPiece color={COLORS_HEX[color]} boxColor={COLORS.white} />
          ))}
        {Array(blankHome)
          .fill(0)
          .map((_, i) => (
            <PieceHome color={color} />
          ))}
      </div>
    </div>
  );
}

import { all_constants } from "../constants";
import { getInitialPieceInfo } from "../gameplay";
import { PlayerPiece } from "./PlayerPiece";

function PieceHome({ color }) {
  return <button className={`rounded-full ${color} h-1/2 w-1/2`}></button>;
}

export function HomeBox({ pieceInfo, onClickHandler }) {
  return (
    <div
      className={`w-full h-full border-solid border-2 border-black ${pieceInfo.color} flex justify-center items-center`}
    >
      <div className="m-2 rotate-45 w-4/6 h-4/6 bg-white rounded-xl grid grid-cols-2 grid-rows-2 place-items-center">
        {Object.keys(pieceInfo).map((key) => {
          let piece = pieceInfo[key];
          return piece.location === -1 ? (
            <PlayerPiece
              key={key}
              color={all_constants.COLORS_HEX[pieceInfo.color]}
              boxColor={all_constants.COLORS.white}
              onClick={() => {
                onClickHandler(key);
              }}
            />
          ) : (
            <PieceHome key={key} color={pieceInfo.color} />
          );
        })}
      </div>
    </div>
  );
}

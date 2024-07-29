import { ActionButton } from "./Button";
import { HomeBox } from "./HomeBox";
import { MoveBox } from "./MoveBox";
import { WinningBox } from "./WinningBox";
import { COLORS, COLOR_SEQUENCE, CORNER_INDICES } from "../constants";
import { Dice } from "./Dice";

export function GameBoard({ startGameHandler }) {
  const player_color = localStorage.getItem("selectedColor");
  const player_color_index = COLOR_SEQUENCE.indexOf(player_color);
  const corner_color_map = {
    bottom_left: player_color,
    bottom_right: COLOR_SEQUENCE[(player_color_index + 1) % 4],
    top_right: COLOR_SEQUENCE[(player_color_index + 2) % 4],
    top_left: COLOR_SEQUENCE[(player_color_index + 3) % 4],
    common: COLORS.white,
  };

  const default_color = undefined;

  return (
    <>
      <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex flex-col">
          <ActionButton
            text="Home"
            onClick={() => {
              startGameHandler(false);
            }}
          />

          {/* Add new game logic once the game play is completed */}
          <ActionButton
            text="Start New Game"
            onClick={() => {
              startGameHandler(true);
            }}
          />
        </div>
        <div class="grid grid-cols-15 gap-0">
          <div className="col-span-6 row-span-6">
            <HomeBox color={corner_color_map.top_left} homePieces={4} />
          </div>

          <MoveBox
            color={corner_color_map[CORNER_INDICES[1]]}
            idx={1}
            pieceColor={default_color}
          />
          <MoveBox
            color={corner_color_map[CORNER_INDICES[2]]}
            idx={2}
            pieceColor={default_color}
          />
          <MoveBox
            color={corner_color_map[CORNER_INDICES[3]]}
            idx={3}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox color={corner_color_map.top_right} homePieces={4} />
          </div>

          {Array(21)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  color={corner_color_map[CORNER_INDICES[i + 4]]}
                  idx={i + 4}
                  pieceColor={default_color}
                />
              );
            })}
          <div className="col-span-3 row-span-3">
            <WinningBox color={corner_color_map.top_right} />
          </div>
          {Array(30)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  color={corner_color_map[CORNER_INDICES[i + 25]]}
                  idx={i + 25}
                  pieceColor={default_color}
                />
              );
            })}

          <div className="col-span-6 row-span-6">
            <HomeBox color={corner_color_map.bottom_left} homePieces={4} />
          </div>
          <MoveBox
            color={corner_color_map[CORNER_INDICES[64]]}
            idx={64}
            pieceColor={default_color}
          />
          <MoveBox
            color={corner_color_map[CORNER_INDICES[65]]}
            idx={65}
            pieceColor={default_color}
          />
          <MoveBox
            color={corner_color_map[CORNER_INDICES[66]]}
            idx={66}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox color={corner_color_map.bottom_right} homePieces={4} />
          </div>

          {Array(15)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  color={corner_color_map[CORNER_INDICES[i + 67]]}
                  idx={i + 67}
                  pieceColor={default_color}
                />
              );
            })}
        </div>
        <div>
          <Dice />
        </div>
      </div>
    </>
  );
}

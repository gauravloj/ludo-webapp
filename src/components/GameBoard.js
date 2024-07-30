import { ActionButton } from "./Button";
import { HomeBox } from "./HomeBox";
import { MoveBox } from "./MoveBox";
import { WinningBox } from "./WinningBox";
import { InfoBox } from "./InfoBox";
import { COLORS, COLOR_SEQUENCE, CORNER_INDICES } from "../constants";
import { Dice } from "./Dice";
import { useState } from "react";
import { getLockedPiecesCount, isMovePossible } from "../gameplay";

export function GameBoard({ startGameHandler }) {
  const [messages, setMessages] = useState([]);
  const [rolledNumber, setRolledNumber] = useState(1);

  const player_color = localStorage.getItem("selectedColor");
  const player_color_index = COLOR_SEQUENCE.indexOf(player_color);
  const corner_color_map = {
    bottom_left: player_color,
    bottom_right: COLOR_SEQUENCE[(player_color_index + 1) % 4],
    top_right: COLOR_SEQUENCE[(player_color_index + 2) % 4],
    top_left: COLOR_SEQUENCE[(player_color_index + 3) % 4],
    common: COLORS.white,
  };
  const [playerPieceInfo, setPlayerPieceInfo] = useState({
    1: { location: -1, isSelected: false },
    2: { location: -1, isSelected: false },
    3: { location: -1, isSelected: false },
    4: { location: -1, isSelected: false },
    color: player_color,
  });
  const [computerPieceInfo, setcomputerPieceInfo] = useState({
    1: { location: -1, isSelected: false },
    2: { location: -1, isSelected: false },
    3: { location: -1, isSelected: false },
    4: { location: -1, isSelected: false },
    color: corner_color_map.top_right,
  });
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
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            color={corner_color_map[CORNER_INDICES[1]]}
            idx={1}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            color={corner_color_map[CORNER_INDICES[2]]}
            idx={2}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            color={corner_color_map[CORNER_INDICES[3]]}
            idx={3}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox
              playerPieceInfo={playerPieceInfo}
              computerPieceInfo={computerPieceInfo}
              color={corner_color_map.top_right}
              homePieces={4}
            />
          </div>

          {Array(21)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  playerPieceInfo={playerPieceInfo}
                  computerPieceInfo={computerPieceInfo}
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
                  playerPieceInfo={playerPieceInfo}
                  computerPieceInfo={computerPieceInfo}
                  color={corner_color_map[CORNER_INDICES[i + 25]]}
                  idx={i + 25}
                  pieceColor={default_color}
                />
              );
            })}

          <div className="col-span-6 row-span-6">
            <HomeBox
              playerPieceInfo={playerPieceInfo}
              computerPieceInfo={computerPieceInfo}
              color={corner_color_map.bottom_left}
              homePieces={getLockedPiecesCount(playerPieceInfo)}
            />
          </div>
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            color={corner_color_map[CORNER_INDICES[64]]}
            idx={64}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            color={corner_color_map[CORNER_INDICES[65]]}
            idx={65}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
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
                  playerPieceInfo={playerPieceInfo}
                  computerPieceInfo={computerPieceInfo}
                  color={corner_color_map[CORNER_INDICES[i + 67]]}
                  idx={i + 67}
                  pieceColor={default_color}
                />
              );
            })}
        </div>
        <div>
          <InfoBox messages={messages} />
          <Dice
            onClickActionHandler={(diceNumber) => {
              setRolledNumber(diceNumber);
              let canMove = isMovePossible(playerPieceInfo, diceNumber);
              if (canMove) {
                setMessages([`Select a piece to move`]);
              } else {
                setMessages(["No valid moves available", `Computer rolls`]);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

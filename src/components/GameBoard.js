import { ActionButton } from "./Button";
import { HomeBox } from "./HomeBox";
import { MoveBox } from "./MoveBox";
import { WinningBox } from "./WinningBox";
import { InfoBox } from "./InfoBox";
import { COLORS, COLOR_SEQUENCE, CORNER_INDICES } from "../constants";
import { Dice } from "./Dice";
import { useState } from "react";
import {
  getInitialPieceInfo,
  getLockedPiecesCount,
  isMovePossible,
} from "../gameplay";

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
  const all_players = {
    // bottom left
    player: getInitialPieceInfo(player_color),
    // bottom right
    minion_one: getInitialPieceInfo(
      COLOR_SEQUENCE[(player_color_index + 1) % 4],
    ),
    // top right
    nemesis: getInitialPieceInfo(COLOR_SEQUENCE[(player_color_index + 2) % 4]),
    // top left
    minion_too: getInitialPieceInfo(
      COLOR_SEQUENCE[(player_color_index + 3) % 4],
    ),
  };
  const [playerPieceInfo, setPlayerPieceInfo] = useState(all_players.player);
  const [computerPieceInfo, setcomputerPieceInfo] = useState(
    all_players.nemesis,
  );
  console.log(playerPieceInfo, computerPieceInfo);
  console.log(all_players);
  const default_color = undefined;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
        <div className="grid grid-cols-15 gap-0">
          <div className="col-span-6 row-span-6">
            <HomeBox pieceInfo={all_players.minion_too} />
          </div>

          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            boxColor={corner_color_map[CORNER_INDICES[1]]}
            idx={1}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            boxColor={corner_color_map[CORNER_INDICES[2]]}
            idx={2}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            boxColor={corner_color_map[CORNER_INDICES[3]]}
            idx={3}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox pieceInfo={computerPieceInfo} />
          </div>

          {Array(21)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  key={i}
                  playerPieceInfo={playerPieceInfo}
                  computerPieceInfo={computerPieceInfo}
                  boxColor={corner_color_map[CORNER_INDICES[i + 4]]}
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
                  key={i}
                  playerPieceInfo={playerPieceInfo}
                  computerPieceInfo={computerPieceInfo}
                  boxColor={corner_color_map[CORNER_INDICES[i + 25]]}
                  idx={i + 25}
                  pieceColor={default_color}
                />
              );
            })}

          <div className="col-span-6 row-span-6">
            <HomeBox pieceInfo={playerPieceInfo} />
          </div>
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            boxColor={corner_color_map[CORNER_INDICES[64]]}
            idx={64}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            boxColor={corner_color_map[CORNER_INDICES[65]]}
            idx={65}
            pieceColor={default_color}
          />
          <MoveBox
            playerPieceInfo={playerPieceInfo}
            computerPieceInfo={computerPieceInfo}
            boxColor={corner_color_map[CORNER_INDICES[66]]}
            idx={66}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox pieceInfo={all_players.minion_one} />
          </div>

          {Array(15)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  key={i}
                  playerPieceInfo={playerPieceInfo}
                  computerPieceInfo={computerPieceInfo}
                  boxColor={corner_color_map[CORNER_INDICES[i + 67]]}
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

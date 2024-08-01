import { ActionButton } from "./Button";
import { HomeBox } from "./HomeBox";
import { MoveBox } from "./MoveBox";
import { WinningBox } from "./WinningBox";
import { InfoBox } from "./InfoBox";
import { all_constants } from "../constants";
import { Dice } from "./Dice";
import { useState } from "react";
import {
  getInitialPieceInfo,
  isMoveValid,
  isMovePossible,
  canUnlock,
  updatePieceInfo,
  getNextLocation,
} from "../gameplay";

export function GameBoard({ startGameHandler }) {
  const [messages, setMessages] = useState([]);
  const [rolledNumber, setRolledNumber] = useState(1);

  const player_color = localStorage.getItem("selectedColor");
  const player_color_index = all_constants.COLOR_SEQUENCE.indexOf(player_color);
  const corner_color_map = {
    bottom_left: player_color,
    bottom_right: all_constants.COLOR_SEQUENCE[(player_color_index + 1) % 4],
    top_right: all_constants.COLOR_SEQUENCE[(player_color_index + 2) % 4],
    top_left: all_constants.COLOR_SEQUENCE[(player_color_index + 3) % 4],
    common: all_constants.COLORS.white,
  };
  const all_players = {
    // bottom left
    player: getInitialPieceInfo(player_color),
    // bottom right
    minion_one: getInitialPieceInfo(
      all_constants.COLOR_SEQUENCE[(player_color_index + 1) % 4]
    ),
    // top right
    nemesis: getInitialPieceInfo(
      all_constants.COLOR_SEQUENCE[(player_color_index + 2) % 4]
    ),
    // top left
    minion_too: getInitialPieceInfo(
      all_constants.COLOR_SEQUENCE[(player_color_index + 3) % 4]
    ),
  };
  const [playerPieceInfo, setPlayerPieceInfo] = useState(all_players.player);
  const [nemesisPieceInfo, setnemesisPieceInfo] = useState(all_players.nemesis);
  console.log(playerPieceInfo, nemesisPieceInfo);
  console.log(all_players);
  const default_color = undefined;
  const homeBoxClickHandler = (pieceId, message) => {
    console.log("Clicked piece id:", pieceId, message);
  };

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
            <HomeBox
              pieceInfo={all_players.minion_too}
              onClickHandler={(key) => {
                homeBoxClickHandler(key, "Clicked minion too");
              }}
            />
          </div>

          <MoveBox
            onClickHandler={(key) => {
              homeBoxClickHandler(key, "Clicked movebox");
            }}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[1]]}
            idx={1}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={(key) => {
              homeBoxClickHandler(key, "Clicked movebox");
            }}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[2]]}
            idx={2}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={(key) => {
              homeBoxClickHandler(key, "Clicked movebox");
            }}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[3]]}
            idx={3}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox
              pieceInfo={nemesisPieceInfo}
              onClickHandler={(key) => {
                homeBoxClickHandler(key, "Clicked nemesis");
              }}
            />
          </div>

          {Array(21)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  onClickHandler={(key) => {
                    homeBoxClickHandler(key, "Clicked movebox");
                  }}
                  key={i}
                  playerPieceInfo={playerPieceInfo}
                  nemesisPieceInfo={nemesisPieceInfo}
                  boxColor={
                    corner_color_map[all_constants.CORNER_INDICES[i + 4]]
                  }
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
                  onClickHandler={(key) => {
                    homeBoxClickHandler(key, "Clicked movebox");
                  }}
                  key={i}
                  playerPieceInfo={playerPieceInfo}
                  nemesisPieceInfo={nemesisPieceInfo}
                  boxColor={
                    corner_color_map[all_constants.CORNER_INDICES[i + 25]]
                  }
                  idx={i + 25}
                  pieceColor={default_color}
                />
              );
            })}

          <div className="col-span-6 row-span-6">
            <HomeBox
              pieceInfo={playerPieceInfo}
              onClickHandler={(key) => {
                homeBoxClickHandler(key, "Clicked player");
                if (canUnlock(rolledNumber)) {
                  let nextLocation =
                    all_constants.REGULAR_PATH[
                      all_constants.START_BOXES_INDICES.player
                    ];
                  let newPieceInfo = updatePieceInfo(
                    playerPieceInfo,
                    key,
                    "location",
                    nextLocation
                  );
                  setPlayerPieceInfo(newPieceInfo);
                  console.log(playerPieceInfo);
                }
              }}
            />
          </div>
          <MoveBox
            onClickHandler={(key) => {
              homeBoxClickHandler(key, "Clicked movebox");
            }}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[64]]}
            idx={64}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={(key) => {
              homeBoxClickHandler(key, "Clicked movebox");
            }}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[65]]}
            idx={65}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={(key) => {
              homeBoxClickHandler(key, "Clicked movebox");
            }}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[66]]}
            idx={66}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox
              pieceInfo={all_players.minion_one}
              onClickHandler={(key) => {
                homeBoxClickHandler(key, "Clicked minion one");
              }}
            />
          </div>

          {Array(15)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  onClickHandler={(key) => {
                    homeBoxClickHandler(key, "Clicked movebox");
                    let nextLocation = getNextLocation(
                      playerPieceInfo[key],
                      rolledNumber,
                      true
                    );
                    let newPieceInfo = updatePieceInfo(
                      playerPieceInfo,
                      key,
                      "location",
                      nextLocation
                    );
                    setPlayerPieceInfo(newPieceInfo);
                    console.log("Moved to next box", playerPieceInfo);
                  }}
                  key={i}
                  playerPieceInfo={playerPieceInfo}
                  nemesisPieceInfo={nemesisPieceInfo}
                  boxColor={
                    corner_color_map[all_constants.CORNER_INDICES[i + 67]]
                  }
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

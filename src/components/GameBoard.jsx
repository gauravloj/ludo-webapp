import { ActionButton } from "./Button";
import { HomeBox } from "./HomeBox";
import { MoveBox } from "./MoveBox";
import { FinalDestination } from "./FinalDestination";
import { InfoBox } from "./InfoBox";
import { all_constants } from "../constants";
import { Dice } from "./Dice";
import { useState } from "react";
import { useReducer } from "react";

import {
  getInitialPieceInfo,
  isMoveValid,
  isMovePossible,
  canUnlock,
  updatePieceInfo,
  getNextLocation,
  isOnWinningPath,
} from "../gameplay";
import { playNemesis } from "../playerAI";
import { helperFunction } from "../helper";

function reducer(state, action) {
  switch (action.type) {
    case "DiceRolled": {
      console.log("In Reducer with case DiceRolled", state);
      return "pendingPieceSelection";
    }
    case "PieceSelected": {
      console.log("In Reducer with case PieceSelected", state);
      if (action.diceNumber == 6) {
        return "pendingDiceRoll";
      }
      return "pendingNemesisTurn";
    }
    case "NemesisPlayed": {
      console.log("In Reducer with case NemesisPlayed", state);
      return "pendingDiceRoll";
    }
  }
  throw Error("Unknown action: " + action);
}

export function GameBoard({ startGameHandler }) {
  const [messages, setMessages] = useState([]);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [currentUserState, dispatch] = useReducer(reducer, "pendingDiceRoll");
  const player_color = localStorage.getItem("selectedColor");
  const player_color_index = all_constants.COLOR_SEQUENCE.indexOf(player_color);
  const corner_color_map = {
    bottom_left: player_color,
    bottom_right: all_constants.COLOR_SEQUENCE[(player_color_index + 1) % 4],
    top_right: all_constants.COLOR_SEQUENCE[(player_color_index + 2) % 4],
    top_left: all_constants.COLOR_SEQUENCE[(player_color_index + 3) % 4],
    common: all_constants.COLORS.white,
  };
  const all_players = helperFunction.initializeAllPlayers();
  const [playerPieceInfo, setPlayerPieceInfo] = useState(all_players.player);
  const [nemesisPieceInfo, setNemesisPieceInfo] = useState(all_players.nemesis);
  const default_color = undefined;
  const homeBoxClickHandler = (pieceId, message) => {
    console.log("Clicked piece id:", pieceId, message);
  };

  const moveBoxClickHandler = (key) => {
    let isWinningPath = isOnWinningPath(playerPieceInfo[key], rolledNumber);
    let newPieceInfo;
    if (isWinningPath) {
      let nextIndex = getNextLocation(playerPieceInfo[key], rolledNumber);
      newPieceInfo = updatePieceInfo(
        playerPieceInfo,
        key,
        "isOnWinningPath",
        true,
      );
      newPieceInfo = updatePieceInfo(newPieceInfo, key, "boxIndex", nextIndex);
      newPieceInfo = updatePieceInfo(
        newPieceInfo,
        key,
        "location",
        playerPieceInfo[key].winningPath[nextIndex],
      );
    } else {
      let nextIndex = getNextLocation(playerPieceInfo[key], rolledNumber);
      newPieceInfo = updatePieceInfo(
        playerPieceInfo,
        key,
        "boxIndex",
        nextIndex,
      );
      newPieceInfo = updatePieceInfo(
        newPieceInfo,
        key,
        "location",
        all_constants.REGULAR_PATH[nextIndex],
      );
    }
    setPlayerPieceInfo(newPieceInfo);
    console.log("Moved to next box", playerPieceInfo);
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
              isPieceEnabled={false}
              pieceInfo={all_players.minion_too}
              onClickHandler={(key) => {
                homeBoxClickHandler(key, "Clicked minion too");
              }}
            />
          </div>

          <MoveBox
            onClickHandler={moveBoxClickHandler}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[1]]}
            idx={1}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={moveBoxClickHandler}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[2]]}
            idx={2}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={moveBoxClickHandler}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[3]]}
            idx={3}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox
              isPieceEnabled={false}
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
                  onClickHandler={moveBoxClickHandler}
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
            <FinalDestination
              playerPieces={playerPieceInfo}
              nemesisPieces={nemesisPieceInfo}
            />
          </div>
          {Array(30)
            .fill(1)
            .map((option, i) => {
              return (
                <MoveBox
                  onClickHandler={moveBoxClickHandler}
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
              isPieceEnabled={currentUserState == "pendingPieceSelection"}
              pieceInfo={playerPieceInfo}
              onClickHandler={(key) => {
                homeBoxClickHandler(key, "Clicked player");
                let pieceInfo = playerPieceInfo[key];
                if (canUnlock(rolledNumber)) {
                  let nextIndex = pieceInfo.startBoxIndex;
                  let newPieceInfo = updatePieceInfo(
                    playerPieceInfo,
                    key,
                    "boxIndex",
                    nextIndex,
                  );
                  newPieceInfo = updatePieceInfo(
                    newPieceInfo,
                    key,
                    "location",
                    all_constants.REGULAR_PATH[nextIndex],
                  );
                  setPlayerPieceInfo(newPieceInfo);
                  setMessages(["Unlocked piece", `Computer rolls next`]);
                  dispatch({
                    type: "PieceSelected",
                    diceNumber: rolledNumber,
                  });
                  if (currentUserState == "pendingNemesisTurn") {
                    playNemesis(dispatch);
                  }
                }
              }}
            />
          </div>
          <MoveBox
            onClickHandler={moveBoxClickHandler}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[64]]}
            idx={64}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={moveBoxClickHandler}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[65]]}
            idx={65}
            pieceColor={default_color}
          />
          <MoveBox
            onClickHandler={moveBoxClickHandler}
            playerPieceInfo={playerPieceInfo}
            nemesisPieceInfo={nemesisPieceInfo}
            boxColor={corner_color_map[all_constants.CORNER_INDICES[66]]}
            idx={66}
            pieceColor={default_color}
          />
          <div className="col-span-6 row-span-6">
            <HomeBox
              isPieceEnabled={false}
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
                  onClickHandler={moveBoxClickHandler}
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
            isEnabled={currentUserState == "pendingDiceRoll"}
            onClickActionHandler={(diceNumber) => {
              setRolledNumber(diceNumber);
              let canMove = isMovePossible(playerPieceInfo, diceNumber);
              if (canMove) {
                setMessages([`Select a piece to move`]);
                dispatch({ type: "DiceRolled", diceNumber: diceNumber });
              } else {
                setMessages([
                  "No valid moves available",
                  `Computer rolls next`,
                ]);
                dispatch({ type: "PieceSelected", diceNumber: diceNumber });
              }
            }}
          />
        </div>
      </div>
    </>
  );
}

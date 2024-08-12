import { Button } from "@headlessui/react";
import { ActionButton } from "./Button";
import { HomeBox } from "./HomeBox";
import { MoveBox } from "./MoveBox";
import { FinalDestination } from "./FinalDestination";
import { InfoBox } from "./InfoBox";
import { all_constants } from "../constants";
import { Dice, diceFrontMap } from "./Dice";
import { useEffect, useState } from "react";

import {
  isMovePossible,
  canUnlock,
  updatePieceInfo,
  getNextLocation,
  isOnWinningPath,
  checkCollision,
} from "../gameplay";
import { movePiece } from "../playerAI";
import { initializeAllPlayers, p } from "../helper";

export function GameBoard({ startGameHandler }) {
  const [messages, setMessages] = useState([]);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [currentUserState, setCurrentUserState] = useState(
    all_constants.USER_STATES.pendingDiceRoll,
  );
  let [isShowing, setIsShowing] = useState(true);
  let [diceFront, setDiceFront] = useState(diceFrontMap["1"]);
  const player_color = localStorage.getItem("selectedColor");
  const player_color_index = all_constants.COLOR_SEQUENCE.indexOf(player_color);
  const corner_color_map = {
    bottom_left: player_color,
    bottom_right: all_constants.COLOR_SEQUENCE[(player_color_index + 1) % 4],
    top_right: all_constants.COLOR_SEQUENCE[(player_color_index + 2) % 4],
    top_left: all_constants.COLOR_SEQUENCE[(player_color_index + 3) % 4],
    common: all_constants.COLORS.white,
  };
  const all_players = initializeAllPlayers(player_color);
  // Uncomment to test specific cases
  // all_players.player[1].location = 81;
  // all_players.nemesis[1].location = 4;
  // all_players.player[1].boxIndex = 49;
  // all_players.nemesis[1].boxIndex = 22;
  const [playerPieceInfo, setPlayerPieceInfo] = useState(all_players.player);
  const [nemesisPieceInfo, setNemesisPieceInfo] = useState(all_players.nemesis);
  const homeBoxClickHandler = (pieceId, message) => {
    p("Clicked piece id:", pieceId, message);
  };
  const playerRoll = (diceNumber) => {
    p("In playerRoll");
    let canMove = isMovePossible(playerPieceInfo, diceNumber);
    if (canMove) {
      setMessages([`You rolled ${diceNumber}`, `Select a piece to move`]);
      setCurrentUserState(all_constants.USER_STATES.pendingPieceSelection);
    } else {
      setMessages([
        "No valid moves available",
        `Nemesis turn to roll the dice`,
      ]);
      setCurrentUserState(all_constants.USER_STATES.pendingNemesisTurn);
    }
  };
  const nemesisRoll = (diceNumber) => {
    p("In nemesisRoll");
    let canMove = isMovePossible(nemesisPieceInfo, diceNumber);
    p(`In nemesis Roll function: ${canMove}`);
    if (canMove) {
      p("nemesisRoll: ", "Nemesis can move");
      let nextState = movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo);
      setNemesisPieceInfo(nextState);
      setMessages([`Nemesis rolled ${diceNumber}`, `Nemesis played the turn`]);
    } else {
      p("nemesisRoll: ", "Nemesis cannot move");
      setMessages([
        "No valid moves available for Nemesis",
        `Your turn to roll the dice`,
      ]);
    }
    if (diceNumber == 6) {
      setCurrentUserState(
        currentUserState == all_constants.USER_STATES.pendingSecondNemesisTurn
          ? all_constants.USER_STATES.pendingNemesisTurn
          : all_constants.USER_STATES.pendingSecondNemesisTurn,
      );
    } else {
      setCurrentUserState(all_constants.USER_STATES.pendingDiceRoll);
    }
  };

  const rollDie = (callRolledMessage) => {
    setIsShowing(false);
    setTimeout(() => {
      setIsShowing(true);
      let diceNumber = Math.floor(Math.random() * 6) + 1;
      setDiceFront(diceFrontMap[diceNumber]);
      setRolledNumber(diceNumber);
      callRolledMessage(diceNumber);
    }, 500);
  };

  const moveBoxClickHandler = (key) => {
    if (currentUserState !== all_constants.USER_STATES.pendingPieceSelection) {
      return;
    }
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
      if (nextIndex === 6) {
        newPieceInfo = updatePieceInfo(newPieceInfo, key, "isCompleted", true);
      }
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
      let [isCollison, collisionKey] = checkCollision(
        nextIndex,
        nemesisPieceInfo,
      );
      if (isCollison) {
        p("Nemesis pieces");
        let newNemesisPieceInfo;
        newNemesisPieceInfo = updatePieceInfo(
          nemesisPieceInfo,
          collisionKey,
          "boxIndex",
          -1,
        );
        newNemesisPieceInfo = updatePieceInfo(
          newNemesisPieceInfo,
          collisionKey,
          "location",
          -1,
        );
        setNemesisPieceInfo(newNemesisPieceInfo);
      }
    }
    setPlayerPieceInfo(newPieceInfo);
    p("moveBoxClickHandler", "Moved to next box");
    if (rolledNumber === 6) {
      setCurrentUserState(all_constants.USER_STATES.pendingDiceRoll);
    } else {
      setCurrentUserState(all_constants.USER_STATES.pendingNemesisTurn);
    }
  };

  useEffect(() => {
    p("useEffect: ", "Current user state", currentUserState);
    if (
      currentUserState === all_constants.USER_STATES.pendingNemesisTurn ||
      currentUserState === all_constants.USER_STATES.pendingSecondNemesisTurn
    ) {
      p("useEffect: ", "Nemesis turn");

      setTimeout(() => {
        rollDie((diceNumber) => {
          nemesisRoll(diceNumber);
          p("rollDie: ", "Nemesis played", diceNumber);
        });
      }, 3000);
    }
  }, [currentUserState]);

  const getMoveBox = (idx) => {
    return (
      <MoveBox
        key={idx}
        isPieceEnabled={
          currentUserState == all_constants.USER_STATES.pendingPieceSelection
        }
        onClickHandler={moveBoxClickHandler}
        playerPieceInfo={playerPieceInfo}
        nemesisPieceInfo={nemesisPieceInfo}
        boxColor={corner_color_map[all_constants.CORNER_INDICES[idx]]}
        idx={idx}
      />
    );
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
              setPlayerPieceInfo(all_players.player);
              setNemesisPieceInfo(all_players.nemesis);
              setMessages(["Game restarted"]);
              setCurrentUserState(all_constants.USER_STATES.pendingDiceRoll);
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

          {getMoveBox(1)}
          {getMoveBox(2)}
          {getMoveBox(3)}
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
              return getMoveBox(i + 4);
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
              return getMoveBox(i + 25);
            })}

          <div className="col-span-6 row-span-6">
            <HomeBox
              isPieceEnabled={
                currentUserState ==
                all_constants.USER_STATES.pendingPieceSelection
              }
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
                  if (rolledNumber === 6) {
                    setCurrentUserState(
                      all_constants.USER_STATES.pendingDiceRoll,
                    );
                  } else {
                    setCurrentUserState(
                      all_constants.USER_STATES.pendingNemesisTurn,
                    );
                  }
                }
              }}
            />
          </div>
          {getMoveBox(64)}
          {getMoveBox(65)}
          {getMoveBox(66)}
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
              return getMoveBox(i + 67);
            })}
        </div>
        <div>
          <InfoBox messages={messages} />

          <div className="mt-8 flex flex-col items-center m-8">
            <Dice diceFront={diceFront} isShowing={isShowing} />

            <Button
              id="diceButtonId"
              disabled={
                currentUserState !== all_constants.USER_STATES.pendingDiceRoll
              }
              onClick={() => {
                rollDie(playerRoll);
              }}
              className="mt-10 flex items-center gap-2 rounded-full bg-white/10 py-1 px-3 text-sm/6 font-semibold transition data-[hover]:scale-105 data-[hover]:bg-white/15"
            >
              <span>Roll that die!</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

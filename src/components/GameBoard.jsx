import { Button } from "@headlessui/react";
import { ActionButton } from "./Button";
import { HomeBox } from "./HomeBox";
import { MoveBox } from "./MoveBox";
import { FinalDestination } from "./FinalDestination";
import { InfoBox } from "./InfoBox";
import { all_constants } from "../constants";
import { Dice, diceFrontMap } from "./Dice";
import { EndGamePopup } from "./EndGamePopup";
import { useEffect, useRef, useState } from "react";

import {
  isMovePossible,
  canUnlock,
  updatePieceInfo,
  movePlayerPiece,
} from "../gameplay";
import { movePiece } from "../nemesisAI";
import { initializeAllPlayers, p } from "../helper";

function initializeForDebugging(player_color) {
  let all_players = initializeAllPlayers(player_color);
  all_players.player[1].location = 68;
  all_players.player[1].boxIndex = 4;
  all_players.player[1].isOnWinningPath = true;
  /* all_players.player[1].isCompleted = true;
  all_players.player[2].location = -666;
  all_players.player[2].boxIndex = 6;
  all_players.player[2].isOnWinningPath = true;
  all_players.player[2].isCompleted = true;
  all_players.player[3].location = -666;
  all_players.player[3].boxIndex = 6;
  all_players.player[3].isOnWinningPath = true;
  all_players.player[3].isCompleted = true;
  all_players.player[4].location = 74;
  all_players.player[4].boxIndex = 2;
  all_players.player[4].isOnWinningPath = true;

  all_players.nemesis[1].location = -666;
  all_players.nemesis[1].boxIndex = 6;
  all_players.nemesis[1].isOnWinningPath = true;
  all_players.nemesis[1].isCompleted = true;
  all_players.nemesis[2].location = -666;
  all_players.nemesis[2].boxIndex = 6;
  all_players.nemesis[2].isOnWinningPath = true;
  all_players.nemesis[2].isCompleted = true;
  all_players.nemesis[3].location = -666;
  all_players.nemesis[3].boxIndex = 6;
  all_players.nemesis[3].isOnWinningPath = true;
  all_players.nemesis[3].isCompleted = true;
  all_players.nemesis[4].location = 8;
  all_players.nemesis[4].boxIndex = 2;
  all_players.nemesis[4].isOnWinningPath = true;*/

  return all_players;
}

export function GameBoard({ startGameHandler }) {
  const [messages, setMessages] = useState([]);
  const [rolledNumber, setRolledNumber] = useState(1);
  const [currentUserState, setCurrentUserState] = useState(
    all_constants.USER_STATES.pendingDiceRoll,
  );
  let [isShowing, setIsShowing] = useState(true);
  let [diceFront, setDiceFront] = useState(diceFrontMap["1"]);
  let [isOpen, setIsOpen] = useState(false);
  const endGameWinner = useRef("");
  let nemesisTimeOut = useRef(null);

  const player_color = localStorage.getItem("selectedColor");
  const player_color_index = all_constants.COLOR_SEQUENCE.indexOf(player_color);
  const corner_color_map = {
    bottom_left: player_color,
    bottom_right: all_constants.COLOR_SEQUENCE[(player_color_index + 1) % 4],
    top_right: all_constants.COLOR_SEQUENCE[(player_color_index + 2) % 4],
    top_left: all_constants.COLOR_SEQUENCE[(player_color_index + 3) % 4],
    common: all_constants.COLORS.white,
  };
  const all_players = initializeForDebugging(player_color);

  const [playerPieceInfo, setPlayerPieceInfo] = useState(all_players.player);
  const [nemesisPieceInfo, setNemesisPieceInfo] = useState(all_players.nemesis);

  const playerRoll = (diceNumber) => {
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
    let canMove = isMovePossible(nemesisPieceInfo, diceNumber);
    let isCollided = false;
    if (canMove) {
      let [nextNemesisState, nextPlayerPieceInfo, isCollision, hasWon] =
        movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo);
      isCollided = isCollision;
      if (hasWon) {
        setMessages(["Nemesis won the game", "Game over"]);
        setNemesisPieceInfo(nextNemesisState);
        setCurrentUserState(all_constants.USER_STATES.gameOver);
        endGameWinner.current = "nemesis";
        setIsOpen(true);
        return;
      }
      setNemesisPieceInfo(nextNemesisState);
      if (isCollided) {
        setPlayerPieceInfo(nextPlayerPieceInfo);
      }
    }
    if (canMove && diceNumber == 6) {
      setCurrentUserState(
        currentUserState == all_constants.USER_STATES.pendingSecondNemesisTurn
          ? all_constants.USER_STATES.pendingNemesisTurn
          : all_constants.USER_STATES.pendingSecondNemesisTurn,
      );
      if (isCollided) {
        setMessages([
          `Nemesis rolled ${diceNumber}`,
          `Nemesis played the turn`,
          `Nemesis killed your piece`,
          `Nemesis will roll dice again`,
        ]);
      } else {
        setMessages([
          `Nemesis rolled ${diceNumber}`,
          `Nemesis played the turn`,
          `Nemesis will roll dice again`,
        ]);
      }
    } else {
      setCurrentUserState(all_constants.USER_STATES.pendingDiceRoll);
      if (canMove) {
        if (isCollided) {
          setMessages([
            `Nemesis rolled ${diceNumber}`,
            `Nemesis played the turn`,
            `Nemesis killed your piece`,
            `Your turn to roll dice`,
          ]);
        } else {
          setMessages([
            `Nemesis rolled ${diceNumber}`,
            `Nemesis played the turn`,
            `Your turn to roll dice`,
          ]);
        }
      } else {
        setMessages([
          `No valid moves available for Nemesis`,
          `Your turn to roll the dice`,
        ]);
      }
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

    let [newPlayerPieceInfo, isCollided, newNemesisPieceInfo, hasWon] =
      movePlayerPiece(playerPieceInfo, nemesisPieceInfo, key, rolledNumber);
    if (hasWon) {
      setMessages(["You won the game", "Game over"]);
      setPlayerPieceInfo(newPlayerPieceInfo);
      setCurrentUserState(all_constants.USER_STATES.gameOver);
      endGameWinner.current = "player";
      setIsOpen(true);
      return;
    }
    if (isCollided) {
      setNemesisPieceInfo(newNemesisPieceInfo);
    }
    setPlayerPieceInfo(newPlayerPieceInfo);
    if (rolledNumber === 6) {
      setCurrentUserState(all_constants.USER_STATES.pendingDiceRoll);
      if (isCollided) {
        setMessages(["You killed nemesis piece", "Your turn to roll again"]);
      } else {
        setMessages(["You played a piece", "Your turn to roll again"]);
      }
    } else {
      setCurrentUserState(all_constants.USER_STATES.pendingNemesisTurn);
      if (isCollided) {
        setMessages(["You killed nemesis piece", "Nemesis turn to roll"]);
      } else {
        setMessages(["You played a piece", "Nemesis turn to roll"]);
      }
    }
  };

  useEffect(() => {
    if (
      currentUserState === all_constants.USER_STATES.pendingNemesisTurn ||
      currentUserState === all_constants.USER_STATES.pendingSecondNemesisTurn
    ) {
      nemesisTimeOut.current = setTimeout(() => {
        rollDie((diceNumber) => {
          nemesisRoll(diceNumber);
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
              if (nemesisTimeOut.current) {
                clearTimeout(nemesisTimeOut.current);
              }
              startGameHandler(true);
            }}
          />
        </div>
        <div className="grid grid-cols-15 gap-0">
          <div className="col-span-6 row-span-6">
            <HomeBox
              isPieceEnabled={false}
              pieceInfo={all_players.minion_too}
            />
          </div>

          {getMoveBox(1)}
          {getMoveBox(2)}
          {getMoveBox(3)}
          <div className="col-span-6 row-span-6">
            <HomeBox isPieceEnabled={false} pieceInfo={nemesisPieceInfo} />
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
                  if (rolledNumber === 6) {
                    setCurrentUserState(
                      all_constants.USER_STATES.pendingDiceRoll,
                    );
                    setMessages([
                      "You unlocked piece",
                      `Your turn to roll again`,
                    ]);
                  } else {
                    setCurrentUserState(
                      all_constants.USER_STATES.pendingNemesisTurn,
                    );
                    setMessages(["You unlocked piece", `Nemesis rolls next`]);
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
            <EndGamePopup
              winner={endGameWinner.current}
              isOpen={isOpen}
              updatePopupState={setIsOpen}
            />
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

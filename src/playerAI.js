import { all_constants } from "./constants";
import { getLockedPiecesCount, updatePieceInfo } from "./gameplay";
export function playNemesis(rollDie, nemesisRoll, setCurrentUserState) {
  rollDie((diceNumber) => {
    nemesisRoll(diceNumber);
    console.log("Nemesis played");
    movePiece();
    setCurrentUserState(all_constants.USER_STATES.pendingDiceRoll);
  });

  //   setTimeout(() => {
  //     console.log("Nemesis finished playing");
  //     finishTurnCallback();
  //   }, 1000);
}

/*function rollDice() {
  let diceElement = document.getElementById("diceButtonId");
  diceElement.setAttribute("disabled", false);
  diceElement.onclick();
  console.log("Nemesis clicked dice button");
  //diceElement.click();
  diceElement.setAttribute("disabled", true);
}*/
export function movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo) {
  // check for lockedPieces
  if (
    (diceNumber === 6 || diceNumber === 1) &&
    getLockedPiecesCount(nemesisPieceInfo) > 0
  ) {
    let toUnlock = Object.keys(nemesisPieceInfo).filter(
      (piece) => nemesisPieceInfo[piece].location === -1,
    )[0];
    // if lockedPieces, move them
    // play the first unlocked piece
    let nextIndex = nemesisPieceInfo[toUnlock].startBoxIndex;
    let newInfo = updatePieceInfo(
      nemesisPieceInfo,
      toUnlock,
      "location",
      all_constants.REGULAR_PATH[nextIndex],
    );
    newInfo = updatePieceInfo(newInfo, toUnlock, "boxIndex", nextIndex);
    console.log("Nemesis unlocked piece", toUnlock);
    return newInfo;
  }

  // if unlockedPieces, move them

  // else, move the piece that is closest to the winning path

  // if the piece is already on the winning path, move the piece
  // that is closest to the winning path

  // if player piece is few steps behind, move that nemesis piece

  // if player piece ahead of nemesis can be killed by nemesis, move that piece

  // else play the first unlocked piece

  console.log("Nemesis Moved Piece");
  return nemesisPieceInfo;
}

function changeState() {}

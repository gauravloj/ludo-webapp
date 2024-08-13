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

function getNextNemesisLocation(pieceInfo, rolledNumber) {
  if (pieceInfo.isOnWinningPath) {
    if (pieceInfo.boxIndex + rolledNumber > 6) {
      return pieceInfo.boxIndex;
    }
    return pieceInfo.boxIndex + rolledNumber;
  }

  let nextIndex = pieceInfo.boxIndex;
  if (!isOnWinningPath(pieceInfo, rolledNumber)) {
    nextIndex = (nextIndex + rolledNumber) % 52;
  } else {
    nextIndex = nextIndex + rolledNumber - pieceInfo.endBoxIndex;
  }
  return nextIndex;
}

function isOnWinningPath(pieceInfo, rolledNumber) {
  if (pieceInfo.isOnWinningPath) {
    return true;
  }

  return (
    pieceInfo.boxIndex <= pieceInfo.endBoxIndex &&
    pieceInfo.boxIndex + rolledNumber > pieceInfo.endBoxIndex
  );
}

export function movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo) {
  // check for lockedPieces
  let nextIndex;
  let lockedPieces = getLockedPiecesCount(nemesisPieceInfo);
  if ((diceNumber === 6 || diceNumber === 1) && lockedPieces > 0) {
    let toUnlock = Object.keys(nemesisPieceInfo).filter(
      (piece) => nemesisPieceInfo[piece].location === -1,
    )[0];
    // if lockedPieces, move them
    // play the first unlocked piece
    nextIndex = nemesisPieceInfo[toUnlock].startBoxIndex;
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

  // play first unlocked piece
  if (lockedPieces < 4) {
    let unlockedPieceKeys = Object.keys(nemesisPieceInfo).filter(
      (piece) =>
        nemesisPieceInfo[piece].location !== -1 &&
        !nemesisPieceInfo[piece].isCompleted,
    );
    let nextLocations = {};
    unlockedPieceKeys.forEach((keyName) => {
      nextLocations[keyName] = getNextNemesisLocation(
        nemesisPieceInfo[keyName],
        diceNumber,
      );
    });

    let newPieceInfo = nemesisPieceInfo;
    let isOnWinningPathFlag = isOnWinningPath(
      newPieceInfo[unlockedPieceKeys[0]],
      diceNumber,
    );
    if (isOnWinningPathFlag) {
      nextIndex = nextLocations[unlockedPieceKeys[0]];
      newPieceInfo = updatePieceInfo(
        newPieceInfo,
        unlockedPieceKeys[0],
        "isOnWinningPath",
        true,
      );
      if (nextIndex === 6) {
        newPieceInfo = updatePieceInfo(
          newPieceInfo,
          unlockedPieceKeys[0],
          "isCompleted",
          true,
        );
      }
      newPieceInfo = updatePieceInfo(
        newPieceInfo,
        unlockedPieceKeys[0],
        "boxIndex",
        nextIndex,
      );
      newPieceInfo = updatePieceInfo(
        newPieceInfo,
        unlockedPieceKeys[0],
        "location",
        nemesisPieceInfo[unlockedPieceKeys[0]].winningPath[nextIndex],
      );
    } else {
      newPieceInfo = updatePieceInfo(
        nemesisPieceInfo,
        unlockedPieceKeys[0],
        "location",
        all_constants.REGULAR_PATH[nextLocations[unlockedPieceKeys[0]]],
      );
      newPieceInfo = updatePieceInfo(
        newPieceInfo,
        unlockedPieceKeys[0],
        "boxIndex",
        nextLocations[unlockedPieceKeys[0]],
      );
      console.log("Nemesis unlocked piece", unlockedPieceKeys[0]);
    }
    return newPieceInfo;
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

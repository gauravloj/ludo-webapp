import { all_constants } from "./constants";
import {
  checkCollision,
  getLockedPiecesCount,
  updatePieceInfo,
} from "./gameplay";

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

function getNextNemesisBoxIndex(pieceInfo, rolledNumber) {
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

function unlockNemesisPiece(nemesisPieceInfo) {
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

function moveSelectedNemesisPiece(
  nemesisPieceInfo,
  key,
  nextBoxIndex,
  diceNumber,
) {
  let newPieceInfo = nemesisPieceInfo;
  let isOnWinningPathFlag = isOnWinningPath(newPieceInfo[key], diceNumber);
  if (isOnWinningPathFlag) {
    let nextIndex = nextBoxIndex.boxIndex;
    newPieceInfo = updatePieceInfo(newPieceInfo, key, "isOnWinningPath", true);
    if (nextIndex === 6) {
      newPieceInfo = updatePieceInfo(newPieceInfo, key, "isCompleted", true);
    }
    newPieceInfo = updatePieceInfo(newPieceInfo, key, "boxIndex", nextIndex);
    newPieceInfo = updatePieceInfo(
      newPieceInfo,
      key,
      "location",
      nemesisPieceInfo[key].winningPath[nextIndex],
    );
  } else {
    newPieceInfo = updatePieceInfo(
      nemesisPieceInfo,
      key,
      "location",
      all_constants.REGULAR_PATH[nextBoxIndex.boxIndex],
    );
    newPieceInfo = updatePieceInfo(
      newPieceInfo,
      key,
      "boxIndex",
      nextBoxIndex.boxIndex,
    );
    console.log("Nemesis unlocked piece", key);
  }
  return newPieceInfo;
}

function checkIfCanKill(nextBoxIndexes, playerPieceInfo) {
  for (let nemesisPieceKey in nextBoxIndexes) {
    if (
      !nextBoxIndexes[nemesisPieceKey].isOnWinningPath &&
      checkCollision(
        all_constants.REGULAR_PATH[nextBoxIndexes[nemesisPieceKey]],
        playerPieceInfo,
      )
    ) {
      return nemesisPieceKey;
    }
  }
  return undefined;
}
function checkForUnsafePiece(
  unlockedPieceKeys,
  nemesisPieceInfo,
  nextBoxIndexes,
  playerPieceInfo,
  diceNumber,
) {
  for (let nemesisPieceKey of unlockedPieceKeys) {
    let nemesisPiece = nemesisPieceInfo[nemesisPieceKey];
    if (!nemesisPiece.isOnWinningPath) {
      for (let playerPieceKey of playerPieceInfo) {
        if (playerPieceInfo.boxIndex + 6 - nemesisPiece.boxIndex > 0) {
        }
        //TODO: Fix this check first
      }
      return nemesisPieceKey;
    }
  }
}

export function movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo) {
  // check for lockedPieces
  let nextIndex;
  let lockedPieces = getLockedPiecesCount(nemesisPieceInfo);
  if ((diceNumber === 6 || diceNumber === 1) && lockedPieces > 0) {
    return unlockNemesisPiece(nemesisPieceInfo);
  }

  // Get all next location to make the next strategic move
  if (lockedPieces < 4) {
    let unlockedPieceKeys = Object.keys(nemesisPieceInfo).filter(
      (piece) =>
        nemesisPieceInfo[piece].location !== -1 &&
        !nemesisPieceInfo[piece].isCompleted,
    );
    let nextBoxIndexes = [];
    unlockedPieceKeys.forEach((keyName) => {
      let currentInfo = {};
      currentInfo["nextBoxIndex"] = getNextNemesisBoxIndex(
        nemesisPieceInfo[keyName],
        diceNumber,
      );
      currentInfo["isOnWinningPath"] = isOnWinningPath(
        nemesisPieceInfo[keyName],
        diceNumber,
      );
      currentInfo["keyName"] = keyName;
      nextBoxIndexes.push(currentInfo);
    });
    //sort based on box indices
    nextBoxIndexes.sort(function (a, b) {
      let c = JSON.parse(JSON.stringify(a));
      let d = JSON.parse(JSON.stringify(b));
      if (c.nextBoxIndex >= 26) c.nextBoxIndex -= 51;
      if (d.nextBoxIndex >= 26) d.nextBoxIndex -= 51;
      return d.nextBoxIndex - c.nextBoxIndex;
    });

    let selectedKey = undefined;
    // Selection logic
    let killKey = checkIfCanKill(nextBoxIndexes, playerPieceInfo);
    if (killKey) {
      selectedKey = killKey;
    } else {
      checkForUnsafePiece(
        unlockedPieceKeys,
        nemesisPieceInfo,
        nextBoxIndexes,
        playerPieceInfo,
        diceNumber,
      );
      // else, move the piece that is closest to the winning path

      // if the piece is already on the winning path, move the piece
      // that is closest to the winning path

      // if player piece is few steps behind, move that nemesis piece

      // if player piece ahead of nemesis can be killed by nemesis, move that piece

      // else play the first unlocked piece
    }
    return moveSelectedNemesisPiece(
      nemesisPieceInfo,
      unlockedPieceKeys[selectedKey],
      nextBoxIndexes.filter((piece) => piece.keyName == selectedKey)[0],
      diceNumber,
    );
  }

  console.log("Nemesis Moved Piece");
  return nemesisPieceInfo;
}

function changeState() {}

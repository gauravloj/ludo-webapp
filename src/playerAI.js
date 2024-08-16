import { all_constants } from "./constants";
import {
  checkCollision,
  getLockedPiecesCount,
  isSafeBox,
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
  nextBoxObject,
  playerPieceInfo,
) {
  let newNemesisPieceInfo = nemesisPieceInfo;
  let newPlayerPieceInfo = playerPieceInfo;
  let isCollided = false;
  let isOnWinningPathFlag = nextBoxObject.isOnWinningPath;
  let nextIndex = nextBoxObject.nextBoxIndex;
  if (isOnWinningPathFlag) {
    newNemesisPieceInfo = updatePieceInfo(
      newNemesisPieceInfo,
      key,
      "isOnWinningPath",
      true,
    );
    if (nextIndex === 6) {
      newNemesisPieceInfo = updatePieceInfo(
        newNemesisPieceInfo,
        key,
        "isCompleted",
        true,
      );
    }
    newNemesisPieceInfo = updatePieceInfo(
      newNemesisPieceInfo,
      key,
      "boxIndex",
      nextIndex,
    );
    newNemesisPieceInfo = updatePieceInfo(
      newNemesisPieceInfo,
      key,
      "location",
      nemesisPieceInfo[key].winningPath[nextIndex],
    );
  } else {
    newNemesisPieceInfo = updatePieceInfo(
      nemesisPieceInfo,
      key,
      "location",
      all_constants.REGULAR_PATH[nextIndex],
    );
    newNemesisPieceInfo = updatePieceInfo(
      newNemesisPieceInfo,
      key,
      "boxIndex",
      nextIndex,
    );
    let collidedKey;
    [isCollided, collidedKey] = checkCollision(nextIndex, playerPieceInfo);
    if (isCollided) {
      newPlayerPieceInfo = updatePieceInfo(
        newPlayerPieceInfo,
        collidedKey,
        "location",
        -1,
      );
      newPlayerPieceInfo = updatePieceInfo(
        newPlayerPieceInfo,
        collidedKey,
        "boxIndex",
        -1,
      );
    }

    console.log("Nemesis unlocked piece", key);
  }
  return [newNemesisPieceInfo, newPlayerPieceInfo, isCollided];
}

function checkIfCanKill(nextBoxIndexes, playerPieceInfo) {
  for (let nemesisPiece of nextBoxIndexes) {
    let [isCollided] = checkCollision(
      nemesisPiece.nextBoxIndex,
      playerPieceInfo,
    );
    if (!nemesisPiece.isOnWinningPath && isCollided) {
      return nemesisPiece.keyName;
    }
  }
  return undefined;
}

function isSafeBoxIndex(pieceBoxIndex, playerPieceInfo) {
  // boxIndex 51 is safe assuming that player will
  // go to winning path instead of killing nemesis
  if (isSafeBox(pieceBoxIndex) || pieceBoxIndex === 51) {
    return true;
  }

  for (let playerPiece of playerPieceInfo) {
    if (pieceBoxIndex - playerPiece.boxIndex <= 6) {
      return true;
    }
  }
  return false;
}

function checkForUnsafePiece(
  unlockedPieceKeys,
  nemesisPieceInfo,
  nextBoxIndexes,
  playerPieceInfo,
  diceNumber,
) {
  // Check if two pieces are at the same location
  // let indexCount = {};
  // Object.entries(nemesisPieceInfo).reduce((acc, currVal) => {
  //   acc[currVal.boxIndex] = (acc[currVal.boxIndex]  || 0)+ 1;
  // }, indexCount);

  for (let nemesisPieceKey of unlockedPieceKeys) {
    let nemesisPiece = nemesisPieceInfo[nemesisPieceKey];
    if (
      !nemesisPiece.isOnWinningPath &&
      !isSafeBoxIndex(nemesisPiece.boxIndex, playerPieceInfo)
    ) {
      let nextBoxInfo = nextBoxIndexes.filter(
        (piece) => piece.keyName === nemesisPieceKey,
      )[0];

      if (
        nextBoxInfo &&
        isSafeBoxIndex(nextBoxInfo.nextBoxIndex, playerPieceInfo)
      ) {
        return nemesisPieceKey;
      }

      // if the piece is already on the winning path, move the piece
      // that is closest to the winning path
      if (nemesisPiece.isOnWinningPath) {
        return nemesisPiece.keyName;
      }
    }
  }

  // for (let nemesisPieceKey of nextBoxIndexes) {
  //   let nemesisPiece = nemesisPieceInfo[nemesisPieceKey];
  //   if (!nemesisPiece.isOnWinningPath) {
  //     for (let playerPieceKey of playerPieceInfo) {
  //       if (playerPieceInfo.boxIndex + 6 - nemesisPiece.boxIndex > 0) {
  //       }
  //       //TODO: Fix this check first
  //     }
  //     return nemesisPieceKey;
  //   }
  // }
}

export function movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo) {
  // check for lockedPieces
  let nextIndex;
  let lockedPieces = getLockedPiecesCount(nemesisPieceInfo);
  if ((diceNumber === 6 || diceNumber === 1) && lockedPieces > 0) {
    // third param is 'isCollided' which is false for this case
    return [unlockNemesisPiece(nemesisPieceInfo), playerPieceInfo, false];
  }

  // Get all next location to make the next strategic move
  if (lockedPieces < 4) {
    let unlockedPieceKeys = getUnlockedPieceKeys(nemesisPieceInfo);
    let nextBoxIndexes = sortNextBoxIndices(
      unlockedPieceKeys,
      nemesisPieceInfo,
      diceNumber,
    );

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
      selectedKey,
      nextBoxIndexes.filter((piece) => piece.keyName == selectedKey)[0],
      playerPieceInfo,
    );
  }

  console.log("Nemesis Moved Piece");
  return [nemesisPieceInfo, playerPieceInfo, false];
}

function sortNextBoxIndices(unlockedPieceKeys, nemesisPieceInfo, diceNumber) {
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
    let aBoxIndex = a.nextBoxIndex;
    let bBoxIndex = b.nextBoxIndex;
    if (aBoxIndex >= 26) aBoxIndex -= 51;
    if (bBoxIndex >= 26) bBoxIndex -= 51;
    return bBoxIndex - aBoxIndex;
  });
  return nextBoxIndexes;
}

function getUnlockedPieceKeys(nemesisPieceInfo) {
  return Object.keys(nemesisPieceInfo).filter(
    (piece) =>
      nemesisPieceInfo[piece].location !== -1 &&
      !nemesisPieceInfo[piece].isCompleted,
  );
}

function changeState() {}

import { all_constants } from "./constants";
import {
  checkCollision,
  getLockedPiecesCount,
  isGameWon,
  isSafeBox,
  updatePieceInfo,
} from "./gameplay";

function getNextNemesisBoxIndex(pieceInfo, rolledNumber) {
  if (pieceInfo.isOnWinningPath) {
    if (pieceInfo.boxIndex + rolledNumber > 6) {
      return null;
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
  let hasWon = false;
  let isOnWinningPathFlag = nextBoxObject.isOnWinningPath;
  let nextIndex = nextBoxObject.nextBoxIndex;
  if (isOnWinningPathFlag) {
    newNemesisPieceInfo = updatePieceInfo(
      newNemesisPieceInfo,
      key,
      "isOnWinningPath",
      true,
    );
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
    if (nextIndex === 6) {
      newNemesisPieceInfo = updatePieceInfo(
        newNemesisPieceInfo,
        key,
        "isCompleted",
        true,
      );
      hasWon = isGameWon(newNemesisPieceInfo);
    }
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
  }
  return [newNemesisPieceInfo, newPlayerPieceInfo, isCollided, hasWon];
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

function isSafeBoxIndex(
  key,
  pieceBoxIndex,
  isOnWinningPath,
  playerPieceInfo,
  nemesisPieceInfo,
) {
  // boxIndex 51 is safe assuming that player will
  // go to winning path instead of killing nemesis
  if (isSafeBox(pieceBoxIndex) || pieceBoxIndex === 51 || isOnWinningPath) {
    return true;
  }
  for (let nemesisPieceKey in nemesisPieceInfo) {
    let nemesisPiece = nemesisPieceInfo[nemesisPieceKey];
    if (
      !nemesisPiece.isOnWinningPath &&
      key != nemesisPieceKey &&
      nemesisPiece.boxIndex === pieceBoxIndex
    ) {
      return true;
    }
  }
  for (let playerPieceKey in playerPieceInfo) {
    let playerPiece = playerPieceInfo[playerPieceKey];
    if (
      playerPiece.boxIndex !== -1 &&
      pieceBoxIndex - playerPiece.boxIndex <= 6 &&
      pieceBoxIndex - playerPiece.boxIndex > 0
    ) {
      return false;
    }
  }
  return true;
}

function checkForUnsafePiece(
  unlockedPieceKeys,
  nemesisPieceInfo,
  nextBoxIndexes,
  playerPieceInfo,
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
      !isSafeBoxIndex(
        nemesisPieceKey,
        nemesisPiece.boxIndex,
        nemesisPiece.isOnWinningPath,
        playerPieceInfo,
        nemesisPieceInfo,
      )
    ) {
      let nextBoxInfo = nextBoxIndexes.filter(
        (piece) => piece.keyName === nemesisPieceKey,
      )[0];

      if (
        nextBoxInfo &&
        isSafeBoxIndex(
          nemesisPieceKey,
          nextBoxInfo.nextBoxIndex,
          nextBoxInfo.isOnWinningPath,
          playerPieceInfo,
          nemesisPieceInfo,
        )
      ) {
        return nemesisPieceKey;
      }
    }
  }
  return undefined;
}
function moveToSafePlacePiece(
  unlockedPieceKeys,
  nemesisPieceInfo,
  nextBoxIndexes,
  playerPieceInfo,
) {
  // Check if two pieces are at the same location
  // let indexCount = {};
  // Object.entries(nemesisPieceInfo).reduce((acc, currVal) => {
  //   acc[currVal.boxIndex] = (acc[currVal.boxIndex]  || 0)+ 1;
  // }, indexCount);

  for (let nemesisPieceKey of unlockedPieceKeys) {
    let nemesisPiece = nemesisPieceInfo[nemesisPieceKey];
    if (!nemesisPiece.isOnWinningPath) {
      let nextBoxInfo = nextBoxIndexes.filter(
        (piece) => piece.keyName === nemesisPieceKey,
      )[0];

      if (
        nextBoxInfo &&
        isSafeBoxIndex(
          nemesisPieceKey,
          nextBoxInfo.nextBoxIndex,
          nextBoxInfo.isOnWinningPath,
          playerPieceInfo,
          nemesisPieceInfo,
        )
      ) {
        return nemesisPieceKey;
      }
    }
  }
  return undefined;
}

function moveUnsafeToUnsafePieceKey(
  unlockedPieceKeys,
  nemesisPieceInfo,
  nextBoxIndexes,
  playerPieceInfo,
) {
  for (let nemesisPieceKey of unlockedPieceKeys) {
    let nemesisPiece = nemesisPieceInfo[nemesisPieceKey];
    if (
      !nemesisPiece.isOnWinningPath &&
      !isSafeBoxIndex(
        nemesisPieceKey,
        nemesisPiece.boxIndex,
        nemesisPiece.isOnWinningPath,
        playerPieceInfo,
        nemesisPieceInfo,
      )
    ) {
      let nextBoxInfo = nextBoxIndexes.filter(
        (piece) => piece.keyName === nemesisPieceKey,
      )[0];

      if (
        nextBoxInfo &&
        !isSafeBoxIndex(
          nemesisPieceKey,
          nextBoxInfo.nextBoxIndex,
          nextBoxInfo.isOnWinningPath,
          playerPieceInfo,
          nemesisPieceInfo,
        )
      ) {
        return nemesisPieceKey;
      }
    }
  }
  return undefined;
}

function nextPieceToMove(unlockedPieceKeys, nemesisPieceInfo) {
  for (let nemesisPieceKey of unlockedPieceKeys) {
    let nemesisPiece = nemesisPieceInfo[nemesisPieceKey];
    if (nemesisPiece.isOnWinningPath) {
      return nemesisPieceKey;
    }
  }
  return unlockedPieceKeys[unlockedPieceKeys.length - 1];
}

export function movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo) {
  // Selection logic
  // Checks to be done:
  // 1. Can piece be unlocked?
  // 2. Can piece kill
  // 3. Can piece be moved from unsafe to safe position
  // 4. Can piece be moved from safe to safe position
  // 5. Move highest unsafe piece to unsafe
  // 6. Move winning path piece
  // 7. Move lowest safe piece safe to unsafe

  // check for lockedPieces
  // 1. Can piece be unlocked?
  let lockedPieces = getLockedPiecesCount(nemesisPieceInfo);
  let hasWon = false;
  if ((diceNumber === 6 || diceNumber === 1) && lockedPieces > 0) {
    // third param is 'isCollided' which is false for this case
    return [
      unlockNemesisPiece(nemesisPieceInfo),
      playerPieceInfo,
      false,
      false,
    ];
  }

  // Get all next location to make the next strategic move
  if (lockedPieces < 4) {
    let unlockedPieceKeys = getUnlockedPieceKeys(nemesisPieceInfo);
    let nextBoxIndexes = sortNextBoxIndices(
      unlockedPieceKeys,
      nemesisPieceInfo,
      diceNumber,
    );
    unlockedPieceKeys = nextBoxIndexes.map(
      (nextBoxIndex) => nextBoxIndex.keyName,
    );
    let selectedKey = undefined;

    // 2. Can piece kill
    let killKey = checkIfCanKill(nextBoxIndexes, playerPieceInfo);
    if (killKey) {
      selectedKey = killKey;
    } else {
      // 3. Can piece be moved from unsafe to safe position
      let unsafePieceKey = checkForUnsafePiece(
        unlockedPieceKeys,
        nemesisPieceInfo,
        nextBoxIndexes,
        playerPieceInfo,
      );
      if (unsafePieceKey) {
        selectedKey = unsafePieceKey;
      } else {
        // 4. Can piece be moved from safe to safe position
        let moveToSafePlacePieceKey = moveToSafePlacePiece(
          unlockedPieceKeys,
          nemesisPieceInfo,
          nextBoxIndexes,
          playerPieceInfo,
        );
        if (moveToSafePlacePieceKey) {
          selectedKey = moveToSafePlacePieceKey;
        } else {
          // 5. Move highest unsafe piece to unsafe
          let unsafeToUnsafePieceKey = moveUnsafeToUnsafePieceKey(
            unlockedPieceKeys,
            nemesisPieceInfo,
            nextBoxIndexes,
            playerPieceInfo,
          );

          if (unsafeToUnsafePieceKey) {
            selectedKey = unsafeToUnsafePieceKey;
          } else {
            // 6. Move winning path piece
            // 7. Move lowest safe piece safe to unsafe
            selectedKey = nextPieceToMove(
              unlockedPieceKeys,
              nemesisPieceInfo,
              nextBoxIndexes,
              playerPieceInfo,
            );
          }
        }
      }
    }
    return moveSelectedNemesisPiece(
      nemesisPieceInfo,
      selectedKey,
      nextBoxIndexes.filter((piece) => piece.keyName == selectedKey)[0],
      playerPieceInfo,
    );
  }

  return [nemesisPieceInfo, playerPieceInfo, false, false];
}

function sortNextBoxIndices(unlockedPieceKeys, nemesisPieceInfo, diceNumber) {
  let nextBoxIndexes = [];
  unlockedPieceKeys.forEach((keyName) => {
    let nextBoxIndex = getNextNemesisBoxIndex(
      nemesisPieceInfo[keyName],
      diceNumber,
    );
    if (nextBoxIndex !== null) {
      let currentInfo = {};
      currentInfo["nextBoxIndex"] = nextBoxIndex;
      currentInfo["isOnWinningPath"] = isOnWinningPath(
        nemesisPieceInfo[keyName],
        diceNumber,
      );
      currentInfo["keyName"] = keyName;
      nextBoxIndexes.push(currentInfo);
    }
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

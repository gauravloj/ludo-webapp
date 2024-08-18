import { all_constants } from "./constants";

export function getLockedPiecesCount(playerPieceInfo) {
  return Object.values(playerPieceInfo).filter((piece) => piece.location === -1)
    .length;
}

export function isMovePossible(pieceInfo, rolledNumber) {
  if (getLockedPiecesCount(pieceInfo) == 4 && ![1, 6].includes(rolledNumber)) {
    return false;
  }

  let isPossible = false;
  for (let key in pieceInfo) {
    let piece = pieceInfo[key];
    if (piece.isOnWinningPath) {
      if (piece.boxIndex + rolledNumber <= 6) {
        isPossible = true;
        break;
      }
    } else {
      if (piece.location !== -1) {
        isPossible = true;
        break;
      } else {
        isPossible = [1, 6].includes(rolledNumber);
        if (isPossible) {
          break;
        }
      }
    }
  }

  return isPossible;
}

export const colorSymbol = Symbol("color");

export function getInitialPieceInfo(
  pieceColor,
  startBoxIndex,
  endBoxIndex,
  winningPath,
) {
  return {
    1: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
      isOnWinningPath: false,
      winningPath: winningPath,
      isCompleted: false,
    },
    2: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
      isOnWinningPath: false,
      winningPath: winningPath,
      isCompleted: false,
    },
    3: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
      isOnWinningPath: false,
      winningPath: winningPath,
      isCompleted: false,
    },
    4: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
      isOnWinningPath: false,
      winningPath: winningPath,
      isCompleted: false,
    },
    [colorSymbol]: pieceColor,
  };
}

export function canUnlock(rolledNumber) {
  if (rolledNumber === 1 || rolledNumber === 6) {
    return true;
  }
  return false;
}

export function updatePieceInfo(pieceInfo, pieceIndex, keyName, newValue) {
  let oldValue = JSON.parse(JSON.stringify(pieceInfo));
  oldValue[pieceIndex][keyName] = newValue;
  oldValue[colorSymbol] = pieceInfo[colorSymbol];
  return oldValue;
}

export function isMoveValid(pieceInfo, rolledNumber, pieceIndex) {
  return true;
}
export function getNextLocation(pieceInfo, rolledNumber) {
  if (pieceInfo.isOnWinningPath) {
    if (pieceInfo.boxIndex + rolledNumber > 6) {
      return pieceInfo.boxIndex;
    }
    return pieceInfo.boxIndex + rolledNumber;
  }

  let nextIndex = pieceInfo.boxIndex;
  if (
    nextIndex + rolledNumber - pieceInfo.startBoxIndex <=
    all_constants.PLAYER_CONSTANTS.endBoxIndex
  ) {
    nextIndex = nextIndex + rolledNumber;
  } else {
    nextIndex = nextIndex + rolledNumber - pieceInfo.endBoxIndex;
  }
  return nextIndex;
}

export function isOnWinningPath(pieceInfo, rolledNumber) {
  return (
    pieceInfo.isOnWinningPath ||
    pieceInfo.boxIndex + rolledNumber - pieceInfo.startBoxIndex >
      all_constants.PLAYER_CONSTANTS.endBoxIndex
  );
}
export function checkCollision(pieceBoxIndex, pieceInfo) {
  if (isSafeBox(pieceBoxIndex)) {
    return [false];
  }

  let pieceLocation = all_constants.REGULAR_PATH[pieceBoxIndex];
  let collidedPieces = Object.keys(pieceInfo).filter((piece) => {
    return pieceInfo[piece].location === pieceLocation;
  });

  return [collidedPieces.length === 1, collidedPieces[0]];
}

export function isSafeBox(pieceBoxIndex) {
  return [-1, 0, 8, 13, 21, 26, 34, 39, 47].includes(pieceBoxIndex);
}

export function isGameWon(pieceInfo) {
  return Object.values(pieceInfo).every((piece) => piece.isCompleted);
}

export function movePlayerPiece(
  playerPieceInfo,
  nemesisPieceInfo,
  key,
  rolledNumber,
) {
  let newNemesisPieceInfo = nemesisPieceInfo;
  let isCollison = false;
  let collisionKey;
  let hasWon = false;
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
    if (nextIndex === 6) {
      newPieceInfo = updatePieceInfo(newPieceInfo, key, "isCompleted", true);
      hasWon = isGameWon(newPieceInfo);
    }
  } else {
    let nextIndex = getNextLocation(playerPieceInfo[key], rolledNumber);
    newPieceInfo = updatePieceInfo(playerPieceInfo, key, "boxIndex", nextIndex);
    newPieceInfo = updatePieceInfo(
      newPieceInfo,
      key,
      "location",
      all_constants.REGULAR_PATH[nextIndex],
    );
    [isCollison, collisionKey] = checkCollision(nextIndex, nemesisPieceInfo);
    if (isCollison) {
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
    }
  }

  return [newPieceInfo, isCollison, newNemesisPieceInfo, hasWon];
}

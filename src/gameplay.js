import { all_constants } from "./constants";

export function getLockedPiecesCount(playerPieceInfo) {
  return Object.values(playerPieceInfo).filter((piece) => piece.location === -1)
    .length;
}
export function isMovePossible(pieceInfo, rolledNumber) {
  if (getLockedPiecesCount(pieceInfo) == 4 && ![1, 6].includes(rolledNumber)) {
    return false;
  }
  //Add other conditions
  return true;
}

export function getInitialPieceInfo(
  color,
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
    color: color,
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
export function checkCollision(piecePosition, pieceInfo) {
  let collidedPieces = Object.keys(pieceInfo).filter((piece) => {
    return pieceInfo[piece].boxIndex === piecePosition;
  });
  return [collidedPieces.length === 1, collidedPieces[0]];
}

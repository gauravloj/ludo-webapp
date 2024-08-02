import { all_constants } from "./constants";

export function getLockedPiecesCount(playerPieceInfo) {
  return Object.values(playerPieceInfo).filter((piece) => piece.location === -1)
    .length;
}
export function isMovePossible(playerPieceInfo, rolledNumber) {
  if (
    getLockedPiecesCount(playerPieceInfo) == 4 &&
    ![1, 6].includes(rolledNumber)
  ) {
    return false;
  }
  //Add other conditions
  return true;
}

export function getInitialPieceInfo(color, startBoxIndex, endBoxIndex) {
  return {
    1: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
    },
    2: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
    },
    3: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
    },
    4: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: startBoxIndex,
      endBoxIndex: endBoxIndex,
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
  let nextIndex = pieceInfo.boxIndex;
  if (
    nextIndex + rolledNumber - pieceInfo.startBoxIndex <=
    all_constants.END_BOXES_INDICES["player"]
  ) {
    nextIndex = nextIndex + rolledNumber;
  } else {
    nextIndex = all_constants.END_BOXES_INDICES["player"]; // Update Logic later
  }
  return nextIndex;
}

/**
  checkForCollision(player, players, index) {
    var count = 0;
    var pieces = [];
    for (let otherPlayer of players) {
      if (otherPlayer.color != player.color)
        for (let p of otherPlayer.pieces) {
          if (p.index == index) {
            count++;
            pieces.push(p);
          }
        }
    }
    if (count == 1) {
      //Collision
      pieces[0].index = -1;
    }
    // check if the piece will land on another piece
  }

 */

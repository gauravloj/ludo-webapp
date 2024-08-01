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

export function getInitialPieceInfo(color) {
  return {
    1: { location: -1, isSelected: false },
    2: { location: -1, isSelected: false },
    3: { location: -1, isSelected: false },
    4: { location: -1, isSelected: false },
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
export function getNextLocation(pieceInfo, rolledNumber, isPlayer) {
  let nextLocation = pieceInfo.location;
  let moverIndex = isPlayer ? "player" : "nemesis";
  console.log(all_constants.END_BOXES_INDICES);
  if (
    nextLocation + rolledNumber <=
    all_constants.END_BOXES_INDICES[moverIndex]
  ) {
    nextLocation = nextLocation + rolledNumber;
  } else {
    nextLocation = all_constants.END_BOXES_INDICES[moverIndex]; // Update Logic later
  }
  return all_constants.REGULAR_PATH[nextLocation];
}

/**
  movePiece(gameboard, player, piece, steps) {
    if (piece.position == position.homeSquare) {
      if (steps <= 6 - piece.index) piece.index += steps;
      else return "Invalid move";
    } else {
      if (piece.index == -1) return "Invalid move. Need a 6 to start";
      if (piece.index <= gameboard.endBoxes[player.color]) {
        piece.index += steps;
        this.checkForCollision(piece);
      } else {
        piece.position = position.homeSquare;
        piece.index = steps - (gameboard.endBoxes[player.color] - piece.index);
      }
    }

    // move the piece
    // check for collision
    // check for win
  }

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

  moveOut(gameboard, player, piece) {
    piece.index = gameboard.startBoxes[player.color];
  }

  checkForWin(player) {
    // check all
    if (player.pieces.all == [position.homeSquare, 6]) return player.color;
  }
 */

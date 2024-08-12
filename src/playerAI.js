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
export function isOnWinningPath(pieceInfo, rolledNumber) {
  return (
    pieceInfo.isOnWinningPath ||
    pieceInfo.boxIndex + rolledNumber - pieceInfo.startBoxIndex >
      all_constants.NEMESIS_CONSTANTS.endBoxIndex
  );
}

function getNextNemesisLocation(pieceInfo, rolledNumber) {
  if (pieceInfo.isOnWinningPath) {
    if (pieceInfo.boxIndex + rolledNumber > 6) {
      return pieceInfo.boxIndex;
    }
    return pieceInfo.boxIndex + rolledNumber;
  }

  let nextIndex = pieceInfo.boxIndex;
  if (
    nextIndex < all_constants.NEMESIS_CONSTANTS.endBoxIndex &&
    nextIndex + rolledNumber - pieceInfo.startBoxIndex >=
      all_constants.NEMESIS_CONSTANTS.endBoxIndex
  ) {
    nextIndex = nextIndex + rolledNumber - pieceInfo.endBoxIndex;
  } else {
    nextIndex = nextIndex + rolledNumber;
    nextIndex = nextIndex % all_constants.REGULAR_PATH.length;
  }
  return nextIndex;
}

export function movePiece(diceNumber, nemesisPieceInfo, playerPieceInfo) {
  // check for lockedPieces
  let lockedPieces = getLockedPiecesCount(nemesisPieceInfo);
  if ((diceNumber === 6 || diceNumber === 1) && lockedPieces > 0) {
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
  if (lockedPieces < 4) {
    let pieceKeys = Object.keys(nemesisPieceInfo).filter(
      (piece) => nemesisPieceInfo[piece].location !== -1,
    );
    let nextLocations = {};
    pieceKeys.forEach((keyName) => {
      nextLocations[keyName] = getNextNemesisLocation(
        nemesisPieceInfo[keyName],
        diceNumber,
      );
    });
    if (pieceKeys.length >= 1) {
      let newInfo = updatePieceInfo(
        nemesisPieceInfo,
        pieceKeys[0],
        "location",
        all_constants.REGULAR_PATH[nextLocations[pieceKeys[0]]],
      );
      newInfo = updatePieceInfo(
        newInfo,
        pieceKeys[0],
        "boxIndex",
        nextLocations[pieceKeys[0]],
      );
      console.log("Nemesis unlocked piece", pieceKeys[0]);
      return newInfo;
    }
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

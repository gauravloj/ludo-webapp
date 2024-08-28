import {
  getLockedPiecesCount,
  isMovePossible,
  getInitialPieceInfo,
  canUnlock,
} from "../gameplay";
const colorSymbol = Symbol("color");

function getTestInitialPieceInfo() {
  let piece = {
    1: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 0,
      endBoxIndex: 50,
      isOnWinningPath: false,
      winningPath: [-666, 77, 74, 71, 68, 65, -666],
      isCompleted: false,
    },
    2: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 0,
      endBoxIndex: 50,
      isOnWinningPath: false,
      winningPath: [-666, 77, 74, 71, 68, 65, -666],
      isCompleted: false,
    },
    3: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 0,
      endBoxIndex: 50,
      isOnWinningPath: false,
      winningPath: [-666, 77, 74, 71, 68, 65, -666],
      isCompleted: false,
    },
    4: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 0,
      endBoxIndex: 50,
      isOnWinningPath: false,
      winningPath: [-666, 77, 74, 71, 68, 65, -666],
      isCompleted: false,
    },
  };
  piece[colorSymbol] = "bg-purple-600";
  return piece;
}

function getTestNemesisInitialPieceInfo() {
  let piece = {
    1: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 26,
      endBoxIndex: 24,
      isOnWinningPath: false,
      winningPath: [-666, 5, 8, 11, 14, 17, -666],
      isCompleted: false,
    },
    2: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 26,
      endBoxIndex: 24,
      isOnWinningPath: false,
      winningPath: [-666, 5, 8, 11, 14, 17, -666],
      isCompleted: false,
    },
    3: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 26,
      endBoxIndex: 24,
      isOnWinningPath: false,
      winningPath: [-666, 5, 8, 11, 14, 17, -666],
      isCompleted: false,
    },
    4: {
      location: -1,
      boxIndex: -1,
      isSelected: false,
      startBoxIndex: 26,
      endBoxIndex: 24,
      isOnWinningPath: false,
      winningPath: [-666, 5, 8, 11, 14, 17, -666],
      isCompleted: false,
    },
  };
  piece[colorSymbol] = "bg-cyan-400";
  return piece;
}

test.skip("Test getLockedPiecesCount all", () => {
  let playerPieceInfo = getTestInitialPieceInfo();
  expect(getLockedPiecesCount(playerPieceInfo)).toBe(4);
});

test.skip("Test isMovePossible locked true", () => {
  let playerPieceInfo = getTestInitialPieceInfo();
  expect(isMovePossible(playerPieceInfo, 6)).toBe(true);
});
test.skip("Test isMovePossible locked false", () => {
  let playerPieceInfo = getTestInitialPieceInfo();
  expect(isMovePossible(playerPieceInfo, 3)).toBe(false);
});
test.skip("Test isMovePossible unlocked true", () => {
  let playerPieceInfo = getTestInitialPieceInfo();
  playerPieceInfo[1].location = 76;
  playerPieceInfo[1].boxIndex = 0;
  expect(isMovePossible(playerPieceInfo, 2)).toBe(true);
});
test("Test isMovePossible unlocked false", () => {
  let playerPieceInfo = getTestInitialPieceInfo();
  playerPieceInfo[1].location = 68;
  playerPieceInfo[1].boxIndex = 4;
  playerPieceInfo[1].isOnWinningPath = true;
  expect(isMovePossible(playerPieceInfo, 5)).toBe(false);
});
test("Test getTestInitialPieceInfo player", () => {
  let playerPieceInfo = getTestInitialPieceInfo();
  expect(
    getInitialPieceInfo(
      "bg-purple-600",
      0,
      50,
      [-666, 77, 74, 71, 68, 65, -666],
    ),
  ).toMatchObject(playerPieceInfo);
});
test("Test getTestInitialPieceInfo nemesis", () => {
  let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
  expect(
    getInitialPieceInfo("bg-cyan-400", 26, 24, [-666, 5, 8, 11, 14, 17, -666]),
  ).toMatchObject(nemesisPieceInfo);
});
test("Test canUnlock true", () => {
  expect(canUnlock(1)).toBe(true);
  expect(canUnlock(6)).toBe(true);
});
test("Test canUnlock false", () => {
  expect(canUnlock(2)).toBe(false);
  expect(canUnlock(4)).toBe(false);
});

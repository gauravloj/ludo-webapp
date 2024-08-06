import { getLockedPiecesCount } from "../src/gameplay";

function getTestInitialPieceInfo() {
  return {
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
    color: "bg-purple-600",
  };
}

test("Test getLockedPiecesCount all", () => {
  let playerPieceInfo = getTestInitialPieceInfo();
  expect(getLockedPiecesCount(playerPieceInfo)).toBe(4);
});

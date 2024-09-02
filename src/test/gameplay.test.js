import {
  getLockedPiecesCount,
  isMovePossible,
  getInitialPieceInfo,
  canUnlock,
  updatePieceInfo,
  colorSymbol,
  getNextLocation,
  isOnWinningPath,
  checkCollision,
  isSafeBox,
  isGameWon,
  movePlayerPiece,
} from "../gameplay";

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
    [colorSymbol]: "bg-purple-600",
  };

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

describe("getLockedPiecesCount", () => {
  it("Test getLockedPiecesCount all", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    expect(getLockedPiecesCount(playerPieceInfo)).toBe(4);
  });
  it("Test getLockedPiecesCount none", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;
    playerPieceInfo[2].boxIndex = 0;
    playerPieceInfo[2].location = 76;
    playerPieceInfo[3].boxIndex = 0;
    playerPieceInfo[3].location = 76;
    playerPieceInfo[4].boxIndex = 0;
    playerPieceInfo[4].location = 76;
    expect(getLockedPiecesCount(playerPieceInfo)).toBe(0);
  });
  it("Test getLockedPiecesCount one", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;
    playerPieceInfo[2].boxIndex = 0;
    playerPieceInfo[2].location = 76;
    playerPieceInfo[3].boxIndex = 0;
    playerPieceInfo[3].location = 76;
    expect(getLockedPiecesCount(playerPieceInfo)).toBe(1);
  });
});
describe("isMovePossible", () => {
  it("Test isMovePossible locked true", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    expect(isMovePossible(playerPieceInfo, 6)).toBe(true);
  });
  it("Test isMovePossible locked false", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    expect(isMovePossible(playerPieceInfo, 3)).toBe(false);
  });
  it("Test isMovePossible unlocked true", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].location = 76;
    playerPieceInfo[1].boxIndex = 0;
    expect(isMovePossible(playerPieceInfo, 2)).toBe(true);
  });
  it("Test isMovePossible unlocked false", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].location = 68;
    playerPieceInfo[1].boxIndex = 4;
    playerPieceInfo[1].isOnWinningPath = true;
    expect(isMovePossible(playerPieceInfo, 5)).toBe(false);
  });
});
describe("getInitialPieceInfo", () => {
  it("Test getTestInitialPieceInfo player", () => {
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
  it("Test getTestInitialPieceInfo nemesis", () => {
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
    expect(
      getInitialPieceInfo(
        "bg-cyan-400",
        26,
        24,
        [-666, 5, 8, 11, 14, 17, -666],
      ),
    ).toMatchObject(nemesisPieceInfo);
  });
});
describe("canUnlock", () => {
  it("Test canUnlock true", () => {
    expect(canUnlock(1)).toBe(true);
    expect(canUnlock(6)).toBe(true);
  });
  it("Test canUnlock false", () => {
    expect(canUnlock(2)).toBe(false);
    expect(canUnlock(4)).toBe(false);
  });
});
describe("updatePieceInfo", () => {
  it("Test updatePieceInfo success", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    let newPlayerPieceInfo = getTestInitialPieceInfo();
    newPlayerPieceInfo[1].boxIndex = 20;
    expect(updatePieceInfo(playerPieceInfo, 1, "boxIndex", 20)).toMatchObject(
      newPlayerPieceInfo,
    );
  });
});
describe("getNextLocation", () => {
  it("Test getNextLocation start", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;
    expect(getNextLocation(playerPieceInfo[1], 2)).toBe(2);
  });
  it("Test getNextLocation on winning path possible", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].isOnWinningPath = true;
    playerPieceInfo[1].boxIndex = 1;
    playerPieceInfo[1].location = 77;
    expect(getNextLocation(playerPieceInfo[1], 2)).toBe(3);
  });
  it("Test getNextLocation on winning path not possible", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].isOnWinningPath = true;
    playerPieceInfo[1].boxIndex = 4;
    playerPieceInfo[1].location = 68;
    expect(getNextLocation(playerPieceInfo[1], 5)).toBe(4);
  });
  it("Test getNextLocation move to winning path", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 50;
    playerPieceInfo[1].location = 80;
    expect(getNextLocation(playerPieceInfo[1], 2)).toBe(2);
  });
});
describe("isOnWinningPath", () => {
  it("Test already on isOnWinningPath", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].isOnWinningPath = true;
    playerPieceInfo[1].boxIndex = 4;
    playerPieceInfo[1].location = 68;
    expect(isOnWinningPath(playerPieceInfo[1], 1)).toBe(true);
  });
  it("Test moving to isOnWinningPath", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 50;
    playerPieceInfo[1].location = 80;
    expect(isOnWinningPath(playerPieceInfo[1], 4)).toBe(true);
  });
  it("Test not on isOnWinningPath", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;
    expect(isOnWinningPath(playerPieceInfo[1], 4)).toBe(false);
  });
});
describe("checkCollision", () => {
  it("Test checkCollision on safe box", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();

    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;
    nemesisPieceInfo[1].boxIndex = 0;
    nemesisPieceInfo[1].location = 76;

    expect(
      checkCollision(playerPieceInfo[1].boxIndex, nemesisPieceInfo),
    ).toEqual([false]);
  });
  it("Test checkCollision on one piece", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();

    playerPieceInfo[1].boxIndex = 1;
    playerPieceInfo[1].location = 73;
    nemesisPieceInfo[1].boxIndex = 1;
    nemesisPieceInfo[1].location = 73;

    expect(
      checkCollision(playerPieceInfo[1].boxIndex, nemesisPieceInfo),
    ).toEqual([true, "1"]);
  });
  it("Test checkCollision on multiple pieces", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();

    playerPieceInfo[1].boxIndex = 1;
    playerPieceInfo[1].location = 73;
    nemesisPieceInfo[1].boxIndex = 1;
    nemesisPieceInfo[1].location = 73;
    nemesisPieceInfo[2].boxIndex = 1;
    nemesisPieceInfo[2].location = 73;

    expect(
      checkCollision(playerPieceInfo[1].boxIndex, nemesisPieceInfo),
    ).toEqual([false, "1"]);
  });
});
describe("isSafeBox", () => {
  it("Test isSafeBox true", () => {
    let playerPieceInfo = getTestInitialPieceInfo();

    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;

    expect(isSafeBox(playerPieceInfo[1].boxIndex)).toEqual(true);
  });
  it("Test isSafeBox false", () => {
    let playerPieceInfo = getTestInitialPieceInfo();

    playerPieceInfo[1].boxIndex = 1;
    playerPieceInfo[1].location = 73;
    expect(isSafeBox(playerPieceInfo[1].boxIndex)).toEqual(false);
  });
});
describe("isGameWon", () => {
  it("Test isGameWon true", () => {
    let playerPieceInfo = getTestInitialPieceInfo();

    playerPieceInfo[1].isCompleted = true;
    playerPieceInfo[2].isCompleted = true;
    playerPieceInfo[3].isCompleted = true;
    playerPieceInfo[4].isCompleted = true;

    expect(isGameWon(playerPieceInfo)).toEqual(true);
  });
  it("Test isGameWon false", () => {
    let playerPieceInfo = getTestInitialPieceInfo();

    playerPieceInfo[1].boxIndex = 1;
    playerPieceInfo[1].location = 73;
    playerPieceInfo[2].isCompleted = true;
    playerPieceInfo[3].isCompleted = true;
    playerPieceInfo[4].isCompleted = true;
    expect(isGameWon(playerPieceInfo)).toEqual(false);
  });
  it("Test isGameWon false", () => {
    let playerPieceInfo = getTestInitialPieceInfo();

    playerPieceInfo[1].boxIndex = 1;
    playerPieceInfo[1].location = 77;
    playerPieceInfo[1].isOnWinningPath = true;
    playerPieceInfo[2].isCompleted = true;
    playerPieceInfo[3].isCompleted = true;
    playerPieceInfo[4].isCompleted = true;
    expect(isGameWon(playerPieceInfo)).toEqual(false);
  });
});
describe("movePlayerPiece", () => {
  it("Test movePlayerPiece simple", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;
    let newPlayerPieceInfo = getTestInitialPieceInfo();
    newPlayerPieceInfo[1].boxIndex = 3;
    newPlayerPieceInfo[1].location = 67;
    expect(movePlayerPiece(playerPieceInfo, nemesisPieceInfo, 1, 3)).toEqual([
      newPlayerPieceInfo,
      false,
      nemesisPieceInfo,
      false,
    ]);
  });
  it("Test movePlayerPiece to winning path", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 50;
    playerPieceInfo[1].location = 80;
    let newPlayerPieceInfo = getTestInitialPieceInfo();
    newPlayerPieceInfo[1].boxIndex = 3;
    newPlayerPieceInfo[1].location = 71;
    newPlayerPieceInfo[1].isOnWinningPath = true;
    expect(movePlayerPiece(playerPieceInfo, nemesisPieceInfo, 1, 3)).toEqual([
      newPlayerPieceInfo,
      false,
      nemesisPieceInfo,
      false,
    ]);
  });
  it("Test movePlayerPiece on winning path", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 1;
    playerPieceInfo[1].location = 77;
    playerPieceInfo[1].isOnWinningPath = true;
    let newPlayerPieceInfo = getTestInitialPieceInfo();
    newPlayerPieceInfo[1].boxIndex = 4;
    newPlayerPieceInfo[1].location = 68;
    newPlayerPieceInfo[1].isOnWinningPath = true;
    expect(movePlayerPiece(playerPieceInfo, nemesisPieceInfo, 1, 3)).toEqual([
      newPlayerPieceInfo,
      false,
      nemesisPieceInfo,
      false,
    ]);
  });
  it("Test movePlayerPiece safe box collision", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 7;
    playerPieceInfo[1].location = 46;
    playerPieceInfo[1].isOnWinningPath = false;
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
    nemesisPieceInfo[1].boxIndex = 8;
    nemesisPieceInfo[1].location = 45;
    let newPlayerPieceInfo = getTestInitialPieceInfo();
    newPlayerPieceInfo[1].boxIndex = 8;
    newPlayerPieceInfo[1].location = 45;
    newPlayerPieceInfo[1].isOnWinningPath = false;
    expect(movePlayerPiece(playerPieceInfo, nemesisPieceInfo, 1, 1)).toEqual([
      newPlayerPieceInfo,
      false,
      nemesisPieceInfo,
      false,
    ]);
  });
  it("Test movePlayerPiece collision", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 0;
    playerPieceInfo[1].location = 76;
    playerPieceInfo[1].isOnWinningPath = false;
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
    nemesisPieceInfo[1].boxIndex = 2;
    nemesisPieceInfo[1].location = 70;
    let newNemesisPieceInfo = getTestNemesisInitialPieceInfo();
    newNemesisPieceInfo[1].boxIndex = -1;
    newNemesisPieceInfo[1].location = -1;
    let newPlayerPieceInfo = getTestInitialPieceInfo();
    newPlayerPieceInfo[1].boxIndex = 2;
    newPlayerPieceInfo[1].location = 70;
    newPlayerPieceInfo[1].isOnWinningPath = false;
    expect(movePlayerPiece(playerPieceInfo, nemesisPieceInfo, 1, 2)).toEqual([
      newPlayerPieceInfo,
      true,
      newNemesisPieceInfo,
      false,
    ]);
  });
  it("Test movePlayerPiece hasWon", () => {
    let playerPieceInfo = getTestInitialPieceInfo();
    playerPieceInfo[1].boxIndex = 4;
    playerPieceInfo[1].location = 68;
    playerPieceInfo[1].isOnWinningPath = true;
    playerPieceInfo[2].isCompleted = true;
    playerPieceInfo[3].isCompleted = true;
    playerPieceInfo[4].isCompleted = true;
    let nemesisPieceInfo = getTestNemesisInitialPieceInfo();
    nemesisPieceInfo[1].boxIndex = 2;
    nemesisPieceInfo[1].location = 70;
    let newPlayerPieceInfo = getTestInitialPieceInfo();
    newPlayerPieceInfo[1].boxIndex = 6;
    newPlayerPieceInfo[1].location = -666;
    newPlayerPieceInfo[2].isCompleted = true;
    newPlayerPieceInfo[3].isCompleted = true;
    newPlayerPieceInfo[4].isCompleted = true;
    newPlayerPieceInfo[1].isCompleted = true;
    newPlayerPieceInfo[1].isOnWinningPath = true;
    expect(movePlayerPiece(playerPieceInfo, nemesisPieceInfo, 1, 2)).toEqual([
      newPlayerPieceInfo,
      false,
      nemesisPieceInfo,
      true,
    ]);
  });
});

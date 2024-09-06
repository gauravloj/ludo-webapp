import { colorSymbol } from "../gameplay";
import { movePiece } from "../nemesisAI";

function getTestInitialPieceInfo() {
  let piece = {
    1: {
      location: 76,
      boxIndex: 0,
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

//Test case 1 : Simple move
let playerPieceInfo1 = getTestInitialPieceInfo();
let nemesisPieceInfo1 = getTestNemesisInitialPieceInfo();
nemesisPieceInfo1[1].boxIndex = 26;
nemesisPieceInfo1[1].location = 6;
let newNemesisPieceInfo1 = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo1[1].boxIndex = 29;
newNemesisPieceInfo1[1].location = 15;
let newPlayerPieceInfo1 = getTestInitialPieceInfo();
let expectedCollision1 = false;
let expectedWon1 = false;

//Test case 2 : Can piece be unlocked?
let playerPieceInfo2 = getTestInitialPieceInfo();
let nemesisPieceInfo2 = getTestNemesisInitialPieceInfo();
let newNemesisPieceInfo2 = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo2[1].boxIndex = 26;
newNemesisPieceInfo2[1].location = 6;
let newPlayerPieceInfo2 = getTestInitialPieceInfo();
let expectedCollision2 = false;
let expectedWon2 = false;

//Test case 3 : Can piece kill
let playerPieceInfo3 = getTestInitialPieceInfo();
playerPieceInfo3[1].boxIndex = 29;
playerPieceInfo3[1].location = 15;
playerPieceInfo3[2].boxIndex = 44;
playerPieceInfo3[2].location = 66;
let nemesisPieceInfo3 = getTestNemesisInitialPieceInfo();
nemesisPieceInfo3[1].boxIndex = 26;
nemesisPieceInfo3[1].location = 6;
nemesisPieceInfo3[2].boxIndex = 1;
nemesisPieceInfo3[2].location = 73;
let newNemesisPieceInfo3 = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo3[1].boxIndex = 29;
newNemesisPieceInfo3[1].location = 15;
newNemesisPieceInfo3[2].boxIndex = 1;
newNemesisPieceInfo3[2].location = 73;
let newPlayerPieceInfo3 = getTestInitialPieceInfo();
newPlayerPieceInfo3[1].boxIndex = -1;
newPlayerPieceInfo3[1].location = -1;
newPlayerPieceInfo3[2].boxIndex = 44;
newPlayerPieceInfo3[2].location = 66;
let expectedCollision3 = true;
let expectedWon3 = false;

//Test case 4a : Can piece be moved from unsafe to safe position - safe box
let playerPieceInfo4a = getTestInitialPieceInfo();
playerPieceInfo4a[1].boxIndex = 30;
playerPieceInfo4a[1].location = 18;
playerPieceInfo4a[2].boxIndex = 44;
playerPieceInfo4a[2].location = 66;
let nemesisPieceInfo4a = getTestNemesisInitialPieceInfo();
nemesisPieceInfo4a[1].boxIndex = 31;
nemesisPieceInfo4a[1].location = 25;
nemesisPieceInfo4a[2].boxIndex = 1;
nemesisPieceInfo4a[2].location = 73;
let newNemesisPieceInfo4a = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo4a[1].boxIndex = 34;
newNemesisPieceInfo4a[1].location = 28;
newNemesisPieceInfo4a[2].boxIndex = 1;
newNemesisPieceInfo4a[2].location = 73;
let newPlayerPieceInfo4a = getTestInitialPieceInfo();
newPlayerPieceInfo4a[1].boxIndex = 30;
newPlayerPieceInfo4a[1].location = 18;
newPlayerPieceInfo4a[2].boxIndex = 44;
newPlayerPieceInfo4a[2].location = 66;
let expectedCollision4a = false;
let expectedWon4a = false;

//Test case 4b : Can piece be moved from unsafe to safe position - safe by piece
let playerPieceInfo4b = getTestInitialPieceInfo();
playerPieceInfo4b[1].boxIndex = 30;
playerPieceInfo4b[1].location = 18;
playerPieceInfo4b[2].boxIndex = 44;
playerPieceInfo4b[2].location = 66;
let nemesisPieceInfo4b = getTestNemesisInitialPieceInfo();
nemesisPieceInfo4b[1].boxIndex = 31;
nemesisPieceInfo4b[1].location = 25;
nemesisPieceInfo4b[2].boxIndex = 32;
nemesisPieceInfo4b[2].location = 26;
nemesisPieceInfo4b[3].boxIndex = 1;
nemesisPieceInfo4b[3].location = 73;
nemesisPieceInfo4b[4].boxIndex = 1;
nemesisPieceInfo4b[4].location = 73;
let newNemesisPieceInfo4b = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo4b[1].boxIndex = 32;
newNemesisPieceInfo4b[1].location = 26;
newNemesisPieceInfo4b[2].boxIndex = 32;
newNemesisPieceInfo4b[2].location = 26;
newNemesisPieceInfo4b[3].boxIndex = 1;
newNemesisPieceInfo4b[3].location = 73;
newNemesisPieceInfo4b[4].boxIndex = 1;
newNemesisPieceInfo4b[4].location = 73;
let newPlayerPieceInfo4b = getTestInitialPieceInfo();
newPlayerPieceInfo4b[1].boxIndex = 30;
newPlayerPieceInfo4b[1].location = 18;
newPlayerPieceInfo4b[2].boxIndex = 44;
newPlayerPieceInfo4b[2].location = 66;
let expectedCollision4b = false;
let expectedWon4b = false;

//Test case 5a : Can piece be moved from safe to safe position - safe box
let playerPieceInfo5a = getTestInitialPieceInfo();
playerPieceInfo5a[1].boxIndex = 32;
playerPieceInfo5a[1].location = 26;
playerPieceInfo5a[2].boxIndex = 44;
playerPieceInfo5a[2].location = 66;
let nemesisPieceInfo5a = getTestNemesisInitialPieceInfo();
nemesisPieceInfo5a[1].boxIndex = 34;
nemesisPieceInfo5a[1].location = 28;
nemesisPieceInfo5a[2].boxIndex = 33;
nemesisPieceInfo5a[2].location = 27;
let newNemesisPieceInfo5a = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo5a[1].boxIndex = 39;
newNemesisPieceInfo5a[1].location = 53;
newNemesisPieceInfo5a[2].boxIndex = 33;
newNemesisPieceInfo5a[2].location = 27;
let newPlayerPieceInfo5a = getTestInitialPieceInfo();
newPlayerPieceInfo5a[1].boxIndex = 32;
newPlayerPieceInfo5a[1].location = 26;
newPlayerPieceInfo5a[2].boxIndex = 44;
newPlayerPieceInfo5a[2].location = 66;
let expectedCollision5a = false;
let expectedWon5a = false;

//Test case 5b : Can piece be moved from safe to safe position - furthest piece
let playerPieceInfo5b = getTestInitialPieceInfo();
playerPieceInfo5b[1].boxIndex = 32;
playerPieceInfo5b[1].location = 26;
playerPieceInfo5b[2].boxIndex = 44;
playerPieceInfo5b[2].location = 66;
let nemesisPieceInfo5b = getTestNemesisInitialPieceInfo();
nemesisPieceInfo5b[1].boxIndex = 34;
nemesisPieceInfo5b[1].location = 28;
nemesisPieceInfo5b[2].boxIndex = 38;
nemesisPieceInfo5b[2].location = 54;
let newNemesisPieceInfo5b = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo5b[1].boxIndex = 34;
newNemesisPieceInfo5b[1].location = 28;
newNemesisPieceInfo5b[2].boxIndex = 42;
newNemesisPieceInfo5b[2].location = 50;
let newPlayerPieceInfo5b = getTestInitialPieceInfo();
newPlayerPieceInfo5b[1].boxIndex = 32;
newPlayerPieceInfo5b[1].location = 26;
newPlayerPieceInfo5b[2].boxIndex = 44;
newPlayerPieceInfo5b[2].location = 66;
let expectedCollision5b = false;
let expectedWon5b = false;

//Test case 5c : Can piece be moved from safe to safe position - piece on piece
let playerPieceInfo5c = getTestInitialPieceInfo();
playerPieceInfo5c[1].boxIndex = 32;
playerPieceInfo5c[1].location = 26;
playerPieceInfo5c[2].boxIndex = 44;
playerPieceInfo5c[2].location = 66;
let nemesisPieceInfo5c = getTestNemesisInitialPieceInfo();
nemesisPieceInfo5c[1].boxIndex = 31;
nemesisPieceInfo5c[1].location = 25;
nemesisPieceInfo5c[2].boxIndex = 33;
nemesisPieceInfo5c[2].location = 27;
let newNemesisPieceInfo5c = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo5c[1].boxIndex = 33;
newNemesisPieceInfo5c[1].location = 27;
newNemesisPieceInfo5c[2].boxIndex = 33;
newNemesisPieceInfo5c[2].location = 27;
let newPlayerPieceInfo5c = getTestInitialPieceInfo();
newPlayerPieceInfo5c[1].boxIndex = 32;
newPlayerPieceInfo5c[1].location = 26;
newPlayerPieceInfo5c[2].boxIndex = 44;
newPlayerPieceInfo5c[2].location = 66;
let expectedCollision5c = false;
let expectedWon5c = false;

//Test case 6 : Move highest unsafe piece to unsafe
let playerPieceInfo6 = getTestInitialPieceInfo();
playerPieceInfo6[1].boxIndex = 32;
playerPieceInfo6[1].location = 26;
playerPieceInfo6[2].boxIndex = 44;
playerPieceInfo6[2].location = 66;
let nemesisPieceInfo6 = getTestNemesisInitialPieceInfo();
nemesisPieceInfo6[1].boxIndex = 45;
nemesisPieceInfo6[1].location = 69;
nemesisPieceInfo6[2].boxIndex = 33;
nemesisPieceInfo6[2].location = 27;
let newNemesisPieceInfo6 = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo6[1].boxIndex = 48;
newNemesisPieceInfo6[1].location = 78;
newNemesisPieceInfo6[2].boxIndex = 33;
newNemesisPieceInfo6[2].location = 27;
let newPlayerPieceInfo6 = getTestInitialPieceInfo();
newPlayerPieceInfo6[1].boxIndex = 32;
newPlayerPieceInfo6[1].location = 26;
newPlayerPieceInfo6[2].boxIndex = 44;
newPlayerPieceInfo6[2].location = 66;
let expectedCollision6 = false;
let expectedWon6 = false;

//Test case 7 : Move winning path piece - not won
let playerPieceInfo7 = getTestInitialPieceInfo();
playerPieceInfo7[1].boxIndex = 32;
playerPieceInfo7[1].location = 26;
playerPieceInfo7[2].boxIndex = 44;
playerPieceInfo7[2].location = 66;
let nemesisPieceInfo7 = getTestNemesisInitialPieceInfo();
nemesisPieceInfo7[1].boxIndex = 1;
nemesisPieceInfo7[1].location = 5;
nemesisPieceInfo7[1].isOnWinningPath = true;
let newNemesisPieceInfo7 = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo7[1].boxIndex = 3;
newNemesisPieceInfo7[1].location = 11;
newNemesisPieceInfo7[1].isOnWinningPath = true;
let newPlayerPieceInfo7 = getTestInitialPieceInfo();
newPlayerPieceInfo7[1].boxIndex = 32;
newPlayerPieceInfo7[1].location = 26;
newPlayerPieceInfo7[2].boxIndex = 44;
newPlayerPieceInfo7[2].location = 66;
let expectedCollision7 = false;
let expectedWon7 = false;

//Test case 8 : Move winning path piece - won
let playerPieceInfo8 = getTestInitialPieceInfo();
playerPieceInfo8[1].boxIndex = 32;
playerPieceInfo8[1].location = 26;
playerPieceInfo8[2].boxIndex = 44;
playerPieceInfo8[2].location = 66;
let nemesisPieceInfo8 = getTestNemesisInitialPieceInfo();
nemesisPieceInfo8[1].boxIndex = 1;
nemesisPieceInfo8[1].location = 5;
nemesisPieceInfo8[1].isOnWinningPath = true;
nemesisPieceInfo8[2].boxIndex = 6;
nemesisPieceInfo8[2].location = -666;
nemesisPieceInfo8[2].isOnWinningPath = true;
nemesisPieceInfo8[2].isCompleted = true;
nemesisPieceInfo8[3].boxIndex = 6;
nemesisPieceInfo8[3].location = -666;
nemesisPieceInfo8[3].isOnWinningPath = true;
nemesisPieceInfo8[3].isCompleted = true;
nemesisPieceInfo8[4].boxIndex = 6;
nemesisPieceInfo8[4].location = -666;
nemesisPieceInfo8[4].isOnWinningPath = true;
nemesisPieceInfo8[4].isCompleted = true;
let newNemesisPieceInfo8 = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo8[1].boxIndex = 6;
newNemesisPieceInfo8[1].location = -666;
newNemesisPieceInfo8[1].isOnWinningPath = true;
newNemesisPieceInfo8[1].isCompleted = true;
newNemesisPieceInfo8[2].boxIndex = 6;
newNemesisPieceInfo8[2].location = -666;
newNemesisPieceInfo8[2].isOnWinningPath = true;
newNemesisPieceInfo8[2].isCompleted = true;
newNemesisPieceInfo8[3].boxIndex = 6;
newNemesisPieceInfo8[3].location = -666;
newNemesisPieceInfo8[3].isOnWinningPath = true;
newNemesisPieceInfo8[3].isCompleted = true;
newNemesisPieceInfo8[4].boxIndex = 6;
newNemesisPieceInfo8[4].location = -666;
newNemesisPieceInfo8[4].isOnWinningPath = true;
newNemesisPieceInfo8[4].isCompleted = true;

let newPlayerPieceInfo8 = getTestInitialPieceInfo();
newPlayerPieceInfo8[1].boxIndex = 32;
newPlayerPieceInfo8[1].location = 26;
newPlayerPieceInfo8[2].boxIndex = 44;
newPlayerPieceInfo8[2].location = 66;
let expectedCollision8 = false;
let expectedWon8 = true;

//Test case 9 : Move lowest safe piece safe to unsafe
let playerPieceInfo9 = getTestInitialPieceInfo();
playerPieceInfo9[1].boxIndex = 32;
playerPieceInfo9[1].location = 26;
playerPieceInfo9[2].boxIndex = 44;
playerPieceInfo9[2].location = 66;
let nemesisPieceInfo9 = getTestNemesisInitialPieceInfo();
nemesisPieceInfo9[1].boxIndex = 33;
nemesisPieceInfo9[1].location = 27;
nemesisPieceInfo9[2].boxIndex = 45;
nemesisPieceInfo9[2].location = 69;
let newNemesisPieceInfo9 = getTestNemesisInitialPieceInfo();
newNemesisPieceInfo9[1].boxIndex = 33;
newNemesisPieceInfo9[1].location = 27;
newNemesisPieceInfo9[2].boxIndex = 48;
newNemesisPieceInfo9[2].location = 78;
let newPlayerPieceInfo9 = getTestInitialPieceInfo();
newPlayerPieceInfo9[1].boxIndex = 32;
newPlayerPieceInfo9[1].location = 26;
newPlayerPieceInfo9[2].boxIndex = 44;
newPlayerPieceInfo9[2].location = 66;
let expectedCollision9 = false;
let expectedWon9 = false;

describe("movePiece tests", () => {
  it.each([
    [
      playerPieceInfo1,
      nemesisPieceInfo1,
      3,
      newNemesisPieceInfo1,
      newPlayerPieceInfo1,
      expectedCollision1,
      expectedWon1,
    ],
    [
      playerPieceInfo2,
      nemesisPieceInfo2,
      6,
      newNemesisPieceInfo2,
      newPlayerPieceInfo2,
      expectedCollision2,
      expectedWon2,
    ],
    [
      playerPieceInfo3,
      nemesisPieceInfo3,
      3,
      newNemesisPieceInfo3,
      newPlayerPieceInfo3,
      expectedCollision3,
      expectedWon3,
    ],
    [
      playerPieceInfo4a,
      nemesisPieceInfo4a,
      3,
      newNemesisPieceInfo4a,
      newPlayerPieceInfo4a,
      expectedCollision4a,
      expectedWon4a,
    ],
    [
      playerPieceInfo4b,
      nemesisPieceInfo4b,
      1,
      newNemesisPieceInfo4b,
      newPlayerPieceInfo4b,
      expectedCollision4b,
      expectedWon4b,
    ],
    [
      playerPieceInfo5a,
      nemesisPieceInfo5a,
      5,
      newNemesisPieceInfo5a,
      newPlayerPieceInfo5a,
      expectedCollision5a,
      expectedWon5a,
    ],
    [
      playerPieceInfo5b,
      nemesisPieceInfo5b,
      4,
      newNemesisPieceInfo5b,
      newPlayerPieceInfo5b,
      expectedCollision5b,
      expectedWon5b,
    ],
    [
      playerPieceInfo5c,
      nemesisPieceInfo5c,
      2,
      newNemesisPieceInfo5c,
      newPlayerPieceInfo5c,
      expectedCollision5c,
      expectedWon5c,
    ],
    [
      playerPieceInfo6,
      nemesisPieceInfo6,
      3,
      newNemesisPieceInfo6,
      newPlayerPieceInfo6,
      expectedCollision6,
      expectedWon6,
    ],
    [
      playerPieceInfo7,
      nemesisPieceInfo7,
      2,
      newNemesisPieceInfo7,
      newPlayerPieceInfo7,
      expectedCollision7,
      expectedWon7,
    ],
    [
      playerPieceInfo8,
      nemesisPieceInfo8,
      5,
      newNemesisPieceInfo8,
      newPlayerPieceInfo8,
      expectedCollision8,
      expectedWon8,
    ],
    [
      playerPieceInfo9,
      nemesisPieceInfo9,
      3,
      newNemesisPieceInfo9,
      newPlayerPieceInfo9,
      expectedCollision9,
      expectedWon9,
    ],
  ])(
    "Test movePiece",
    (
      playerPieceInfo,
      nemesisPieceInfo,
      dice,
      newNemesisPieceInfo,
      newPlayerPieceInfo,
      expectedCollision,
      expectedWon,
    ) => {
      let [
        returnedNemesisPieceInfo,
        returnedPlayerPieceInfo,
        isCollided,
        hasWon,
      ] = movePiece(dice, nemesisPieceInfo, playerPieceInfo);
      expect(returnedNemesisPieceInfo).toMatchObject(newNemesisPieceInfo);
      expect(returnedPlayerPieceInfo).toMatchObject(newPlayerPieceInfo);
      expect(isCollided).toBe(expectedCollision);
      expect(hasWon).toBe(expectedWon);
    },
  );
});

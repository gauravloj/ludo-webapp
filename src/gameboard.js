/*
4 players
4 colors
4 pieces per player
4 home squares
4 start squares
1 end circly


*/
// write a gameboard class to implement the ludo rules
var colorMap = {
  color1: "red",
  color2: "blue",
  color3: "green",
  color4: "yellow",
};
var position = { board: "board", homeSquare: "homesquare" };

class GameBoard {
  constructor() {
    this.board = new Array(52).fill(null);
    this.safeBoxes = [0, 8, 13, 21, 26, 34, 39, 47];
    this.startBoxes = {
      [colorMap.color1]: 0,
      [colorMap.color2]: 13,
      [colorMap.color3]: 26,
      [colorMap.color4]: 39,
    };
    this.endBoxes = {
      [colorMap.color1]: 51,
      [colorMap.color2]: 11,
      [colorMap.color3]: 24,
      [colorMap.color4]: 37,
    };
    this.homeSquares = {
      [colorMap.color1]: new Array(6).fill(null),
      [colorMap.color2]: new Array(6).fill(null),
      [colorMap.color3]: new Array(6).fill(null),
      [colorMap.color4]: new Array(6).fill(null),
    };
  }

  movePiece(player, piece, steps) {
    // move the piece
    // check for collision
    // check for win
  }

  checkForCollision(player, piece, steps) {
    // check if the piece will land on another piece
  }

  checkForWin(player) {
    // check if all pieces are in the end circle
  }
}

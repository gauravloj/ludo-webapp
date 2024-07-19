/*
4 players
4 colors
4 pieces per player
4 home squares
4 start squares
1 end circly


*/
// write a gameboard class to implement the ludo rules

class GameBoard {
  constructor() {
    this.board = new Array(52).fill(null);
    this.players = [];
    // 4 single array or 4x4 matrix

  }

  addPlayer(player) {
    this.players.push(player);
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



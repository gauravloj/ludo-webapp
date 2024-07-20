class GamePlay {
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
}

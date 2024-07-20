import GameBoard from "./gameboard";

class GameService {
  startNewGame() {
    this.gameboard = new GameBoard();
  }

  playDie() {
    dieValue = rollDie();
  }
  movePiece() {}
  gameLoop() {
    while (true) {}
  }
  computerPlay() {}
  endgame() {}
  announceWinner() {}
}

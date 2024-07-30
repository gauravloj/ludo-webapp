/**
 * Players pieces' locations tracking:
 *      Locked or not
 *      Is move valid?
 *      Disable all invalid moves/dice rolls while this step is in progress.
 *
 */

class Player {
  constructor() {
    this.color = "clear";
    this.pieces = {
      piece1: new Piece(),
      piece2: new Piece(),
      piece3: new Piece(),
      piece4: new Piece(),
    };
  }
}

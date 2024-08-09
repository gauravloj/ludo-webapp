import { all_constants } from "./constants";
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

/*function rollDice() {
  let diceElement = document.getElementById("diceButtonId");
  diceElement.setAttribute("disabled", false);
  diceElement.onclick();
  console.log("Nemesis clicked dice button");
  //diceElement.click();
  diceElement.setAttribute("disabled", true);
}*/
function movePiece() {
  console.log("Nemesis Moved Piece");
}

function changeState() {}

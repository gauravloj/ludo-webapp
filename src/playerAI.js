export function playNemesis(rollDie, finishTurnCallback) {
  rollDie();
  console.log("Nemesis played");
  setTimeout(() => {
    console.log("Nemesis finished playing");
    finishTurnCallback();
  }, 1000);
}
function rollDice() {
  let diceElement = document.getElementById("diceButtonId");
  diceElement.setAttribute("disabled", false);
  diceElement.onclick();
  console.log("Nemesis clicked dice button");
  //diceElement.click();
  diceElement.setAttribute("disabled", true);
}
function movePiece() {}

function changeState() {}

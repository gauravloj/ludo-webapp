export function playNemesis(dispatch) {
  setTimeout(() => {
    rollDice();
  }, 5000);
  dispatch({ type: "NemesisPlayed" });
}
function rollDice() {
  let diceElement = document.getElementById("diceButtonId");
  diceElement.setAttribute("disabled", false);
  diceElement.onclick();
  //diceElement.click();
  diceElement.setAttribute("disabled", true);
}
function movePiece() {}

function changeState() {}

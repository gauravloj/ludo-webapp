import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export function EndGamePopup({ winner, isOpen, updatePopupState }) {
  let message = "";
  if (winner == "player") {
    message =
      "You have won this game! Continue your winning streak by playing again!";
  } else {
    message =
      "You have lost this game! Play again to win next time and get your revenge";
  }
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => updatePopupState(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">
              This game has ended!
            </DialogTitle>
            <Description>{message}</Description>
            <div className="flex gap-4">
              <button onClick={() => updatePopupState(false)}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

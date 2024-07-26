export function WinningBox({ color, orientation }) {
  return (
    <div
      className={`w-full h-full border-solid border-2 border-black bg-pink-200 flex justify-center items-center`}
    >
      <div className="m-2 rotate-45 w-4/6 h-4/6 bg-white rounded-xl"></div>
    </div>
  );
}

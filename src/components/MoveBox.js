export function MoveBox({ color, idx }) {
  return (
    <div className={`w-8 h-8 border-solid border-2 border-black ${color}`}>
      {idx}
    </div>
  );
}

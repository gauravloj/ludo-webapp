export function ActionButton({ text, onClick }) {
  return (
    <button className="p-2 m-2 bg-cyan-300" onClick={onClick}>
      {text}
    </button>
  );
}

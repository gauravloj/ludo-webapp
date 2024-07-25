export function HomeBox({ color }) {
  return (
    <div
      className={`w-full h-full border-solid border-2 border-black ${color} flex justify-center items-center`}
    >
      <div className="m-2 rotate-45 w-4/6 h-4/6 bg-white rounded-xl"></div>
    </div>
  );
}

import "./App.css";

export default function App() {
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen">
      <div className="ludo-board w-9/12 h-3/4 grid grid-cols-11 grid-rows-11 border-2 border-black">
        {/* Top row */}
        <div className="square"></div>
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="home bg-blue-500"></div>
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>
        <div className="square"></div>

        {/* Middle rows (excluding the center) */}
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>
        <div className="home bg-blue-500"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>

        {/* Center row */}
        <div className="center bg-red-500"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>
        <div className="home bg-blue-500"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="center bg-red-500"></div>

        {/* Bottom rows (excluding the center) */}
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="home bg-blue-500"></div>

        {/* Bottom row */}
        <div className="square"></div>
        <div className="square"></div>
        <div className="home bg-blue-500"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="safe-zone bg-yellow-500"></div>
        <div className="square"></div>
        <div className="triangle bg-green-500"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
    </div>
  );
}

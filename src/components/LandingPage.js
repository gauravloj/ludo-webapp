export function LandingPage() {
  return (
    <div className="flex flex-col">
      <div className="">Welcome to the world of Ludo</div>
      <div className="">Lets start a new game!</div>
      <div className=""> Choose your lucky color:</div>
      <div className="flex flex-row">
        <button className="rounded-full bg-lime-600 h-20 w-20"></button>
        <button className="rounded-full bg-lime-600 h-20 w-20"></button>
        <button className="rounded-full bg-lime-600 h-20 w-20"></button>
        <button className="rounded-full bg-lime-600 h-20 w-20"></button>
      </div>
    </div>
  );
}

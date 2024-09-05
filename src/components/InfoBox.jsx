export function InfoBox({ messages }) {
  return (
    <div className="h-full flex flex-col border-solid border-2 border-sky-500 space-y-4 m-4 p-4">
      <div className="text-3xl">Alerts / Current Play</div>
      <ol className="list-disc list-inside text-2xl">
        {messages.map((message) => {
          return (
            <div key={message} className="text-2xl">
              {message}
            </div>
          );
        })}
      </ol>
    </div>
  );
}

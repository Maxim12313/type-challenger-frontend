export default function GameBar({ setTestLength, restart }) {
  function onClick(testLength) {
    setTestLength(testLength);
    restart();
  }

  return (
    <div className="flex flex-row justify-center space-x-10 focus-hidden">
      <button className="text-4xl" onClick={() => onClick(15)}>15s</button>
      <button className="text-4xl" onClick={() => onClick(30)}>30s</button>
      <button className="text-4xl" onClick={() => onClick(60)}>60s</button>
    </div>
  );
}
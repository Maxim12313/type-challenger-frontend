export default function TestStats({ gameStarted, time, testLength, correctCount, wordIdx }) {
  const timeLeft = Math.floor(testLength - time / 1000);
  const divisor = time == 0 ? 1 : time;
  const WPM = Math.floor(60000 * correctCount / divisor);
  const incorrect = wordIdx - correctCount;
  return (
    <div className="flex flex-row justify-start w-full items-center space-x-28">
      <h1 className="text-yellow-600 w-1/6">
        { timeLeft } 
      </h1>
      <h1 className="text-blue-600 w-1/6">
        { WPM }
      </h1>
      <h1 className="text-green-600 w-1/6">
        { correctCount }
      </h1>
      <h1 className="text-red-600 w-1/6">
        { incorrect }
      </h1>
    </div>
  );
}
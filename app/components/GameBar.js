export default function GameBar({ setTestLength, setFreq, restart }) {
  function lengthClick(testLength) {
    setTestLength(testLength);
    restart();
  }
  function freqClick(freq) {
    setFreq(freq);
    restart();
  }

  return (
    <div className="flex flex-row justify-center space-x-10 focus-hidden helper">
      <div className="flex flex-row space-x-5">
        <button className="text-lg" onClick={() => lengthClick(15)}>15s</button>
        <button className="text-lg" onClick={() => lengthClick(30)}>30s</button>
        <button className="text-lg" onClick={() => lengthClick(60)}>60s</button>
      </div>
      <div className="flex flex-row space-x-5">
        <button className="text-lg" onClick={() => freqClick(100)}>English 100</button>
        <button className="text-lg" onClick={() => freqClick(500)}>English 500</button>
        <button className="text-lg" onClick={() => freqClick(1000)}>English 1000</button>
      </div>
    </div>
  );
}
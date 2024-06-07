"use client";
import Game from "../components/Game";

import { useState } from "react";

export default function Singleplayer() {
  const [testLength, setTestLength] = useState(15);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-row justify-center space-x-10">
        <button onClick={() => setTestLength(15)} className="text-4xl">
          15s
        </button>
        <button onClick={() => setTestLength(30)} className="text-4xl">
          30s
        </button>
        <button onClick={() => setTestLength(60)} className="text-4xl">
          60s
        </button>
      </div>
      <Game testLength={testLength}/>
    </div>
  );
}
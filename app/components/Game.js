"use client";

import { useState } from "react";

import useTyping from "../hooks/useTyping";

import GameBar from "./GameBar";
import WordList from "./WordList";
import TestStats from "./TestStats";

export default function Game() {
  const [testLength, setTestLength] = useState(30);

  const {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart,
    time,
    correctCount,
    gameStarted,
  } = useTyping({ testLength });

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <GameBar setTestLength={setTestLength} restart={restart} />
      <div className="w-full h-1/2 flex flex-col items-center justify-center helper px-36">
        <TestStats
          gameStarted={gameStarted}
          time={time.current}
          testLength={testLength}
          correctCount={correctCount.current}
          wordIdx={wordIdx}
        />
        <WordList
          words={words}
          inputs={inputs}
          wordIdx={wordIdx}
          letterIdx={letterIdx}
          renderingIdx={renderingIdx}
        />
        <button className="mt-5" onClick={restart}>
          Restart
        </button>
      </div>
    </div>
  );
}
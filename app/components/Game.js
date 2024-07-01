"use client";

import { useState } from "react";

import useTyping from "../hooks/useTyping";

import GameBar from "./GameBar";
import WordList from "./WordList";
import TestStats from "./TestStats";
import Display from "./Display";

export default function Game() {
  const [testLength, setTestLength] = useState(30);
  const [freq, setFreq] = useState(100);

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
  } = useTyping({ testLength, freq });

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <GameBar setTestLength={setTestLength} restart={restart} setFreq={setFreq}/>
      <div className="w-full h-full flex flex-col items-center justify-center helper px-36">
        <Display />

        <TestStats
          gameStarted={gameStarted}
          time={time}
          testLength={testLength}
          correctCount={correctCount}
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
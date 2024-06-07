"use client";

import { useState, useEffect } from "react"

import useTyping from "../hooks/useTyping";
import WordList from "./WordList";
import TestStats from "./TestStats";

export default function Game({ testLength }) {
  const {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart,
    gameStarted,
    time,
    correctCount,
  } = useTyping({ testLength });


  return (
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
  );
}
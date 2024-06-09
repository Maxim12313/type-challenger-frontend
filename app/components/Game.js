"use client";

import useTyping from "../hooks/useTyping";
import useFocus from "../hooks/useFocus";

import WordList from "./WordList";
import TestStats from "./TestStats";

export default function Game({ testLength, gameStarted, setGameStarted }) {
  const {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart,
    time,
    correctCount,
  } = useTyping({ testLength, gameStarted, setGameStarted });

  useFocus({ gameStarted });

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
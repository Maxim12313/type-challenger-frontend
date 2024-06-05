"use client";

import useTyping from "../hooks/useTyping";
import WordList from "./WordList";

export default function TextArea() {
  const {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart
  } = useTyping();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center helper">
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
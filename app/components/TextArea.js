"use client";

import { useState, useEffect } from "react"

import useTyping from "../hooks/useTyping";
import WordList from "./WordList";

export default function TextArea() {
  const {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart,
    WPM,
    gameStarted
  } = useTyping();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center helper">
      <h1 className={`text-5xl font-semibold ${gameStarted ? "text-blue-600" : ""}`}>{ WPM}</h1>
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
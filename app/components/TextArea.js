"use client";
import { useState, useEffect } from "react";


export function TextArea() {
  const [words, setWords] = useState([]);
  const [correct, setCorrect] = useState([]);

  useEffect(() => { 
    //must always maintain a minimum of 100 words
    //must always be 100 unfinished words
  });

  const wordComponents = words.map((word, i) => {
    return "";
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center helper">
      <div className="max-w-[2000px] w-full h-60 flex-row p-5 helper">
        { wordComponents }
      </div>
      <button className="mt-5">
        Restart
      </button>
    </div>
  );
}
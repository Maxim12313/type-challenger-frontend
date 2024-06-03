"use client";
import { useState, useEffect } from "react";


export function TextArea() {
  const [words, setWords] = useState();
  const [correct, setCorrect] = useState();


  useEffect(() => { 
    
  });

  const wordComponents = words.map(() => {

  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center helper">
      <div className="w-full h-60 flex-row p-5 helper">
        { wordComponents }
      </div>
      <button className="mt-5">
        Restart
      </button>
    </div>
  );
}
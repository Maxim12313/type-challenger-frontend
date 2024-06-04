"use client";
import { useState, useEffect } from "react";

import Word from "./Word";

export default function TextArea() {
  const [words, setWords] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [letterIdx, setLetterIdx] = useState(0);

  async function nextWord() {
    const freq = 100;
    const url = "http://localhost:8080/word/" + freq;
    const res = await fetch(url);
    const data = await res.json();
    setWords((prev) => {
      return [...prev, data.word];
    });
    setInputs((prev) => {
      return [...prev, Array(data.word.length + 10).fill(null)];
    });
  }

  const restart = () => {
    setWords([]);
    setInputs([]);
    setWordIdx(0);
    setLetterIdx(0);
    const count = 100;
    for (let i = 0; i < count; i++) {
      nextWord();
    }
  };

  //runs once at start
  useEffect(() => {
    //first 100 words
    setWords([]);
    setInputs([]);
    const count = 100;
    for (let i = 0; i < count; i++) {
      nextWord();
    }
  }, []);

  useEffect(() => { 
    const keyDown = (e) => {
      const key = e.key;
      if (key != 'Backspace' && key.length > 1) return;

      //go back 1
      const handleBackspace = (prev) => {
        if (letterIdx > 0 ) {
          prev[wordIdx][letterIdx - 1] = null;
          setLetterIdx(letterIdx - 1);
        }
      };
      //go next word
      const handleNext = () => {
        setWordIdx(wordIdx + 1);
        setLetterIdx(0);
      }
      //set letter input
      const handleNormal = (prev) => {
        if (letterIdx < prev[wordIdx].length) {
          prev[wordIdx][letterIdx] = key;
          setLetterIdx(letterIdx + 1);
        }
      }

      setInputs((prev) => {
        if (key == "Backspace") {
          handleBackspace(prev);
        }
        else if (key == " " && letterIdx >= prev[wordIdx].length - 10) {
          handleNext();
        }
        else {
          handleNormal(prev);
        }
        return prev;
      });

    };


    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    }
  }, [wordIdx, letterIdx]);


  const wordComponents = words.map((word, i) => {
    return (
      <Word key={i} word={word} input={inputs[i]}/>
    );
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center helper">
      <div 
        className="max-w-[2000px] w-full h-32 flex flex-row py-5 px-20 helper 
                  space-x-5 flex-wrap justify-start items-center overflow-hidden"
      >
        { wordComponents }
      </div>
      <button className="mt-5" onClick={restart}>
        Restart
      </button>
    </div>
  );
}
import { useState, useEffect, useCallback } from "react";


export default function useTyping() {
  const [words, setWords] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [letterIdx, setLetterIdx] = useState(0);
  const [renderingIdx, setRenderingIdx] = useState(0);

  const nextWord = useCallback(async () => {
    const freq = 100;
    const development = "http://localhost:8080";
    const production = "https://type-challenger-backend-o2gxniz4ia-ue.a.run.app";
    const url = (process.env.NODE_ENV == "development" ? development : production) + "/word/" + freq;
    const res = await fetch(url);
    const data = await res.json();
    setWords((prev) => {
      return [...prev, data.word];
    });
    setInputs((prev) => {
      return [...prev, Array(data.word.length + 10).fill(null)];
    });
  }, []);

  const restart = useCallback(async () => {
    setWords([]);
    setInputs([]);
    setWordIdx(0);
    setLetterIdx(0);
    const count = 100;
    for (let i = 0; i < count; i++) {
      nextWord();
    }
  }, [nextWord]);

  //initial
  useEffect(() => {
    restart();
  }, [restart]);


  //scrolling
  useEffect(() => {
    const container = document.querySelector("#word-list");
    const topWord = container.querySelector("div[class=word-class]");
    const activeWord = container.querySelector("#active-word");

    if (!topWord || !activeWord) return;

    const topY = topWord.getBoundingClientRect().y;
    const activeY = activeWord.getBoundingClientRect().y;
    const diff = activeY - topY;

    if (diff != 64) return;

    const wordElems = container.querySelectorAll("div[class=word-class]");
    let i = 0;
    while (i < wordElems.length && wordElems[i].getBoundingClientRect().y - topY != 32) {
      nextWord();
      i++;
    }
    setRenderingIdx((prev) => {
      return prev + i;
    });
  }, [wordIdx, nextWord, renderingIdx]);

  //typing
  useEffect(() => { 
    const keyDown = (e) => {
      const key = e.key;
      if (key != 'Backspace' && key.length > 1) return;

      //go back 1
      const handleBackspace = (prev) => {
        if (letterIdx > 0) {
          prev[wordIdx][letterIdx - 1] = null;
          setLetterIdx(letterIdx - 1);
        }
        else if (wordIdx > renderingIdx) {
          let newLetterIdx = prev[wordIdx - 1].length;
          while (prev[wordIdx - 1][newLetterIdx - 1] == null) newLetterIdx--;
          setWordIdx(wordIdx - 1);
          setLetterIdx(newLetterIdx);
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
  }, [wordIdx, letterIdx, renderingIdx]);

  return {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart,
  };
}
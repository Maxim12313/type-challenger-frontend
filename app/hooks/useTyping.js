import { useState, useEffect, useCallback, useRef } from "react";


export default function useTyping() {
  const [words, setWords] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [letterIdx, setLetterIdx] = useState(0);
  const [renderingIdx, setRenderingIdx] = useState(0);
  const [WPM, setWPM] = useState(0);
  const gameReady = useRef(true);
  const [gameStarted, setGameStarted] = useState(false);
  const correctCount = useRef(0);
  const time = useRef(0);

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
    gameReady.current = true;
    time.current = 0;
    correctCount.current = 0;
    setWPM(0);
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


  const runningWPM = () => {
    const interval = setInterval(() => {
      time.current += 1;
      setWPM(Math.floor(60 * correctCount.current / time.current));
      const endTime = 30;
      if (time.current == endTime) {
        setGameStarted(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  //typing
  useEffect(() => { 

    const isCorrect = (wordIdx) => {
      const correct = words[wordIdx];
      const user = inputs[wordIdx];
      for (let i = 0; i < correct.length; i++) {
        if (correct[i] != user[i]) return false;
      }
      return user[correct.length] == null; //must be same length as well
    };

    //logic for getting wpm
    const keydownCountCorrect = (e) => {
      const key = e.key;
      if (key != 'Backspace' && key.length > 1) return;

      //set startTime
      if (key != 'Backspace' && gameReady.current) {
        runningWPM();
        setGameStarted(true);
        gameReady.current = false;
      }
      //go prev word
      if (key == "Backspace" && letterIdx == 0 && wordIdx > renderingIdx) {
        if (isCorrect(wordIdx - 1)) {
          correctCount.current--;
        }
      } 
      //go next word
      else if (key == " " && letterIdx >= inputs[wordIdx].length - 10) {
        if (isCorrect(wordIdx)) {
          correctCount.current++;
        }
      }
    };

    //logic for typing
    const keydownType = (e) => {
      const key = e.key;
      if (key != 'Backspace' && key.length > 1 || !gameStarted) return;

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

    window.addEventListener("keydown", keydownCountCorrect);
    window.addEventListener("keydown", keydownType);

    return () => {
      window.removeEventListener("keydown", keydownCountCorrect);
      window.removeEventListener("keydown", keydownType);
    }
  }, [wordIdx, letterIdx, renderingIdx, inputs, words, gameStarted, gameReady]);

  return {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart,
    WPM,
    gameStarted,
  };
}
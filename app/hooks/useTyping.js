import { useState, useEffect, useCallback, useRef } from "react";

export default function useTyping({ testLength, freq }) {
  const [words, setWords] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [letterIdx, setLetterIdx] = useState(0);
  const [renderingIdx, setRenderingIdx] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const interval = useRef(null);
  const gameReady = useRef(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [time, setTime] = useState(0);


  const nextWord = useCallback(async () => {
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
  }, [freq]);

  const restart = useCallback(async () => {
    clearInterval(interval.current);
    gameReady.current = true;
    setTime(0);
    setCorrectCount(0);
    setWords([]);
    setInputs([]);
    setWordIdx(0);
    setLetterIdx(0);
    setRenderingIdx(0);
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

    console.log("time to change");
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


  const runningWPM = useCallback(() => {
    const startTime = new Date().getTime();
    const endTime = testLength * 1000;
    interval.current = setInterval(() => {
      const t = new Date().getTime() - startTime;
      setTime(t);
      if (t >= endTime || !gameReady) {
        setGameStarted(false);
        clearInterval(interval.current);
      }
    }, 1000);
  }, [testLength, setGameStarted, setTime]);

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
      if (key != "Backspace" && key.length > 1) return;

      //go prev word
      if (key == "Backspace" && letterIdx == 0 && wordIdx > renderingIdx) {
        if (isCorrect(wordIdx - 1)) {
          setCorrectCount((prev) => prev - 1);
        }
      }
      //go next word
      else if (key == " " && letterIdx >= inputs[wordIdx].length - 10) {
        if (isCorrect(wordIdx)) {
          setCorrectCount((prev) => prev + 1);
        }
      }
    };

    //logic for typing
    const keydownType = (e) => {
      const key = e.key;
      if (key != "Backspace" && key.length > 1) return;

      //set startTime
      if (key != "Backspace" && gameReady.current) {
        setGameStarted(true);
        gameReady.current = false;
        runningWPM();
      } else if (!gameStarted) return;

      //go back 1
      const handleBackspace = (prev) => {
        if (letterIdx > 0) {
          prev[wordIdx][letterIdx - 1] = null;
          setLetterIdx(letterIdx - 1);
        } else if (wordIdx > renderingIdx) {
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
      };
      //set letter input
      const handleNormal = (prev) => {
        if (letterIdx < prev[wordIdx].length) {
          prev[wordIdx][letterIdx] = key;
          setLetterIdx(letterIdx + 1);
        }
      };

      setInputs((prev) => {
        if (key == "Backspace") {
          handleBackspace(prev);
        } else if (key == " " && letterIdx >= prev[wordIdx].length - 10) {
          handleNext();
        } else {
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
    };
  }, [
    wordIdx,
    letterIdx,
    renderingIdx,
    inputs,
    words,
    gameStarted,
    gameReady,
    runningWPM,
    setGameStarted,
    setCorrectCount
  ]);

  return {
    words,
    inputs,
    wordIdx,
    letterIdx,
    renderingIdx,
    restart,
    gameStarted,
    time,
    correctCount
  };
}
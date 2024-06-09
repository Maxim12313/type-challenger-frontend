import { useEffect } from "react";

export default function useFocus({ gameStarted }) {
  useEffect(() => {
    const res = gameStarted ? "hidden" : "visible";
    document.documentElement.style.setProperty("--focus", res);
  }, [gameStarted]);

  // useEffect(() => {

  // });
}
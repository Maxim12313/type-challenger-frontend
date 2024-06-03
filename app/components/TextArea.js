"use client";
import { useState, useEffect } from "react";

export function TextArea() {
  const HardCoded = "i like fat orange cats";
  const [typedIdx, setTypedIdx] = useState(0);
  const [errorTyped, setErrorTyped] = useState([]);

  useEffect(()=> {
    const onKeyDown = (e) => {
      const key = e.key;
      if (key == 'Backspace' && errorTyped.length > 0) {
        setErrorTyped(errorTyped.slice(0,errorTyped.length-1));
      }
      else if (key == HardCoded[typedIdx] && errorTyped.length == 0) {
        setTypedIdx(typedIdx + 1);
      }
      else if (key >= 'a' && key <= 'z' || key >= 'A' && key <= 'Z'){
        setErrorTyped([...errorTyped, key]);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  })
  const updateText = () => {
    const letters = HardCoded.split('');
    letters.splice(typedIdx, 0, ...errorTyped);
    console.log(letters);
    const text = letters.map((c, i) => {
      const letter = c == ' ' ? <p>&nbsp;</p> : <p>{c}</p>;
      let color = "white";
      if (i < typedIdx + errorTyped.length) {
        color = i < typedIdx ? "lightGreen" : "red";
      }

      return (<div key={i} className="inline-block text-2xl" style={{backgroundColor:color}}>{letter}</div>);
    });

    return (
      <div>
        {text}
      </div>
    )
  }
  
  return (
    <main className="h-5/6 w-full flex flex-col place-content-center items-center">
        <div className="h-5/6 border-2 w-10/12">
          {updateText()}
        </div>
        <div className="">
          <button>
            Restart button
          </button>
        </div>
    </main>
  )
}

// export function TextArea() {
//   const [words, setWords] = useState([]);
//   const [correct, setCorrect] = useState([]);


//   useEffect(() => { 

//   });

//   const wordComponents = words.map((word, i) => {
//     return "";
//   });

//   return (
//     <div className="w-full h-full flex flex-col items-center justify-center helper">
//       <div className="w-full h-60 flex-row p-5 helper">
//         { wordComponents }
//       </div>
//       <button className="mt-5">
//         Restart
//       </button>
//     </div>
//   );
// }
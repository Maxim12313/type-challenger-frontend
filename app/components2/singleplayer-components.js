'use client'
import { useEffect, useState } from "react";

export function Page() {
  return (
    <App/>
  );
}

export function App() {
  return (
    <div className="text-center pt-10 h-screen">
      <Banner/>
      <TextArea/>
      <HelpFooter/>
    </div>
  )
}

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
      else if (key.match(/^[a-zA-Z]+$/)){
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
    <main className="h-4/6 flex flex-col place-content-center items-center border-2">
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

export function Banner() {
  return (
    <div className="h-1/6">
      <div>Banner</div>
      
      <div className="float-left">
        <ul>
          Navigation
          <li>Back</li>
        </ul>
      </div>
    </div>
  )
}

export function HelpFooter() {
  return (
    <div className="h-1/6">
      KEY HELP
    </div>
  )
}
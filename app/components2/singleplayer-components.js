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
  const [charTyped, setCharTyped] = useState('');

  useEffect(()=> {
    const onKeyDown = (e) => {
      const key = e.key;
      console.log(key);
      if (key == HardCoded[typedIdx]) {
        setTypedIdx(typedIdx + 1);
        setCharTyped(key);
      }
      else {
        setCharTyped(key);
      }
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  })
  const updateText = () => {
    let letters = [];
    for (let i = 0; i < typedIdx; i++) {
      if (HardCoded[i] == ' ') letters.push(<div className="inline-block text-2xl bg-green-400">&nbsp;</div>);
      else letters.push(<div className="inline-block text-2xl bg-green-400">{HardCoded.charAt(i)}</div>);
    }
    for (let i = typedIdx; i < HardCoded.length; i++) {
      if (HardCoded[i] == ' ') letters.push(<div className="inline-block text-2xl bg-red-400">&nbsp;</div>);
      else letters.push(<div className="inline-block text-2xl bg-red-400">{HardCoded.charAt(i)}</div>);
    }
    console.log(letters);

    return (
      <div>
        {letters}
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
import Letter from "./Letter"


//for now no extra mistakes possible
//input size = word + 10, 10 possible mistakes
export default function Word({ word, input }) {
  const letterElems = [];
  for (let i = 0; i < word.length; i++) {
    letterElems.push(
      <Letter key={i} letter={word[i]} input={input[i]}/>
    );
  }
  
  const extraElems = [];
  for (let i = word.length; i < input.length && input[i]; i++) {
    extraElems.push(
      <Letter key={i} letter="incorrect" input={input[i]} /> //guarantees failure
    );
  }

  return (
    <div className="flex flex-row w-fit">
      { letterElems }
      { extraElems }
    </div>
  );
}
import Letter from "./Letter"


//for now no extra mistakes possible
//input size = word + 10, 10 possible mistakes
export default function Word({ word, input, activeIdx }) {
  const letterElems = [];
  for (let i = 0; i < word.length; i++) {
    letterElems.push(
      <Letter
        key={i}
        letter={word[i]}
        input={input[i]} //for visibility reasons
        isActive={activeIdx == i}
      />
    );
  }

  const extraElems = [];
  for (let i = word.length; i < input.length; i++) {
    extraElems.push(
      <Letter
        key={i}
        letter="" //guarantees failure
        input={input[i]}
        isActive={activeIdx == i}
      /> 
    );
  }

  const space = (
    <Letter letter="   " input="   " isActive={activeIdx >= word.length} />
  );

  return (
    <div className="flex flex-row w-fit">
      { letterElems }
      { extraElems }
      { space }
    </div>
  );
}
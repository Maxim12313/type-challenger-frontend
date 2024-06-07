import Word from "./Word"

export default function WordList({ words, inputs, wordIdx, letterIdx, renderingIdx }) {
  const wordComponents = [];
  for (let i = renderingIdx; i < words.length; i++) {
    wordComponents.push(
      <Word
        key={i}
        word={words[i]}
        input={inputs[i]}
        activeIdx={wordIdx == i ? letterIdx : null} //active letter idx
      />
    );
  }
  return (
    <div 
      id="word-list"
      className="max-w-[2000px] w-full h-32 flex flex-row py-5 helper 
                flex-wrap justify-start items-center overflow-hidden"
    >
      { wordComponents }
    </div>
  );
}
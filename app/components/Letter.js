//input is null if empty
//correct letter, user input letter
export default function Letter({ letter, input }) {
  let display;
  let textColor;
  if (!input) { //not reached yet
    display = letter;
    textColor = "var(--color2)";
  }
  else if (letter != input) { //correcct
    display = input;
    textColor = "var(--color3)";
  }
  else { //incorrect
    display = input;
    textColor = "var(--color4)";
  }
  const style = {
    color: textColor,
  };

  if (display == ' ') display = '_'; //for visibility reasons

  return (
    <p 
      className="text-2xl"
      style={style}
    >
      { display }
    </p>
  );
}
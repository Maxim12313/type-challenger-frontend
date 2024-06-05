//input is null if empty
//correct letter, user input letter
export default function Letter({ letter, input, isActive }) {
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
  if (display == ' ') display = "_"; //for visibility reasons

  const style = {
    color: textColor,
    backgroundColor: isActive ? "yellow" : "transparent"
  };

  const id = isActive ? "active" : "";

  return (
    <p 
      id={id}
      className="text-2xl whitespace-pre"
      style={style}
    >
      { display }
    </p>
  );
}
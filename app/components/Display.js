let canvas;

function start() {
  canvas = document.getElementById("graphics_canvas").getContext("2d");
  console.log(canvas);
  requestAnimationFrame(update);
}

function update() {
  canvas.fillStyle = "black";
  canvas.fillRect(0, 0, 10, 100);
  console.log("happeing");
}

export default function Display() {
  return (
    <div onLoad={start}>
      <canvas width="150" height="150" id="graphics_canvas" className="helper"></canvas>
    </div>
  );
}
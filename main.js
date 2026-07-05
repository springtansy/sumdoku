"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let lastTime = null;
const input = {};
const squares = [];
for (let i=0;i<9;i++) {
  for (let j=0;j<9;j++) {
    squares.push({
      x:(i*60+32), 
      y:(j*60+32), 
      col:i, 
      row:j,
      value: 0,
      notes: [],
      cage: -1,
      selected: false
    });
  }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;
    input[key] = true;
});

document.addEventListener("keyup", (event) => {
    input[event.key.toLowerCase()] = false;
});

window.addEventListener("blur", () => {
    for (const key in input) {
        input[key] = false;
    }
});

function drawSquares(ctx) {
  ctx.fillStyle = "white"
  for (const square of squares) {
    ctx.fillRect(square.x,square.y,56,56)
  }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function update(dt) {
    
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSquares(ctx);
}

function gameLoop(timestamp) {
    if (lastTime === null) {
        lastTime = timestamp;
    }

    let dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    dt = Math.min(dt, 0.05);

    update(dt);
    draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

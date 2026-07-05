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
    squares.push({x:(i*60+30), y:(j*60+30), i:i, j:j)
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

function drawEmptySquares {
  for (const square in squares) {
  }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function update(dt) {
    
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

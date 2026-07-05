"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 540;
canvas.height = 540;

let lastTime = null;
const input = {};
const squares = [];

for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        squares.push(new Square(col, row));
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

class Square {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.x = col * 60 + 2;
        this.y = row * 60 + 2;

        this.value = 0;
        this.notes = [];
        this.cage = -1;
        this.selected = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.selected ? "#cfcfcf" : "white";
        ctx.fillRect(this.x, this.y, 56, 56);
    }
}

canvas.addEventListener("mousedown", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const row = Math.floor(y/60)
  const col = Math.floor(x/60)
  selectSquare(x,y)
});

function drawSquares(ctx) {
  for (const square of squares) {
    square.draw(ctx)
  }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function update(dt) {
    
}

function draw(ctx) {
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
    draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

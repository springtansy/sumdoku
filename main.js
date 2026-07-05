"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 540;
canvas.height = 540;

let lastTime = null;
const input = {};
const squares = [];

class Square {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.x = col * 60 + 2;
        this.y = row * 60 + 2;

        this.value = 2;
        this.notes = [];
        this.cage = -1;
        this.selected = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.selected ? "#cfcfcf" : "#ffffff";
        ctx.fillRect(this.x, this.y, 56, 56);
        if (this.value !== 0) {
            ctx.fillStyle = "#000000";
            ctx.font = "bold 40px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.value,this.x+28,this.y+28,45);
        }
    }
}

function selectSquare(col, row) {
    for (const square of squares) {
        square.selected = false;
    }

    const square = squares.find(
        s => s.col === col && s.row === row
    );

    if (square) {
        square.selected = true;
    }
}

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

canvas.addEventListener("mousedown", (event) => {
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / 60);
    const row = Math.floor(y / 60);

    if (col >= 0 && col < 9 && row >= 0 && row < 9) {
        selectSquare(col, row);
    }
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

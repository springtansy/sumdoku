"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 540;
canvas.height = 540;

let lastTime = null;
let notes = false;
let selectedSquare = null;
const squares = [];

function selectSquare(col, row) {
    for (const square of squares) {
        square.selected = false;
    }

    selectedSquare = squares.find(
        s => s.col === col && s.row === row
    );

    if (selectedSquare) {
        selectedSquare.selected = true;
    }
}

for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        squares.push(new Square(col, row));
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "n") {
        notes = !notes;
        return;
    }
    if (event.key >= "1" && event.key <= "9") {
        if (!selectedSquare) return;
        if (notes) {
            selectedSquare.toggleNote(Number(event.key));
            return;
        }
        selectedSquare.value = Number(event.key);
        return;
    }
    if (
        event.key === "0" ||
        event.key === "Backspace" ||
        event.key === "Delete"
    ) {
        if (!selectedSquare) return;
        selectedSquare.notes = [];
        selectedSquare.value = 0;
        return;
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

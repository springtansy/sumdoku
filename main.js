"use strict";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 540;
canvas.height = 540;

let lastTime = null;
let notes = false;
let selectedSquare = null;
const squares = [];

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
        ctx.fillStyle = this.selected ? "#cfcfcf" : "#ffffff";
        ctx.fillRect(this.x, this.y, 56, 56);
        if (this.value !== 0) {
            ctx.fillStyle = "#000000";
            ctx.font = "bold 40px Verdana";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.value,this.x+28,this.y+30);
        } else {
            ctx.fillStyle = "#000000";
            ctx.font = "italic 10px Verdana";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            for (const note of this.notes) {
                const xOffset = 13+(note%3)*15;
                const yOffset = 14+(Math.floor(note/3))*15;
                ctx.fillText(note,this.x+xOffset,this.y+yOffset);
            }
        }
    }

    toggleNote(key) {
        const index = this.notes.indexOf(key);
        
        if (index !== -1) {
            this.notes.splice(index, 1);
        } else {
            this.notes.push(key);
        }
    }
}

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

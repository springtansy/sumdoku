"use strict";

class Square {
    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.value = 0;
        this.solution = 0;

        this.notes = [];

        this.selected = false;
        this.cage = null;
    }

    draw(ctx) {
        const x = this.col * 60 + 2;
        const y = this.row * 60 + 2;

        ctx.fillStyle = this.selected ? "#cfcfcf" : "#ffffff";
        ctx.fillRect(x, y, 56, 56);

        if (this.value !== 0) {
            ctx.fillStyle = "#000000";
            ctx.font = "bold 40px Verdana";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.value, x + 28, y + 30);
        } else {
            ctx.fillStyle = "#000000";
            ctx.font = "10px Verdana";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            for (const note of this.notes) {
                const xOffset = 19 + ((note - 1) % 3) * 12;
                const yOffset = 20 + Math.floor((note - 1) / 3) * 12;
                ctx.fillText(note, x + xOffset, y + yOffset);
            }
        }
    }

    toggleNote(value) {
        const index = this.notes.indexOf(value);

        if (index === -1) {
            this.notes.push(value);
            this.notes.sort((a, b) => a - b);
        } else {
            this.notes.splice(index, 1);
        }
    }

    clear() {
        this.value = 0;
        this.notes = [];
    }
}

class Board {
    constructor() {
        this.squares = [];

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.squares.push(new Square(col, row));
            }
        }

        this.generateSolution();
        this.clearBoard();
    }

    getSquare(col, row) {
        return this.squares[row * 9 + col];
    }

    draw(ctx) {

        for (const square of this.squares) {
            square.draw(ctx);
        }

        for (let i = 0; i < 9; i++) {

            if (i%3 === 0) {
                continue
            }

            ctx.strokeStyle = "#b0b0b0";
            ctx.lineWidth = 4;

            ctx.beginPath();
            ctx.moveTo(i * 60, 0);
            ctx.lineTo(i * 60, 540);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * 60);
            ctx.lineTo(540, i * 60);
            ctx.stroke();
        }

        for (let i = 0; i <= 3; i++) {

            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 4;

            ctx.beginPath();
            ctx.moveTo(i * 180, 0);
            ctx.lineTo(i * 180, 540);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * 180);
            ctx.lineTo(540, i * 180);
            ctx.stroke();
        }
    }

    clearBoard() {
        for (const square of this.squares) {
            square.clear();
        }
    }

    clearSelection() {
        for (const square of this.squares) {
            square.selected = false;
        }
    }

    select(col, row) {
        this.clearSelection();

        const square = this.getSquare(col, row);

        square.selected = true;

        return square;
    }

    generateSolution() {
        for (const square of this.squares) {
            square.solution = 0;
        }

        this.fill(0);
    }

    fill(index) {
        if (index >= 81) {
            return true;
        }

        const row = Math.floor(index / 9);
        const col = index % 9;

        const numbers = this.shuffle([1,2,3,4,5,6,7,8,9]);

        for (const value of numbers) {

            if (this.canPlace(col, row, value)) {

                this.getSquare(col, row).solution = value;

                if (this.fill(index + 1)) {
                    return true;
                }

                this.getSquare(col, row).solution = 0;
            }
        }

        return false;
    }

    canPlace(col, row, value) {

        for (let c = 0; c < 9; c++) {
            if (this.getSquare(c, row).solution === value)
                return false;
        }

        for (let r = 0; r < 9; r++) {
            if (this.getSquare(col, r).solution === value)
                return false;
        }

        const startCol = Math.floor(col / 3) * 3;
        const startRow = Math.floor(row / 3) * 3;

        for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
                if (this.getSquare(c, r).solution === value)
                    return false;
            }
        }

        return true;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    isSolved() {
        for (const square of this.squares) {
            if (square.value !== square.solution)
                return false;
        }

        return true;
    }
}

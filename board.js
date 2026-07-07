class Board {
    constructor() {
        this.squares = [];

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.squares.push(new Square(col, row));
            }
        }
    }

    getSquare(col, row) {
        return this.squares[row * 9 + col];
    }

    clearPlayerBoard() {
        for (const square of this.squares) {
            square.value = 0;
            square.notes = [];
        }
    }

    generateSolution() {
        // erase old solution

        for (const square of this.squares) {
            square.solution = 0;
        }

        this.fillCell(0);
    }

    fillCell(index) {
        if (index >= 81) {
            return true;
        }

        const row = Math.floor(index / 9);
        const col = index % 9;

        const numbers = this.shuffle([1,2,3,4,5,6,7,8,9]);

        for (const number of numbers) {

            if (this.isValid(col, row, number)) {

                this.getSquare(col,row).solution = number;

                if (this.fillCell(index + 1)) {
                    return true;
                }

                this.getSquare(col,row).solution = 0;
            }
        }

        return false;
    }

    isValid(col,row,value) {

        // row

        for (let c=0;c<9;c++) {

            if (c===col) continue;

            if (this.getSquare(c,row).solution===value)
                return false;
        }

        // column

        for (let r=0;r<9;r++) {

            if (r===row) continue;

            if (this.getSquare(col,r).solution===value)
                return false;
        }

        // box

        const boxCol=Math.floor(col/3)*3;
        const boxRow=Math.floor(row/3)*3;

        for(let r=boxRow;r<boxRow+3;r++){
            for(let c=boxCol;c<boxCol+3;c++){

                if(c===col && r===row) continue;

                if(this.getSquare(c,r).solution===value)
                    return false;

            }
        }

        return true;
    }

    shuffle(array){

        for(let i=array.length-1;i>0;i--){

            const j=Math.floor(Math.random()*(i+1));

            [array[i],array[j]]=[array[j],array[i]];

        }

        return array;
    }

    draw(ctx){

        for(const square of this.squares){
            square.draw(ctx);
        }

    }
}

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
            ctx.font = "10px Verdana";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            for (const note of this.notes) {
                const xOffset = 19+((note-1)%3)*12;
                const yOffset = 20+(Math.floor((note-1)/3))*12;
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

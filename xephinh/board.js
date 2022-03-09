class board {
    constructor(game) {
        this.game = game;
        this.data = [
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _],
            [_, _, _, _, _, _, _, _, _, _]
        ];
        this.nextData = [
            [_, _, _, _, _, _],
            [_, _, _, _, _, _],
            [_, _, _, _, _, _],
            [_, _, _, _, _, _],
            [_, _, _, _, _, _]
        ];
        this.rowDestroy = 0;
        this.countSpeed = 0;
    }
    resetNextData() {
        for (let r = 0; r < this.nextData.length; r++) {
            for (let c = 0; c < this.nextData[0].length; c++) {
                this.nextData[r][c] = _;
            }
        }
    }
    emptyCell(c, r) {
        return this.data[r][c] === _;// tra ve true neu gia tri tai cot c va dong r == null
    }
    drawBackground() {
        this.drawMainScreen();
        this.drawNextScreen();
    }
    drawMainScreen() {
        for (let r = 0; r < this.data.length; r++) {
            for (let c = 0; c < this.data[0].length; c++) {
                let cl = _colorBr;
                if (this.data[r][c] === x) {
                    cl = _colorBl;
                }
                let bl = new block(this.game, c, r, cl);
                bl.drawMainScreen();
            }
        }
    }
    drawNextScreen() {
        for (let r = 0; r < this.nextData.length; r++) {
            for (let c = 0; c < this.nextData[0].length; c++) {
                let cl = _colorBr;
                if (this.nextData[r][c] === x) {
                    cl = _colorBl;
                }
                let bl = new block(this.game, c, r, cl);
                bl.drawNextScreen();
            }
        }
    }
    checkFullRow(r) {
        let isFull = true;
        for (let c = 0; c < this.data[r].length; c++) {
            if (this.data[r][c] === _) {
                isFull = false;
                break;
            }
        }
        return isFull;
    }
    checkEndGame() {
        let endGame = false;
        for (let c = 0; c < this.data[0].length; c++) {
            if (this.data[0][c] === x) {
                endGame = true;
                break;
            }
        }
        return endGame;
    }
    updateBoard() {
        for (let r = 0; r < _ROWS; r++) {
            if (this.checkFullRow(r)) {
                this.data.splice(r, 1);
                this.data.unshift([_, _, _, _, _, _, _, _, _, _]);
                this.rowDestroy += 1;
                this.countSpeed += 1;
            }
        }
        if (this.checkEndGame()) {
            clearInterval(this.game.status);
        }
        if (this.countSpeed == 10) {
            this.game.speed -= 100;
            this.countSpeed = 0;
            clearInterval(this.game.status);
            this.game.status = this.game.startGame();
        }
        document.getElementById('txt_level').value = Math.floor((1000 - this.game.speed) / 100);
        document.getElementById('txt_score').value = this.rowDestroy;
    }
}
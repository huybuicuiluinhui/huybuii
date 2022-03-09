class game {
    constructor() {
        console.log('khoi tao game');
        this.canvas = null;
        this.context = null;

        this.nextCanvas = null;
        this.nextContext = null;

        this.btnStart = null;
        this.status = null;
        this.speed = 1000;
        this.init();
        this.eventListener();
        this.loop();
        //this.startGame();		
    }
    eventListener() {
        document.addEventListener('keydown', (event) => {
            if (this.status != null) {
                switch (event.key) {
                    case 'ArrowUp':
                        this.brick.rotateBrick();
                        break;
                    case 'ArrowDown':
                        this.brick.down();
                        //console.log('down');
                        break;
                    case 'ArrowLeft':
                        this.brick.moveLeft();
                        //this.block.moveLeft();									
                        break;
                    case 'ArrowRight':
                        this.brick.moveRight();
                        //this.block.moveRight();
                        //console.log('Right');
                        break;
                };
            }
        });
        this.btnStart.addEventListener('click', (event) => {
            let status = event.srcElement.attributes.status.value;
            switch (status) {
                case 'start':
                    this.status = this.startGame();
                    this.btnStart.attributes.status.value = 'stop';
                    this.btnStart.value = "STOP";
                    break;
                case 'stop':
                    clearInterval(this.status);
                    this.status = null;
                    this.btnStart.attributes.status.value = 'start';
                    this.btnStart.value = "START";
                    // statements_def
                    break;
            }
        });

    }
    init() {
        this.btnStart = document.getElementById('btn_start');
        //create canvas main screen
        this.canvas = document.createElement('canvas');
        this.canvas.width = _WIDTH;
        this.canvas.height = _HEIGHT;
        this.context = this.canvas.getContext('2d');
        document.getElementById('mainScreeen').appendChild(this.canvas);

        //create canvas next screen
        this.nextCanvas = document.createElement('canvas');
        this.nextCanvas.width = _NEXTWIDTH;
        this.nextCanvas.height = _NEXTHEIGHT;
        this.nextContext = this.nextCanvas.getContext('2d');
        document.getElementById('nextScreen').appendChild(this.nextCanvas);

        this.board = new board(this);
        this.board.drawBackground();

        //this.block = new block(this, 3, 3, _colorBl);
        //this.block.drawMainScreen();

        this.brick = new brick(this, 3, 0);
        this.brick.drawBrickMainScreen();
        this.nextBrick = new brick(this, 3, 0);
        this.nextBrick.drawBrickToNextScreen();
    }
    createNextBrick() {
        this.nextBrick = new brick(this, 3, 0);
        this.nextBrick.drawBrickToNextScreen();
    }
    startNextBrick() {
        this.brick = this.nextBrick;
    }
    startGame() {
        return setInterval(() => {
            //this.block.fall();	
            this.brick.fall();
        }, this.speed);
    }
    clearScreen() {
        this.context.clearRect(0, 0, _WIDTH, _HEIGHT);
        this.board.drawBackground();
    }
    draw() {
        this.clearScreen();
        //this.block.drawMainScreen();		
        this.brick.drawBrickMainScreen();
    }
    loop() {
        //console.log('loop');
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

}
var g = new game();
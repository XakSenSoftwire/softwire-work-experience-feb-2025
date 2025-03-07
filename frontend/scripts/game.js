import createGame from "./gameLogicInterface.js";
import { drawGrid, refreshGameDisplay, drawTiles } from "./gameUI.js";
import{ drawUpcomingTetrominoes} from "./gameUI.js"

initialiseGame();
function initialiseGame() {
    let game = createGame();
    console.log(game);

    var audio = new Audio('../assets/Tetris.mp3')
    audio.play();
    audio.loop = true

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    drawGrid();
    drawUpcomingTetrominoes(game)
    updateScoreDisplay(game);
    drawTiles(game);

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            game.moveLeft();
            refreshGameDisplay(game);
        }
        if (event.key === "ArrowRight"){
            game.moveRight();
            refreshGameDisplay(game);
        }
        if (event.key == "c") {
            game.holdCurrentTetromino()
            refreshGameDisplay(game);
        }
        if (event.key === "ArrowDown") {
            game.moveDown();
            refreshGameDisplay(game);
        }
        if (event.key === "ArrowUp") {
            game.rotateTetrominoClockwise();
            refreshGameDisplay(game);
        }
        if (event.key === "x") {
            game.rotateTetrominoAntiClockwise();
            refreshGameDisplay(game);
        }
        if (event.key === " ") {
            game.instantDropTetromino();
            refreshGameDisplay(game);
        }
    });


    window.setInterval(() => {
        game.gameTick();
        refreshGameDisplay(game);
        checkGameOver(game);
        updateScoreDisplay(game);
    }, 1000);
}

function checkGameOver(game) {
    if (game.isGameOver()) {
        const score = game.getScore(); 
        window.location.href = `gameOver.html?score=${score}`; 
    }
}

function updateScoreDisplay(game) {
    document.getElementById("score").textContent=game.getScore()
}

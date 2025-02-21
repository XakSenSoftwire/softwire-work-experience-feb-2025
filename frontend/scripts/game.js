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
            refreshGameDisplay(game);
            game.rotateTetrominoClockwise()
        }
        if (event.key === "x") {
            refreshGameDisplay(game);
            game.rotateTetrominoAntiClockwise()
        }
    });


    window.setInterval(() => {
        game.gameTick();
        refreshGameDisplay(game);
        checkGameOver(game);
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

import createGame  from "./gameLogicInterface.js"
import { drawGrid, refreshGameDisplay } from "./gameUI.js"

initialiseGame();
function initialiseGame() {
    let game = createGame();
    drawGrid();
    console.log(game);
}


function updateScoreDisplay(gameScore){
    document.getElementById("score").textContent = game.getScore();

    window.setInterval(() => {
        game.gameTick();
        refreshGameDisplay(game);
        checkGameOver(game);
    }, 1000);
}

function checkGameOver(game) {
    

}
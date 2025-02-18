import createGame  from "./gameLogicInterface.js"
import { drawGrid } from "./gameUI.js"

initialiseGame(); 

function initialiseGame() {
    let game = createGame();

    drawGrid();

    console.log(game);
}


GetElementById (score)
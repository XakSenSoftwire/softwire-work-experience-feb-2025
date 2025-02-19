import createGame  from "./gameLogicInterface.js"
import { drawGrid } from "./gameUI.js"

initialiseGame();{}


let game = createGame();

    drawGrid();

    console.log(game);
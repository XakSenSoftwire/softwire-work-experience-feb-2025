export const BOARD_UNITS_WIDTH = 10;
export const BOARD_UNITS_HEIGHT = 20;
const BOARD_UNIT_PIXEL_SIZE = 40;

const BOARD_WIDTH = BOARD_UNITS_WIDTH * BOARD_UNIT_PIXEL_SIZE;
const BOARD_HEIGHT = BOARD_UNITS_HEIGHT * BOARD_UNIT_PIXEL_SIZE;

export function drawGrid(){
    var gameCanvas=document.getElementById("game-grid");
    gameCanvas.setAttribute("width", BOARD_WIDTH)
    gameCanvas.setAttribute("height", BOARD_HEIGHT)

    var gameContext = gameCanvas.getContext("2d");
    addHorizontalGameLines(gameContext);
    addVerticalGameLines(gameContext);
    gameContext.stroke();
}

export function refreshGameDisplay(game) {
    
}

function addVerticalGameLines(gameContext) {
    for (var xPosition=0; xPosition<=BOARD_WIDTH; xPosition = xPosition + BOARD_UNIT_PIXEL_SIZE) {
        gameContext.moveTo(xPosition, 0);
        gameContext.lineTo(xPosition, BOARD_HEIGHT);
    }
}

function addHorizontalGameLines(gameContext) {
    for (var yPosition = 0; yPosition <= BOARD_HEIGHT; yPosition = yPosition + BOARD_UNIT_PIXEL_SIZE) {
        gameContext.moveTo(0, yPosition);
        gameContext.lineTo(BOARD_WIDTH, yPosition);
    }
}


function drawTiles(game) {
    
}
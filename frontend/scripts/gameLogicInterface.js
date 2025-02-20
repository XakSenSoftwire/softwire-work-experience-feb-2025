import { BOARD_UNITS_HEIGHT, BOARD_UNITS_WIDTH } from "./gameUI.js"

const SCORE_PER_ROW_CLEAR = 100

export const Tetromino = {
	I_Piece: "I_Piece",
	J_Piece: "J_Piece",
	L_Piece: "L_Piece",
	O_Piece: "O_Piece",
	S_Piece: "S_Piece",
	Z_Piece: "Z_Piece",
	T_Piece: "T_Piece",
};

const TetrominoShapes = {
	I_Piece: [
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0],
        [0,0,1,0]
	],
	J_Piece: [
        [0,0,1,0],
        [0,0,1,0],
        [0,1,1,0],
        [0,0,0,0]
	],
	L_Piece: [
       [0,1,0,0],
       [0,1,0,0],
       [0,1,1,0],
       [0,0,0,0]
	],
	O_Piece: [
		[0,0,0,0],
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	],
	S_Piece: [
        [0,0,0,0],
        [0,0,1,1],
        [0,1,1,0],
        [0,0,0,0]
	],
	Z_Piece: [
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
	],
	T_Piece: [
        [0,0,0,0],
        [0,1,1,1],
        [0,0,1,0],
        [0,0,0,0]
	]
};

function getRandomTetromino() {
	const options = Object.values(Tetromino);
	return options[Math.floor(Math.random() * options.length)];
}

function getRandomColour() {
	const options = [
		"cyan",
		"blue",
		"orange",
		"yellow",
		"green",
		"purple",
		"red"
	];
	return options[Math.floor(Math.random() * options.length)];
}

export const emptyGameState = {
	// A 10x20 array full of null values
	playfield: new Array(BOARD_UNITS_HEIGHT).fill(new Array(BOARD_UNITS_WIDTH).fill(null)),
	score: 0,
	upcomingTetrominoes: Array.from({length: 3}, getRandomTetromino),
	heldTetromino: null,
	activeTetromino: {
		...(function() {
			const tetromino = getRandomTetromino();
			return {
				name: tetromino,
				tiles: TetrominoShapes[tetromino]
			};
		}()),
		position: {
			x: (BOARD_UNITS_WIDTH - 4) / 2,
			y: BOARD_UNITS_HEIGHT - 1, // Top row is reserved for game over
		},
		colour: getRandomColour()
	}
};

export default function createGame(initialGameState = emptyGameState) {
	const tetrisGame = {
		gameState: initialGameState,

		
		gameState: initialGameState,
		/**
		 * Checks if a new active tetromino state is possible
		 *
		 * The paramenter newState is the same format as `activeTetromino` in the gameState object
		 * @param {object} newState
		 * @returns {boolean}
		 */
		isStateValid: function(newState) {
			return true
		},

		/**
		 * Progress the game forward one timestep
		 */
		gameTick: function() {
			this.scoreRows();
		},

		/**
		 * Return if the game is over
		 * @return {boolean}
		 */
		isGameOver: function() {
			return false
		},

		/**
		 * Return the tile at the given position
		 * If there is a tile, return it's colour
		 * @return {null | string}
		 *
		 * Possible colours: "cyan, blue, orange, yellow, green, purple, red"
		 */
		getTileAtPosition: function(x, y) {

		},

		/**
		 * Return the score of the game
		 * @return {int}
		 */
		getScore: function() {

		},

		/**
		 * Return any stats that have been kept track of (tetrominos dropped, tetrises made, etc.)
		 * @return {object}
		 *
		 * Which stats to keep track of can be determined later
		 */
		getStats: function() {

		},

		/**
		 * Get any upcoming tetrominoes
		 * @return {Array<Tetromino>}
		 */
		getUpcomingTetrominoes: function() {

		},

		/**
		 * Return the tetromino currently being held, if any
		 * @return {null | Tetromino}
		 */
		getHeldTetromino: function() {

		},

		/**
		 * Return the entire game state in a single object
		 * This combines every one of the above functions (for debug purposes)
		 * @return {object}
		 */
		getGameState: function() {
			return this.gameState;
		},

		/**
		 * Move the current tetromino left 1 tile
		 */
		moveLeft: function() {

		},

		/**
		 * Move the current tetromino right 1 tile
		 */
		moveRight: function() {

		},

		/**
		 * Rotate the current tetromino clockwise 90 degrees
		 */
		rotateTetrominoClockwise: function() {

		},

		/**
		 * Rotate the current tetromino anti-clockwise 90 degrees
		 */
		rotateTetrominoAntiClockwise: function() {

		},

		/**
		 * Instantly drop the current tetromino as far as it goes and lock it in place
		 */
		instantDropTetromino: function() {

		},

		/**
		 * Hold the current tetromino, swapping it for any currently held one
		 */
		holdCurrentTetromino: function() {

		},

		/**
		 * Check for any full rows in the game board and clear them, also updates score
		 */
		scoreRows: function() {
			// iterate in reverse as removing elements during loop
			for (let row_ind = BOARD_UNITS_HEIGHT - 1; row_ind >= 0; row_ind--) {
				let row = this.gameState.playfield[row_ind];

				let all_filled = !(row.includes(null));

				if (all_filled) {
					this.gameState.playfield.splice(row_ind, 1);  // remove row
					this.gameState.score += SCORE_PER_ROW_CLEAR;
					this.gameState.playfield.push(new Array(BOARD_UNITS_WIDTH).fill(null));  // add empty row
				}
			}
		},
	};

	return tetrisGame;
};

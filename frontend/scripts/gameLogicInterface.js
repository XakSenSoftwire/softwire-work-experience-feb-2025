import { BOARD_UNITS_HEIGHT, BOARD_UNITS_WIDTH, drawTiles } from "./gameUI.js"

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

export const TetrominoShapes = {
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
	playfield: new Array(BOARD_UNITS_HEIGHT).fill(null).map(() => new Array(BOARD_UNITS_WIDTH).fill(null)),
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
			y: 3, // Top row is reserved for game over
		},
		colour: getRandomColour()
	}
};

export default function createGame(initialGameState = emptyGameState) {
	const tetrisGame = {
		gameState: initialGameState,

		/**
		 * Checks if a new active tetromino state is possible
		 *
		 * The paramenter newState is the same format as `activeTetromino` in the gameState object
		 * @param {object} newState
		 * @returns {boolean}
		 */
		isStateValid: function(newState) {
			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					if (newState.tiles[row][col] == 0) {
						continue;
					}
					let playfield_col = newState.position.x + col;
					let playfield_row = newState.position.y - row;

					// check boundaries 
					if (playfield_col < 0 || playfield_col >= BOARD_UNITS_WIDTH) {
						return false;
					}
					if (playfield_row < 0 || playfield_row >= BOARD_UNITS_HEIGHT) {
						return false;
					}

					// check existing blocks
					if (this.gameState.playfield[playfield_row][playfield_col] != null) {
						return false;
					}

				}
			}
			return true;					
		},

		/**
		 * Progress the game forward one timestep
		 */
		gameTick: function() {
			this.scoreRows();
			this.moveDown();
		},

		/**
		 * Return if the game is over
		 * @return {boolean}
		 */
		isGameOver: function() {
			return this.gameState.isGameOver;
		},

		/**
		 * Return the tile at the given position
		 * If there is a tile, return it's colour
		 * @return {null | string}
		 *
		 * Possible colours: "cyan, blue, orange, yellow, green, purple, red"
		 */
		getTileAtPosition: function(x, y) {
			for (let row = 0; row < 4; row++) {
				for (let col = 0; col < 4; col++) {
					if (this.gameState.activeTetromino.tiles[row][col] === 1) {
						if (x === this.gameState.activeTetromino.position.x + col &&
							y === this.gameState.activeTetromino.position.y - row) {
							return this.gameState.activeTetromino.colour;
						}
					}
				}
			}
		
			if (this.gameState.playfield[y] && this.gameState.playfield[y][x] !== null) {
				return this.gameState.playfield[y][x];
			}
		
			return null;
		},
		

		/**
		 * Return the score of the game
		 * @return {int}
		 */
		getScore: function() {
			return this.gameState.score;
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
			return this.gameState.upcomingTetrominoes;
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
			if (this.isStateValid({
				...this.gameState.activeTetromino,
				position: {
					x: this.gameState.activeTetromino.position.x - 1,
					y: this.gameState.activeTetromino.position.y		
				}
			})) 			
			{
				this.gameState.activeTetromino.position.x -= 1;
			}
		},
          
		moveDown: function() {
			let { x, y } = this.gameState.activeTetromino.position;
			let newPosition = { x, y: y + 1 };
			let newState = {
				...this.gameState.activeTetromino,
				position: {
					x: newPosition.x,
					y: newPosition.y
				}
			}

			if (this.isStateValid(newState)) {
				this.gameState.activeTetromino = newState;
			}
		},


		/**
		 * Move the current tetromino right 1 tile
		 */
		moveRight: function() {
			if (this.isStateValid({
				...this.gameState.activeTetromino,
				position: {
					x: this.gameState.activeTetromino.position.x + 1,
					y: this.gameState.activeTetromino.position.y
				}
			})) {
				this.gameState.activeTetromino.position.x += 1;
			}
		},

		/**
		 * Rotate the current tetromino clockwise 90 degrees
		 */
		
	    rotateTetrominoClockwise: function() { 
			let clockwiseRotated = new Array(4).fill(null).map(() => new Array(4).fill(null))
			let n = 4;

			for (let activeRowIndex = 0; activeRowIndex < n; activeRowIndex++) {
				for (let activeColumnIndex = 0; activeColumnIndex < n; activeColumnIndex++) {
					clockwiseRotated[activeColumnIndex][n-1-activeRowIndex] = this.gameState.activeTetromino.tiles[activeRowIndex][activeColumnIndex];
				}
			}

			if (this.isStateValid({
				...this.gameState.activeTetromino,
				tiles: clockwiseRotated,
			})) {
				this.gameState.activeTetromino.tiles = clockwiseRotated;
			}
		},

		/**
		 * Rotate the current tetromino anti-clockwise 90 degrees
		 */
		rotateTetrominoAntiClockwise: function() {
			let anticlockwiseRotated = new Array(4).fill(null).map(() => new Array(4).fill(null))
			let n = 4;

			for (let activeRowIndex=0; activeRowIndex<n; activeRowIndex++) {
				for (let activeColumnIndex=0; activeColumnIndex<n; activeColumnIndex++) {
					anticlockwiseRotated[n-1-activeColumnIndex][activeRowIndex] = this.gameState.activeTetromino.tiles[activeRowIndex][activeColumnIndex];
				}
			}
			
			if (this.isStateValid({
				...this.gameState.activeTetromino,
				tiles: anticlockwiseRotated,
			})) {
				this.gameState.activeTetromino.tiles = anticlockwiseRotated;
			}
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
			console.log("holding")
			if (this.gameState.heldTetromino == null) {
				this.gameState.heldTetromino = this.gameState.activeTetromino.name
				console.log(this.gameState.heldTetromino)
				this.updateActiveTetromino()
				console.log(this.gameState.heldTetromino)
			} else {
				[this.gameState.activeTetromino, this.gameState.heldTetromino] = [this.gameState.heldTetromino, this.gameState.activeTetromino];
			}
		},

		updateActiveTetromino: function() {
			this.gameState.activeTetromino.name = this.gameState.upcomingTetrominoes.shift()
			this.gameState.activeTetromino.tiles = TetrominoShapes[this.gameState.activeTetromino.name]
			this.gameState.activeTetromino.position.x = (BOARD_UNITS_WIDTH - 4) / 2
			this.gameState.activeTetromino.position.y = 3
			this.gameState.activeTetromino.colour = getRandomColour()

				// add tetromino to list of upcoming ones
			this.gameState.upcomingTetrominoes.push(getRandomTetromino())
		},


		/**
		 * Check for any full rows in the game board and clear them, also updates score
		 */
		scoreRows: function() {
			let cleared_rows = 0;

			// iterate in reverse as removing elements during loop
			for (let row_ind = BOARD_UNITS_HEIGHT - 1; row_ind >= 0; row_ind--) {
				let row = this.gameState.playfield[row_ind];

				let all_filled = !(row.includes(null));

				if (all_filled) {
					cleared_rows++;
					this.gameState.playfield.splice(row_ind, 1);  // remove row
					this.gameState.playfield.push(new Array(BOARD_UNITS_WIDTH).fill(null));  // add empty row
				}
			}

				const SCORE_PER_ROW = 40;	
				const SCORE_MULTIPLIER = [0, 1, 2.5, 7.5, 300];
				if(cleared_rows > 0 && cleared_rows < 4) {
					this.gameState.score += SCORE_PER_ROW * SCORE_MULTIPLIER[cleared_rows];
				}
			
		},

	};
	return tetrisGame;
};

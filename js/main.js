import { Board } from "./board.js";
import { EventHandler } from "./eventhandler.js";
import { Game } from './game.js';
import { Pattern } from "./pattern.js";

const COLUMN_COUNT = 75;
const ROW_COUNT = 50;
const CELL_WIDTH = 12;

let gameElement = document.getElementById("game-board");
gameElement.style.width = COLUMN_COUNT * CELL_WIDTH + "px";
gameElement.style.height = ROW_COUNT * CELL_WIDTH + 1 + "px";

let board = new Board(gameElement, ROW_COUNT, COLUMN_COUNT, CELL_WIDTH);
let game = new Game(board);
let handler = new EventHandler(board, game);

setTimeout(() => {
  board.drawPattern(new Pattern());
}, 2000)









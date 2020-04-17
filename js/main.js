import { Board } from "./board.js";
import { EventHandler } from "./events.js";
import { Game } from './game.js';

const COLUMN_COUNT = 75;
const ROW_COUNT = 45;

let gameElement = document.getElementById("game-board");
let board = new Board(gameElement, ROW_COUNT, COLUMN_COUNT);
let game = new Game(board);
let handler = new EventHandler(board, game);







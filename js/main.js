import { Board } from "./board.js";
import { EventHandler } from "./eventhandler.js";
import { Game } from './game.js';
import { Pattern } from "./pattern.js";

const COLUMN_COUNT = 75;
const ROW_COUNT = 45;

let gameElement = document.getElementById("game-board");
let board = new Board(gameElement, ROW_COUNT, COLUMN_COUNT);
let game = new Game(board);
let pattern = new Pattern(document.querySelector('.pattern'));
let handler = new EventHandler(board, game);







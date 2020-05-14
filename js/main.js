import { GameBoard } from "./game-board.js";
import { EventHandler } from "./eventhandler.js";
import { Game } from "./game.js";
import {PatternService} from "./pattern-service.js";

const COLUMN_COUNT = 75;
const ROW_COUNT = 50;
const CELL_WIDTH = 12;

let gameElement = document.getElementById("game-board");
gameElement.style.width = COLUMN_COUNT * CELL_WIDTH + "px";
gameElement.style.height = ROW_COUNT * CELL_WIDTH + 1 + "px";

let patternService = new PatternService();
let board = new GameBoard(gameElement, ROW_COUNT, COLUMN_COUNT, patternService);
let game = new Game(board);
let handler = new EventHandler(board, game, patternService);








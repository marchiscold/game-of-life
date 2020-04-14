import { Board } from "./board.js";
import { EventHandler } from "./events.js";

const COLUMN_COUNT = 75;
const ROW_COUNT = 45;

let game = document.getElementById("game-board");
let board = new Board(game, ROW_COUNT, COLUMN_COUNT);
let handler = new EventHandler(board);

setInterval(() => {
  board.update();
  board.render();
}, 190);






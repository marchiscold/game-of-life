import { Board } from "./board.js";
import { Input } from "./input.js";

const COLUMN_COUNT = 75;
const ROW_COUNT = 45;

let game = document.getElementById("game-board");
let board = new Board(game, ROW_COUNT, COLUMN_COUNT);
let input = new Input(board);

setInterval(() => {
  board.update();
  board.render();
}, 190);






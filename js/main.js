import { Board } from "./board.js";
import { EventHandler } from "./events.js";

const COLUMN_COUNT = 75;
const ROW_COUNT = 45;
let paused = false;

let game = document.getElementById("game-board");
let board = new Board(game, ROW_COUNT, COLUMN_COUNT);
let handler = new EventHandler(board, tick, pause);

// tick();
function tick () {
  board.update();
  board.render();
  setTimeout(() => {
    if (!paused) tick();
  }, 190);
  paused = false;
};

function pause () {
  paused = true;
}

// setInterval(() => {
//   board.update();
//   board.render();
// }, 190);






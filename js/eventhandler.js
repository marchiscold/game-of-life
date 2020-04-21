import { Controls } from "./controls.js";

export class EventHandler {
  constructor(board, game) {
    this._controls = new Controls(game, board);
    this._board = board;
    this._game = game;
    this._initListeners();
  }

  _initListeners() {
    document.addEventListener('mouseover', ev => {
      if (ev.target.matches('.cell')) {
        this._board.highlightCell(ev.target);
        if (ev.which == 1) {
          this._board.toggleCell(ev.target);
        }
      }
    });
    document.addEventListener('mouseout', ev => {
      if (ev.target.matches('.cell')) {
        this._board.revertHighlight(ev.target);
      }
    });
    document.addEventListener('click', ev => {
      if (ev.target.matches('.stop')) {
        this._controls.stop();
        return;
      }
      if (ev.target.matches('.run')) {
        this._controls.run();
        return;
      }
      if (ev.target.matches('#clear')) {
        this._controls.clear();
      }
      if (ev.target.matches('#step')) {
        this._controls.step();
      }
      if (ev.target.matches('#reset')) {
        this._controls.reset();
      }
    });
    document.addEventListener('mousedown', ev => {
      if (this._board.contains(ev.target)) {
        ev.preventDefault();
      }
      if (!ev.target.matches('.cell')) return;
      if (ev.which != 1) return;

      if (!this._game.isPaused()) {
        this._game.pauseForDrawing();
      }
      this._board.toggleCell(ev.target);
    })
    document.addEventListener('mouseup', ev => {
      this._game.resumeIfPausedForDrawing();
    })
  }
}
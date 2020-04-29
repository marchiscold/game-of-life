import { Controls } from "./controls.js";

export class EventHandler {
  constructor(board, game) {
    this._controls = new Controls(game, board);
    this._board = board;
    this._game = game;
    this._initListeners();
  }

  _initListeners() {
    $(document).on('change', '.game-patterns-select', ev => {
      this._controls.stop();
      this._board.drawPattern(ev.target.value);
    })
    $(document).on('input', '#range', ev => {
      this._controls.setGameSpeed(parseFloat(ev.target.value));
    });
    $(document).on('mouseover', '.cell', ev => {
      this._board.highlightWithPattern('glider', ev.target);
      this._board.highlightCell(ev.target);
      if (ev.which == 1) {
        this._board.toggleCell(ev.target);
      }
    });
    $(document).on('mouseout', '.cell',ev => {
      this._board.revertHighlight(ev.target);
      this._board.removePatternHighlight();
    });
    $(document).on('click', '.stop', ev => {
      this._controls.stop();
    });
    $(document).on('click', '.run', ev => {
      this._controls.run();
    });
    $(document).on('click', '#clear', ev => {
      this._controls.clear();
    });
    $(document).on('click', '#step', ev => {
      this._controls.step();
    });
    $(document).on('click', '#reset', ev => {
      this._controls.reset();
    });
    $(document).on('mousedown', ev => {
      if (this._board.contains(ev.target)) {
        ev.preventDefault();
      }
      if (!ev.target.matches('.cell')) return;
      if (ev.which != 1) return;

      if (!this._game.isPaused()) {
        this._game.pauseForDrawing();
      }
      this._board.toggleCell(ev.target);
    });
    $(document).on('mouseup', ev => {
      this._game.resumeIfPausedForDrawing();
    });
  }
}
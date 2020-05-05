import { Controls } from "./controls.js";
// import {PatternContainer} from "./pattern-container.js";


export class EventHandler {
  constructor(board, game, patternContainer) {
    this._controls = new Controls(game, board);
    this._board = board;
    this._game = game;
    this._patternContainer = patternContainer;
    this._initListeners();
  }

  _initListeners() {
    $(document).on('change', '.game-patterns-select', ev => {
      this._controls.stop();
      this._board.clear();
      this._board.drawPattern(ev.target.value);
    })
    $(document).on('input', '#range', ev => {
      this._controls.setGameSpeed(parseFloat(ev.target.value));
    });
    $(document).on('mouseover', '.cell', ev => {
      this._board.highlight(ev.target);
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
    $(document).on('click', '.pattern-button', ev => {
      this._board.setHighlightPattern(ev.target.dataset.name);
    });
    $(document).on('click', '.pattern-nav__button', ev => {
      $('.pattern-nav__button').removeClass('active');
      ev.target.classList.add('active');

      let selectors = this._patternContainer.getSelectors(ev.target.textContent);
      $('.pattern-list').empty()
                        .append(selectors);
    })
    $(document).on('mousedown', ev => {
      if (this._board.contains(ev.target)) {
        ev.preventDefault();
      }
    });
    $(document).on('mousedown', '.cell', ev => {
      if (ev.which != 1) return;

      if (!this._game.isPaused()) {
        this._game.pauseForDrawing();
      }
      this._board.onMouseDown(ev.target, ev.shiftKey);
    })
    $(document).on('mouseup', ev => {
      this._game.resumeIfPausedForDrawing();
    });
  }
}
export class EventHandler {
  constructor(board, tick, pause) {
    this._board = board;
    this._tick = tick;
    this._pause = pause;
    this._initListeners();
  }

  _initListeners() {
    document.addEventListener("mouseover", ev => {
      if (ev.target.matches('.cell')) {
        this._board.highlightCell(ev.target);
        if (ev.which == 1) {
          this._board.toggleCell(ev.target);
        }
      }
    });
    document.addEventListener("mouseout", ev => {
      if (ev.target.matches('.cell')) {
        this._board.revertHighlight(ev.target);
      }
    });
    document.addEventListener('click', ev => {
      if (ev.target.matches('.cell')) {
        this._board.toggleCell(ev.target);
      }
      if (ev.target.matches('#stop')) {
        this._pause();
      }
      if (ev.target.matches('#start')) {
        this._tick();
      }
    });
    document.addEventListener('mousedown', ev => {
      ev.preventDefault();
    })
  }
}
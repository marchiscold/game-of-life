export class Input {
  constructor(board) {
    this._board = board;
    this._initListeners();
  }

  _initListeners() {
    document.addEventListener("mouseover", ev => {
      if (ev.target.matches('.cell')) {
        this._board.highlightCell(ev.target);
      }
    })
    document.addEventListener("mouseout", ev => {
      if (ev.target.matches('.cell')) {
        this._board.revertHighlight(ev.target);
      }
    })
  }
}
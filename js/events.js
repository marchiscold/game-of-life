export class EventHandler {
  constructor(board) {
    this._board = board;
    this._initListeners();
  }

  _initListeners() {
    document.addEventListener("mouseover", ev => {
      if (ev.target.matches('.cell')) {
        this._board.highlightCell(ev.target);
        console.log(ev.which);
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
    });
    document.addEventListener('mousedown', ev => {
      ev.preventDefault();
    })
  }
}
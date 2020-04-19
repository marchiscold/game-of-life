export class EventHandler {
  constructor(board, game) {
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
        this._game.pause();
        ev.target.classList.add('run');
        ev.target.classList.remove('stop');
        ev.target.value = 'run';
        return;
      }
      if (ev.target.matches('.run')) {
        this._game.resume();
        ev.target.classList.add('stop');
        ev.target.classList.remove('run');
        ev.target.value = 'stop';
        return;
      }
      if (ev.target.matches('#clear')) {
        this._board.clear();
      }
      if (ev.target.matches('#step')) {
        this._game.pause();
        let toggleButton = document.getElementById('toggleGameLoop');
        toggleButton.classList.remove('stop');
        toggleButton.classList.add('run');
        toggleButton.value = 'run';
        this._game.step();
      }
    });
    document.addEventListener('mousedown', ev => {
      if (ev.target.matches('.cell')) {
        if (ev.which == 1) {
          if (!this._game.isPaused()) {
            this._game.pauseForDrawing();
          }
          this._board.toggleCell(ev.target);
        }
      }
      ev.preventDefault();
    })
    document.addEventListener('mouseup', ev => {
      this._game.resumeIfPausedForDrawing();
    })
  }
}
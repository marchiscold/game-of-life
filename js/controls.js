export class Controls {
  constructor(game, board) {
    this._game = game;
    this._board = board;
    this._gameToggle = document.getElementById('toggleGameLoop');
    this._step = document.getElementById('step');
    this._clear = document.getElementById('clear');
  }

  run() {
    this._game.resume();
    this._gameToggle.classList.add('stop');
    this._gameToggle.classList.remove('run');
    this._gameToggle.value = 'stop';
  }
  
  stop() {
    this._game.pause();
    this._gameToggle.classList.add('run');
    this._gameToggle.classList.remove('stop');
    this._gameToggle.value = 'run';
  }

  step() {
    this._game.pause();
    this._gameToggle.classList.remove('stop');
    this._gameToggle.classList.add('run');
    this._gameToggle.value = 'run';
    this._game.step();
  }

  clear() {
    this._board.clear();
  }
}
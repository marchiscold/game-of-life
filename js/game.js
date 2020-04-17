export class Game {
  constructor (board) {
    this._board = board;
    this._isPaused = false;
  }
  
  tick () {
    this._isPaused = false;
    this.step();
    setTimeout(() => {
      if (!this._isPaused) this.tick();
    }, 190);
  };
  
  pause () {
    this._isPaused = true;
  }

  step () {
    this._board.update();
    this._board.render();
  }

}
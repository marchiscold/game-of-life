export class Game {
  constructor (board) {
    this._board = board;
    this._isPaused = false;
    this._isRunning = false;
    this._isPausedForDrawing = false;
  }
  
  tick () {
    if (this._isRunning) return;
    this._isPaused = false;
    this._isRunning = true;
    this.step();
    setTimeout(() => {
      this._isRunning = false;
      if (!this._isPaused) this.tick();
    }, 190);
  };

  run () {
    setInterval(() => {
      this.tick();
    }, 190)
  }
  
  pause () {
    this._isPaused = true;
  }

  step () {
    this._board.update();
    this._board.render();
  }

  pauseForDrawing() {
    this._isPausedForDrawing = true;
    this.pause();
  }

  resumeIfPausedForDrawing() {
    if (this._isPausedForDrawing) {
      this._isPausedForDrawing = false;
      this.tick();  
    }
  }
}
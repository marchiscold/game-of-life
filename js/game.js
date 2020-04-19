export class Game {
  constructor (board) {
    this._board = board;
    this._isPaused = true;
    this._isRunning = false;
    this._isPausedForDrawing = false;
    this.run();
  }
  
  tick () {
    if (this._isPaused) return;
    this.step();
  };

  run () {
    setInterval(() => {
      this.tick();
    }, 190)
  }
  
  resume () {
    this._isPaused = false;
  }

  pause () {
    this._isPaused = true;
  }

  isPaused() {
    return this._isPaused;
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
      this._isPaused = false;
    }
  }
}
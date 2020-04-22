export class Game {
  constructor (board) {
    this._board = board;
    this._isPaused = true;
    this._isPausedForDrawing = false;
    this._genPerSecond = 5;
    this._run();
  }
  
  tick () {
    if (this._isPaused) return;
    this.step();
  };

  _run () {
    this.tick();
    setTimeout(() => {
      this._run();
    }, this._getDelayMillis());
  }

  _getDelayMillis() {
    return 1000 / this._genPerSecond;
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

  setSpeed(speed) {
    this._genPerSecond = speed;
  }
}
export class Pattern {
  constructor () {
    this._name = 'glider';
    this._patternArr = [[0, 0, 1],
                        [1, 0, 1],
                        [0, 1, 1]];
    this.offsetTop = 5;
    this.offsetLeft = 5;
    this.width = 3;
    this.height = 3;                      
  }

  isAlive(x, y) {
    return this._patternArr[x][y] == 1;
  }
}
export class Pattern {
  constructor (patternArr) {
    this._patternArr = patternArr;
    this.width = this._patternArr[0].length;
    this.height = this._patternArr.length;                      
    this.offsetTop = 25 - Math.round(this.height/2);
    this.offsetLeft = 33 - Math.round(this.width/2);
  }

  isAlive(row, col) {
    return this._patternArr[row][col] == 1;
  }
}
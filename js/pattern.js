export class Pattern {
  constructor (arr, name) {
    this.name = name;
    this.arr = arr;
    this.width = this.arr[0].length;
    this.height = this.arr.length;                      
  }

  isAlive(row, col) {
    return this.arr[row][col] == 1;
  }
}
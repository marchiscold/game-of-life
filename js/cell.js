export class Cell {
  constructor(row, col, state) {
    this._cellElement = document.createElement("div");
    this._state = state; // states: 'alive', 'dead'
    this._row = row;
    this._col = col;
    this._cellElement.className = "cell";
    this._cellElement.classList.add(state);
    this._toLive = null;
    this._toDie = null;
    if (state === "alive") {
      this._cellElement.innerHTML = this._randomChinese();
    } else {
      this._cellElement.innerHTML = "";
    }
  }

  render() {
    if (this._toLive) {
      this.setAlive();
    } else if (this._toDie) {
      this.setDead();
    }
    this._toLive = null;
    this._toDie = null;
  }

  setAlive() {
    this._cellElement.classList.add("alive");
    this._cellElement.classList.remove("dead");
    this._state = "alive";
    this._cellElement.innerHTML = this._randomChinese();
  }

  setDead() {
    this._cellElement.classList.add("dead");
    this._cellElement.classList.remove("alive");
    this._state = "dead";
    this._cellElement.innerHTML = "";
  }

  getRow() {
    return this._row;
  }

  getCol() {
    return this._col;
  }

  getCellElement () {
    return this._cellElement;
  }

  isDead() {
    return this._state === 'dead';
  }

  isAlive() {
    return this._state === 'alive';
  }

  markAlive() {
    this._toLive = true;
  }

  markDead() {
    this._toDie = true;
  }

  _randomChinese () {
    let chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    let index =  Math.floor(Math.random() * chinese.length);
    return chinese[index];
  }
}
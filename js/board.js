import {Cell} from './cell.js';

export class Board {
  constructor(gameElement, rowCount, colCount) {
    this._gameElement = gameElement;
    this._rows = rowCount;
    this._cols = colCount;
    [this._cellArr, this._cellMap] = this._createDOMCells();
    this._initDOMBoard(this._gameElement);
  }

  update() {
    this._cellMap.forEach(cell => {
      this._markCells(this._aliveNeighbors(cell), cell);
    });
  }

  render() {
    this._cellMap.forEach(cell => {
      cell.render();
    })
  }

  highlightCell(cellElem) {
    cellElem.classList.add('highlight');
  }

  revertHighlight(cellElem) {
    cellElem.classList.remove('highlight');
  }

  toggleCell(cellElem) {
    let cell = this._cellMap.get(cellElem);
    cell.isAlive() ? cell.setDead() : cell.setAlive();
  }

  clear() {
    this._cellMap.forEach(cell => {
      cell.setDead();
    })
  }

  populate() {
    this._cellMap.forEach((cell) => {
      Math.random() > 0.83 ? cell.setAlive() : cell.setDead();
    });
  }

  contains(cellElem) {
    return this._gameElement.contains(cellElem);
  }

  _aliveNeighbors(cell) {
    let row = cell.getRow();
    let col = cell.getCol();
    let aliveNeighbors = 0;

    [
      [-1, -1], [-1, 0], [-1, 1],
      [ 0, -1],          [ 0, 1],
      [ 1, -1], [ 1, 0], [ 1, 1]
    ].forEach(offset => {
      let tempRow = row + offset[0];
      if (tempRow < 0) {
        tempRow = this._rows - 1;
      } else if (tempRow >= this._rows) {
        tempRow = 0;
      }

      let tempCol = col + offset[1];
      if (tempCol < 0) {
        tempCol = this._cols - 1;
      } else if (tempCol >= this._cols) {
        tempCol = 0;
      }
      aliveNeighbors += this._cellArr[tempRow][tempCol].isAlive() ? 1 : 0;
    });
    return aliveNeighbors;
  }

  _markCells (aliveNum, cell) {
    if (aliveNum === 3 && cell.isDead()) {
      cell.markAlive();
    } else if (aliveNum < 2 || aliveNum > 3) {
      cell.markDead();
    }
  }

  _createDOMCells () {
    let cellArr = [];
    let cellMap = new Map();
    for (let row = 0; row < this._rows; row++) {
      cellArr[row] = [];
      for (let col = 0; col < this._cols; col++) {
        let state = Math.random() > 0.83 ? "alive" : "dead";
        let cell = new Cell(row, col, state)
        cellArr[row][col] = cell;
        cellMap.set(cell.getCellElement(), cell);
      }
    }
    return [cellArr, cellMap];
  }

  _initDOMBoard(gameElement) {
    let rows = this._makeRows();
    rows.forEach((row, rowIndex) => {
      for (let colIndex = 0; colIndex < this._cols; colIndex++) {
        row.append(this._cellArr[rowIndex][colIndex].getCellElement());
      }
    });

    gameElement.append(...rows);
  }

  _makeRows() {
    let rows = [];
    let row = document.createElement("div");
    row.className = "row";

    for (let i = 0; i < this._rows; i++) {
      rows.push(row.cloneNode(false));
    }
    return rows;
  }
}
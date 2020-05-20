import {Board} from './board.js';

export class GameBoard extends Board {
  constructor(gameElement, rowCount, colCount, patternService) {
    super();
    this._gameElement = gameElement;
    this._rows = rowCount;
    this._cols = colCount;
    [this._cellArr, this._cellMap] = this._createDOMCells();
    this._patterns = patternService;
    this._highlightPattern = '';
    this._highlightedCells = [];

    super._initDOMBoard(this._gameElement);
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

  setHighlightPattern(patternName) {
    this._highlightPattern = patternName;
  }

  removeHighlightPattern() {
    this._highlightPattern = '';
  }

  onMouseDown(cellElem, shiftKey) {
    if (this._highlightPattern != '') {
      let offsetTop = this._cellMap.get(cellElem).getRow();
      let offsetLeft = this._cellMap.get(cellElem).getCol();
      this.drawPattern(this._highlightPattern, offsetTop, offsetLeft);
      if (!shiftKey) {
        this.removePatternHighlight();
        this._highlightPattern = '';
      }
    } else {
      this.toggleCell(cellElem);
    }
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

  highlight(cellElem) {
    if (this._highlightPattern != '') {
      this.highlightWithPattern(this._highlightPattern, cellElem);
    } else {
      this.highlightCell(cellElem);
    }
  }

  highlightWithPattern(patternName, cellElem) {
    let cell = this._cellMap.get(cellElem);
    let offsetTop = cell.getRow();
    let offsetLeft = cell.getCol();
    let pattern = this._patterns.getPattern(patternName);

    for (let row = 0; row < pattern.height; row++) {
      for (let col = 0; col < pattern.width; col++) {
        let gameRow = row + offsetTop;
        if (gameRow >= this._rows) {
          gameRow = gameRow - this._rows;
        }
        let gameCol = col + offsetLeft;
        if (gameCol >= this._cols) {
          gameCol = gameCol - this._cols;
        }
        let cell = this._cellArr[gameRow][gameCol];
        if (pattern.arr[row][col]) {
          this._highlightedCells.push(cell);
        }
      }
    }
    this._renderHighlights();
  }

  removePatternHighlight() {
    this._highlightedCells.forEach(cell => {
      cell.removeHighlight();
    })
    this._highlightedCells = [];
  }

  _renderHighlights() {
    this._highlightedCells.forEach(cell => {
      cell.addHighlight();
    })
  }

  drawPattern(patternName, top, left) {
    let pattern = this._patterns.getPattern(patternName);
    let offsetTop = top != undefined ? top : parseInt(this._rows/2);
    let offsetLeft = left != undefined ? left : parseInt(this._cols/2);
    for (let row = 0; row < pattern.height; row++) {
      for (let col = 0; col < pattern.width; col++) {
        let gameRow = row + offsetTop;
        if (gameRow >= this._rows) {
          gameRow = gameRow - this._rows;
        }
        let gameCol = col + offsetLeft;
        if (gameCol >= this._cols) {
          gameCol = gameCol - this._cols;
        }
        let cell = this._cellArr[gameRow][gameCol];
        if (pattern.arr[row][col]) {
          cell.setAlive();
        }
      }
    }
  }

  drawCenteredPattern(patternName) {
    let pattern = this._patterns.getPattern(patternName);
    let offsetTop = Math.floor((this._rows - pattern.height)/2);
    let offsetLeft = Math.floor((this._cols - pattern.width)/2);
    this.drawPattern(patternName, offsetTop, offsetLeft);
  }
}
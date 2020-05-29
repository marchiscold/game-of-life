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
    this._rotations = 0;

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
    this._rotations = 0;
    this._highlightPattern = patternName;
  }

  removeHighlightPattern() {
    this._highlightPattern = '';
    this._rotations = 0;
    this.removePatternHighlight();
  }

  removePatternHighlight() {
    this._highlightedCells.forEach(cell => {
      cell.removeHighlight();
    })
    this._highlightedCells = [];
  }

  onMouseDown(cellElem, shiftKey) {
    if (this._highlightPattern != '') {
      let offsetTop = this._cellMap.get(cellElem).getRow();
      let offsetLeft = this._cellMap.get(cellElem).getCol();
      this.drawPattern(this._highlightPattern, offsetTop, offsetLeft);
      if (!shiftKey) {
        this.removeHighlightPattern();
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
      this._highlightWithPattern(this._highlightPattern, cellElem);
    } else {
      this.highlightCell(cellElem);
    }
  }

  _renderHighlights() {
    this._highlightedCells.forEach(cell => {
      cell.addHighlight();
    })
  }

  rotateHighlight() {
    if (this._highlightPattern != '') {
      this._rotations < 3 ? this._rotations++ : this._rotations = 0;
    }
    console.log(this._rotations);
  }

  _rotatePattern(pattern) {
    let patternCopy = JSON.parse(JSON.stringify(pattern));

    function rotateArray(arr) {
      let copy = [];
      for (let arrCol = 0; arrCol < arr[0].length; arrCol++) {
        copy[arrCol] = [];
        for (let arrRow = 0; arrRow < arr.length; arrRow++) {
          copy[arrCol].push(arr[arr.length - 1 - arrRow][arrCol]);
        }
      }
      return copy;
    }

    for (let i = 0; i < this._rotations; i++) {
      patternCopy.arr = rotateArray(patternCopy.arr);
      [patternCopy.width, patternCopy.height] = [patternCopy.height, patternCopy.width];
    }
    return patternCopy;
  }

  _highlightWithPattern(patternName, cellElem) {
    let cell = this._cellMap.get(cellElem);
    let pattern = this._patterns.getPattern(patternName);
    pattern = this._rotatePattern(pattern);
    let offsetTop = cell.getRow();
    let offsetLeft = cell.getCol();

    for (let row = 0; row < pattern.height; row++) {
      for (let col = 0; col < pattern.width; col++) {
        let gameRow = row + offsetTop - Math.floor(pattern.height/2);
        if (gameRow >= this._rows) {
          gameRow = gameRow - this._rows;
        } else if (gameRow < 0) {
          gameRow = gameRow + this._rows;
        }

        let gameCol = col + offsetLeft - Math.floor(pattern.width/2);
        if (gameCol >= this._cols) {
          gameCol = gameCol - this._cols;
        } else if (gameCol < 0) {
          gameCol = gameCol + this._cols;
        }
        let cell = this._cellArr[gameRow][gameCol];
        if (pattern.arr[row][col]) {
          this._highlightedCells.push(cell);
        }
      }
    }
    this._renderHighlights();
  }

  drawPattern(patternName, top, left) {
    let pattern = this._patterns.getPattern(patternName);
    pattern = this._rotatePattern(pattern);
    let offsetTop = top != undefined ? top : parseInt(this._rows/2);
    let offsetLeft = left != undefined ? left : parseInt(this._cols/2);

    for (let row = 0; row < pattern.height; row++) {
      for (let col = 0; col < pattern.width; col++) {
        let gameRow = row + offsetTop - Math.floor(pattern.height/2);
        if (gameRow >= this._rows) {
          gameRow = gameRow - this._rows;
        } else if (gameRow < 0) {
          gameRow = gameRow + this._rows;
        }

        let gameCol = col + offsetLeft - Math.floor(pattern.width/2);
        if (gameCol >= this._cols) {
          gameCol = gameCol - this._cols;
        } else if (gameCol < 0) {
          gameCol = gameCol + this._cols;
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
    let offsetTop = Math.floor(this._rows/2);
    let offsetLeft = Math.floor(this._cols/2);
    this.drawPattern(patternName, offsetTop, offsetLeft);
  }
}
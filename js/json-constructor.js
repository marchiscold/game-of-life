import { Pattern } from "./pattern.js";

export class JsonConstructor {
  constructor (patterns) {
    this._patterns = patterns;
    this._currentPage = 'static';
    this._patternId = 'placeholder';
    this._patternName = 'placeholder';
    this._rows = 4;
    this._cols = 4;
    this._$constructorContainer = $('#constructor__canvas');
    this._cellArr = this._initCellArr(this._rows, this._cols);
    this._createConstructor(this._rows, this._cols);
  }

  appendPattern() {
    let arr = JSON.parse(JSON.stringify(this._cellArr));
    let patternId = new Pattern(arr, this._patternName);
    this._patterns[this._currentPage][this._patternId] = patternId;
    this.setPage(this._currentPage);
  }

  setPage(pageName) {
    this._currentPage = pageName;
    let patterns = this._patterns[pageName];
    $('#constructor__json-text').text(JSON.stringify(patterns));
  }

  setPatternId(id) {
    this._patternId = id;
  }

  setPatternName(name) {
    this._patternName = name;
  }

  changeRowsTo(rowCount) {
    this._rows = rowCount;
    this._cellArr = this._initCellArr(this._rows, this._cols);
    this._createConstructor(this._rows, this._cols);
  }

  changeColumnsTo(colCount) {
    this._cols = colCount;
    this._cellArr = this._initCellArr(this._rows, this._cols);
    this._createConstructor(this._rows, this._cols);
  }

  toggleCell(cellElem) {
    let row = cellElem.dataset.row;
    let col = cellElem.dataset.col;
    this._cellArr[row][col] = this._cellArr[row][col] ? 0 : 1;
    cellElem.classList.toggle('constructor__cell--alive');
  }

  _createConstructor(rowCount, colCount) {
    this._$constructorContainer.empty();
    let $wrapper = $('<div>', {'class': 'cell-wrapper'});
    let rows = [];
    for (let row = 0; row < rowCount; row++) {
      rows.push($('<div>', {'class': 'row'}));
      for (let col = 0; col < colCount; col++) {
        let $cell = $('<div>', {'class': 'constructor__cell',
                                'data-row': row,
                                'data-col': col});
        rows[row].append($cell);
      }
    }
    $wrapper.append(rows);
    this._$constructorContainer.append($wrapper);
  }

  _initCellArr(rowCount, colCount) {
    let arr = [];
    for (let row = 0; row < rowCount; row++) {
      arr.push([]);
      for (let col = 0; col < colCount; col++) {
        arr[row][col] = 0;
      }
    }
    return arr;
  }

}
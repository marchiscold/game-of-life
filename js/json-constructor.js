import { Pattern } from "./pattern.js";

export class JsonConstructor {
  constructor (patterns) {
    this._patterns = patterns;
    this._currentPage = 'static';
    this._$constructorContainer = $('#constructor__canvas');
    this._cellArr = this._initCellArr();
    this._createConstructor();
    setTimeout(() => {
      this.appendPattern();
    }, 2000)
  }

  appendPattern() {
    let patternId = new Pattern(this._cellArr, 'my awesome pattern name');
    this._patterns[this._currentPage][patternId] = patternId;
    this.setPage(this._currentPage);
  }

  setPage(pageName) {
    this._currentPage = pageName;
    let patterns = this._patterns[pageName]
    $('#constructor__json-text').text(JSON.stringify(patterns));
  }

  toggleCell(cellElem) {
    let row = cellElem.dataset.row;
    let col = cellElem.dataset.col;
    this._cellArr[row][col] = this._cellArr[row][col] ? 0 : 1;
    cellElem.classList.toggle('constructor__cell--alive');
  }

  _createConstructor(rowCount = 4, colCount = 4) {
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

  _initCellArr(rowCount = 4, colCount = 4) {
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
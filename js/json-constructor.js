export class JsonConstructor {
  constructor (patterns) {
    this._rows = 4;
    this._cols = 4;
    // this._cellMap = new Map();
    this._$constructorContainer = $('#constructor__canvas');
    this._initConstructor();
  }

  setPage(patterns) {
    $('#constructor__json-text').text(JSON.stringify(patterns));
  }

  toggleCell(cellElem) {
    cellElem.classList.toggle('constructor__cell--alive');
  }

  _initConstructor() {
    let $wrapper = $('<div>', {'class': 'cell-wrapper'});
    let rows = [];
    for (let row = 0; row < this._rows; row++) {
      rows.push($('<div>', {'class': 'row'}));
      for (let col = 0; col < this._cols; col++) {
        let $cell = $('<div>', {'class': 'constructor__cell',
                                'data-row': row,
                                'data-col': col});
        rows[row].append($cell);
      }
    }
    $wrapper.append(rows);
    this._$constructorContainer.append($wrapper);
  }

}
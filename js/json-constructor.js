export class JsonConstructor {
  constructor (patterns) {
    this._rows = 4;
    this._cols = 4;

    this._initConstructor();
  }

  setPage(patterns) {
    $('#constructor__json-text').text(JSON.stringify(patterns));
  }

  _initConstructor() {

  }
}
import { Pattern } from './pattern.js'

export class PatternCollection {
  constructor (patternService) {
    this._patternURLs = ['/json/spaceships.json',
                         '/json/static.json'];
    this._patternMap = new Map();
    this._allPatterns = {};
    (async () => {
      this.spaceships = await this._loadCollection('/json/spaceships.json');
      this.static = await this._loadCollection('/json/static.json');
      this.oscillators = await this._loadCollection('/json/oscillators.json');
      this.dropdown = await this._loadCollection('/json/dropdown.json');
      Object.assign(this._allPatterns, this.spaceships,
                                       this.static,
                                       this.oscillators,
                                       this.dropdown);
      patternService._initPages();
    })();
  }

  async _loadCollection(url) {
    let response = await fetch(url);
    return await response.json();
  }

  get(patternName) {
    return this._allPatterns[patternName];
  }
}
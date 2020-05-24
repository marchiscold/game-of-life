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
      this.dropdowns = await this._loadCollection('/json/dropdown.json');
      Object.assign(this._allPatterns, this.spaceships,
                                       this.static,
                                       this.oscillators,
                                       this.dropdowns);
      patternService.initPages();
      patternService.initDropdown();
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
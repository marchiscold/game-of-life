import { Pattern } from "./pattern.js";

export class PatternCollection {
  constructor (patternService) {
    this._patternURLs = ['/json/spaceships.json',
                         '/json/static.json'];
    this._patternMap = new Map();
    this._allPatterns = {};
    this._initCollection();
    (async () => {
      this.spaceships = await this._loadCollection('/json/spaceships.json');
      this.static = await this._loadCollection('/json/static.json');
      this.oscillators = await this._loadCollection('/json/oscillators.json');
      Object.assign(this._allPatterns, this.spaceships,
                                       this.static,
                                       this.oscillators);
      patternService._initPages();
      console.log(this._allPatterns);
      console.log(this._patternMap.entries());
    })();
  }

  async _loadCollection(url) {
    let response = await fetch(url);
    return await response.json();
  }

  get(patternName) {
    // return this._patternMap.get(patternName);
    return this._allPatterns[patternName];
  }

  _initCollection() {
    let glider = [[0, 0, 1],
                  [1, 0, 1],
                  [0, 1, 1]];
    this._patternMap.set('glider', new Pattern(glider, 'glider'));

    let lwss = [[0, 0, 0, 1, 0],
                [0, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [0, 1, 1, 1, 1]];
    this._patternMap.set('lwss', new Pattern(lwss));
    
    let mwss = [[0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1],
                [0, 1, 1, 1, 1, 1]];
    this._patternMap.set('mwss', new Pattern(mwss));

    let hwss = [[0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 1],
                [0, 1, 1, 1, 1, 1, 1]];
    this._patternMap.set('hwss', new Pattern(hwss));

    let block = [[1, 1],
                 [1, 1]];
    this._patternMap.set('block', new Pattern(block));

    let beehive = [[0, 1, 1, 0],
                   [1, 0, 0, 1],
                   [0, 1, 1, 0]];
    this._patternMap.set('beehive', new Pattern(beehive));

    let blinker = [[1],
                   [1],
                   [1]];
    this._patternMap.set('blinker', new Pattern(blinker));

    let beacon = [[1, 1, 0, 0],
                  [1, 1, 0, 0],
                  [0, 0, 1, 1],
                  [0, 0, 1, 1]];
    this._patternMap.set('beacon', new Pattern(beacon));

    // let obj = {};
    // obj.blinker = new Pattern(blinker, 'blinker');
    // obj.beacon = new Pattern(beacon, 'beacon');
    // console.log(JSON.stringify(obj));
  }
}
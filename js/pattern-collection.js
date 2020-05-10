import { Pattern } from "./pattern.js";

export class PatternCollection {
  constructor () {
    this._patternURLs = ['/json/spaceships.json',
                         '/json/static.json'];
    this._patternMap = new Map();
    this._allPatterns = {};
    this._initCollection();
  }

  get(patternName) {
    return this._patternMap.get(patternName);
  }

  _initCollection() {
    (async () => {
      let response = await fetch('/json/spaceships.json');
      this.spaceships = await response.json();
      Object.assign(this._allPatterns, this.spaceships);
      console.log(this.spaceships);
      console.log(this._allPatterns);
    })();

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

    
    // let obj = {};
    // obj.glider = new Pattern(glider, 'glider');
    // obj.lwss = new Pattern(lwss, 'light weight spaceship');
    // obj.mwss = new Pattern(mwss, 'middle weight spaceship');
    // obj.hwss = new Pattern(hwss, 'heavyweight spaceship');
    // console.log(JSON.stringify(obj));

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
  }
}
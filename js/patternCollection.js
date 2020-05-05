import { Pattern } from "./pattern.js";

export class PatternCollection {
  constructor () {
    this._patternMap = new Map();
    this._initCollection();
  }

  get(patternName) {
    return this._patternMap.get(patternName);
  }

  _initCollection() {
    let glider = [[0, 0, 1],
                  [1, 0, 1],
                  [0, 1, 1]];
    this._patternMap.set('glider', new Pattern(glider));

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
  }
}
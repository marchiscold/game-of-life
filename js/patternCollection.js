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
  }
}
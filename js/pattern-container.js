export class PatternContainer {
  constructor () {
    this._selectors = new Map();
    this._initPages();
  }

  getSelectors (patternType) {
    return this._selectors.get(patternType);
  }

  _initPages () {
    this._selectors.set('spaceships', this._createSpaceships());
    this._selectors.set('static', this._createStatic());
    this._selectors.set('oscillators', this._createOscillators());
  }

  _createSpaceships() {
    let spaceships = [];
    spaceships.push($('<div class="pattern"><input class="pattern-button" type="button" value="glider" data-name="glider"></div>')[0]);
    spaceships.push($('<div class="pattern"><input class="pattern-button" type="button" value="spaceship" data-name="lwss"></div>')[0]);
    return spaceships;
  }

  _createStatic() {
    let staticLife = [];
    staticLife.push($('<div class="pattern"><input class="pattern-button" type="button" value="block" data-name="block"></div>')[0]);
    staticLife.push($('<div class="pattern"><input class="pattern-button" type="button" value="beehive" data-name="beehive"></div>')[0]);
    return staticLife;
  }

  _createOscillators () {
    let oscillators = [];
    oscillators.push($('<div class="pattern"><input class="pattern-button" type="button" value="blinker" data-name="blinker"></div>')[0]);
    oscillators.push($('<div class="pattern"><input class="pattern-button" type="button" value="beacon" data-name="beacon"></div>')[0]);
    return oscillators;
  }
}
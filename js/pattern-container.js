import { PatternSelector } from "./pattern-selector.js";

export class PatternContainer {
  constructor (patterns) {
    this._patterns = patterns;
    this._selectors = new Map();
    this._initPages();
    this._initActivePage();
  }

  selectPage(pageTab) {
    $('.pattern-nav__button').removeClass('active');
    pageTab.classList.add('active');
    $('.pattern-list').empty()
                      .append(this._selectors.get(pageTab.textContent));
  }

  _getSelectors (patternType) {
    return this._selectors.get(patternType);
  }

  _initActivePage() {
    let selectorsName = $('.pattern-nav__button.active').text();
    $('.pattern-list').append(this._getSelectors(selectorsName));
  }

  _initPages () {
    this._selectors.set('spaceships', this._createSpaceships());
    this._selectors.set('static', this._createStatic());
    this._selectors.set('oscillators', this._createOscillators());
  }

  _createSpaceships() {
    let spaceships = [];
    // spaceships.push(new PatternSelector(patterns.get('glider'));
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
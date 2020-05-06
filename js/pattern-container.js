import { PatternSelector } from "./pattern-selector.js";

export class PatternService {
  constructor (patterns) {
    this._patterns = patterns;
    this._selectors = new Map();
    this._initPages();
    this._initActivePage();
  }

  getPattern(patternName) {
    return this._patterns.get(patternName);
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

  _createPatternButton(buttonName, patternName) {
    return $(`<div class="pattern">
                <input class="pattern-button" 
                       type="button" 
                       value="${buttonName}" 
                       data-name="${patternName}">
              </div>`)[0];
  }

  _createSpaceships() {
    let spaceships = [];
    // spaceships.push(new PatternSelector(patterns.get('glider'));
    spaceships.push(this._createPatternButton('glider', 'glider'));
    spaceships.push(this._createPatternButton('spaceship', 'lwss'));
    return spaceships;
  }

  _createStatic() {
    let staticLife = [];
    staticLife.push(this._createPatternButton('block', 'block'));
    staticLife.push(this._createPatternButton('beehive', 'beehive'));
    return staticLife;
  }

  _createOscillators () {
    let oscillators = [];
    oscillators.push(this._createPatternButton('blinker', 'blinker'));
    oscillators.push(this._createPatternButton('beacon', 'beacon'));
    return oscillators;
  }
}
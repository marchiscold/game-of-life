import { PatternSelector } from "./pattern-selector.js";
import {PatternCollection} from "./pattern-collection.js";

export class PatternService {
  constructor () {
    this._patterns = new PatternCollection();
    this._selectors = new Map();
    this._initPages();
    this._initActivePage();
    $('.pattern-list').append(this._createButton('smth', 'glider'));
  }

  getPattern(patternName) {
    return this._patterns.get(patternName);
  }

  selectPage(tabElem) {
    $('.pattern-nav__button').removeClass('active');
    tabElem.classList.add('active');
    $('.pattern-list').empty()
                      .append(this._selectors.get(tabElem.textContent));
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
  
  _createPatternButton(buttonName, patternName) {
    
    return $(`<div class="pattern">
                <input class="pattern-button" 
                       type="button" 
                       value="${buttonName}" 
                       data-name="${patternName}">
              </div>`)[0];
  }

  _createButton(buttonName, patternName) {
    let wrapper = $('<div>', {'class': 'pattern-selector'});
    // wrapper.text('hello');
    let pattern = this._patterns.get(patternName);
    let rowCount = pattern.height;
    let colCount = pattern.width;
    let rows = this._makeRows(rowCount);
    rows.forEach(row => {
      for (let i = 0; i < colCount; i++) {
        row.append($('<div>', {'class': 'button-cell'}));
      }
    });
    wrapper.append(rows);
    return wrapper;
  }

  _makeRows (rowCount) {
    let rows = [];
    for (let i = 0; i < rowCount; i++) {
      rows.push($('<div>', {'class': 'row'}));
    }
    return rows;
  }
}
import { PatternSelector } from "./pattern-selector.js";
import {PatternCollection} from "./pattern-collection.js";

export class PatternService {
  constructor () {
    this._patterns = new PatternCollection();
    this._selectors = new Map();
    this._initPages();
    this._initActivePage();
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
  
  // _createPatternButton(buttonName, patternName) {
    
  //   return $(`<div class="pattern">
  //               <input class="pattern-button" 
  //                      type="button" 
  //                      value="${buttonName}" 
  //                      data-name="${patternName}">
  //             </div>`)[0];
  // }

  _createPatternButton(buttonName, patternName) {
    let cellWidth = 12;
    let wrapper = $('<div>', {'class': 'pattern-selector',
                              'data-name' : patternName});
    let pattern = this._patterns.get(patternName);
    let rowCount = pattern.height;
    let colCount = pattern.width;
    let rows = [];
    for (let row = 0; row < rowCount; row++) {
      rows.push($('<div>', {'class': 'row'}));
      for (let col = 0; col < colCount; col++) {
        let $cell = $('<div>', {'class': 'button-cell'});
        $cell.css({width: cellWidth,
                   height: cellWidth});
        $cell.text(pattern.isAlive(row, col) ? this._randomChinese() : '');
        rows[row].append($cell);
      }
    }
    wrapper.css({width: colCount*cellWidth + 20 + 'px',
                 height: rowCount*cellWidth + 20 + 'px'});
    wrapper.append(rows);
    return wrapper;
  }

  _randomChinese () {
    let chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    let index =  Math.floor(Math.random() * chinese.length);
    return chinese[index];
  }

}
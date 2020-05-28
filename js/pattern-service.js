import {PatternCollection} from "./pattern-collection.js";
import { JsonConstructor } from "./json-constructor.js";

export class PatternService {
  constructor () {
    this._patterns = new PatternCollection(this);
    this.jsonConstructor = new JsonConstructor(this._patterns);
    this._selectorPages = new Map();
    this._previewCache = new Map();
  }

  getPattern(patternName) {
    return this._patterns.get(patternName);
  }

  selectPage(tabElem) {
    $('.pattern-nav__button').removeClass('active');
    tabElem.classList.add('active');
    $('.pattern-list').empty()
                      .append(this._selectorPages.get(tabElem.dataset.pageName));
  }

  _initActivePage() {
    let tabElem = $('.pattern-nav__button.active')[0];
    this.selectPage(tabElem);
  }

  initPages () {
    this._selectorPages.set('spaceships', this._createPageButtons('spaceships'));
    this._selectorPages.set('static', this._createPageButtons('static'));
    this._selectorPages.set('oscillators', this._createPageButtons('oscillators'));
    this._initActivePage();
  }

  initDropdown() {
    let dropdowns = this._patterns.dropdowns;
    let elements = [];
    for (const patternId of Object.keys(dropdowns)) {
      elements.push(this._createDropdownElement(patternId, dropdowns[patternId]));
    }
    $('.dropdown__list').prepend(elements);
  }

  generatePreviewOf (patternName) {
    $('.dropdown__preview').empty();
    if (this._previewCache.has(patternName)) {
      $('.dropdown__preview').append(this._previewCache.get(patternName));
      return;
    }
    let cellWidth = 12;
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
        $cell.text(pattern.arr[row][col] ? this._randomChinese() : '');
        rows[row].append($cell);
      }
    }
    this._previewCache.set(patternName, rows);
    $('.dropdown__preview').append(rows);
  }

  _createDropdownElement(patternId, pattern) {
    let $dropdownItem = $('<div>', {'class': 'dropdown__item',
                                    'data-name': patternId});
    let $text = $('<span>' + pattern.name + '</span>');
    let $icon = $('<i class="fas fa-mouse"></i>');
    $dropdownItem.append($text, $icon);
    return  $dropdownItem;                                   
  }

  _createPageButtons(pageName) {
    let buttonList = [];
    for (const [patternId, pattern] of Object.entries(this._patterns[pageName])) {
      buttonList.push(this._createPatternButton(pattern.name, patternId))
    }
    return buttonList;
  }

  _createPatternButton(buttonName, patternId) {
    let cellWidth = 12;
    let wrapper = $('<div>', {'class': 'pattern-selector',
                              'data-name' : patternId});
    let pattern = this._patterns.get(patternId);
    let rowCount = pattern.height;
    let colCount = pattern.width;
    let rows = [];
    for (let row = 0; row < rowCount; row++) {
      rows.push($('<div>', {'class': 'row'}));
      for (let col = 0; col < colCount; col++) {
        let $cell = $('<div>', {'class': 'button-cell'});
        $cell.css({width: cellWidth,
                   height: cellWidth});
        $cell.text(pattern.arr[row][col] ? this._randomChinese() : '');
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
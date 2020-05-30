import { Controls } from "./controls.js";

export class EventHandler {
  constructor(board, game, patternService) {
    this._controls = new Controls(game, board);
    this._board = board;
    this._game = game;
    this._patternService = patternService;
    this._initGameControls();
    this._initSidebarPatterns();
    this._initJsonConstructor();
    this._initDropdown();
    this._initListeners();
  }

  _initGameControls() {
    $(document).on('click', '.stop', ev => {
      this._controls.stop();
    });
    $(document).on('click', '.run', ev => {
      this._controls.run();
    });
    $(document).on('click', '#clear', ev => {
      this._controls.clear();
    });
    $(document).on('click', '#step', ev => {
      this._controls.step();
    });
    $(document).on('click', '#reset', ev => {
      this._controls.reset();
    });
    $(document).on('input', '#range', ev => {
      this._controls.setGameSpeed(parseFloat(ev.target.value));
    });
  }

  _initSidebarPatterns() {
    $(document).one('click', '.pattern-selector', ev => {
      $(ev.target.closest('.pattern-selector'))
      .notify('press wheel button to rotate element', {position: 'top left',
                                                       className: 'info',
                                                       showDuration: 100,
                                                       style: 'happyblue',
                                                       autoHideDelay: 8000});
      // $(ev.target.closest('.pattern-selector')).notify('hold shift to insert multiple elements', 'info');
    });
    $(document).on('click', '.pattern-selector', ev => {
      if ($(ev.currentTarget).hasClass('selected')) {
        this._board.removeHighlightPattern();
        $(ev.currentTarget).removeClass('selected');
      } else {
        $('.pattern-selector').removeClass('selected');
        this._board.setHighlightPattern(ev.currentTarget.dataset.name);
        $(ev.currentTarget).addClass('selected');
      }
    });
    $(document).on('click', '.pattern-nav__button', ev => {
      $('.pattern-selector').removeClass('selected');
      this._board.removeHighlightPattern();
      this._patternService.selectPage(ev.target);
    });
    $(document).on('mousedown', '.button-cell', ev => {
      ev.preventDefault();
    });
  }

  _initJsonConstructor() {
    let jsonConstructor = this._patternService.jsonConstructor;
    $('.json-select').on('change', ev => {
      jsonConstructor.setPage(ev.target.value);
    })
    $(document).on('click', '.constructor__cell', ev => {
      jsonConstructor.toggleCell(ev.target);
    });
    $('#pattern-id').on('input', ev => {
      jsonConstructor.setPatternId(ev.target.value);
    })
    $('#pattern-name').on('input', ev => {
      jsonConstructor.setPatternName(ev.target.value);
    })
    $('#append').click(ev => {
      jsonConstructor.appendPattern();
    })
    $('#row').on('input', ev => {
      jsonConstructor.changeRowsTo(ev.target.value);
    })
    $('#col').on('input', ev => {
      jsonConstructor.changeColumnsTo(ev.target.value);
    })
  }

  _initDropdown() {
    $(document).on('click', '.dropdown__item', ev => {
      let patternName = ev.target.closest('.dropdown__item').dataset.name;
      $('.dropdown__btn span').text($(ev.target).closest('.dropdown__item')
                                                .find('span')
                                                .text());
      $('.dropdown__list').hide();

      if (ev.target.matches('i')) {
        this._board.setHighlightPattern(patternName);
      } else {
        this._controls.stop();
        this._board.clear();
        this._board.drawCenteredPattern(patternName);
      }
    });
    $(document).on('mouseenter', '.dropdown__item', ev => {
      let patternName = ev.target.closest('.dropdown__item').dataset.name;
      this._patternService.generatePreviewOf(patternName);
    });
    $('.dropdown').on('mouseenter', ev => {
      $('.dropdown__list').show();
    })
  }

  _initListeners() {
    $(document).on('change', '.game-patterns-select', ev => {
      this._controls.stop();
      this._board.clear();
      this._board.drawCenteredPattern(ev.target.value);
    });

    $(document).on('mouseover', '.cell', ev => {
      this._board.highlight(ev.target);
      if (ev.which == 1) {
        this._board.toggleCell(ev.target);
      }
    });
    $(document).on('mouseout', '.cell',ev => {
      this._board.revertHighlight(ev.target);
      this._board.removePatternHighlight();
    });
    $(document).on('mousedown', ev => {
      if (this._board.contains(ev.target)) {
        ev.preventDefault();
      }
    });
    $(document).on('mousedown', '.cell', ev => {
      if (ev.which != 2) return;
      this._board.rotateHighlight();
      this._board.removePatternHighlight();
      this._board.highlight(ev.target);
    });
    $(document).on('mousedown', '.cell', ev => {
      if (ev.which != 1) return;

      if (!ev.shiftKey) {
        $('.pattern-selector').removeClass('selected');
      }
      if (!this._game.isPaused()) {
        this._game.pauseForDrawing();
      }
      this._board.onMouseDown(ev.target, ev.shiftKey);
    });
    $(document).on('mouseup', ev => {
      this._game.resumeIfPausedForDrawing();
    });
    $(document).on('contextmenu', ev => {
      if (ev.target.closest('#game-board')) {
        ev.preventDefault();
      }
    });
    $(document).on('keydown', ev => {
      if (ev.code == 'Escape') {
        this._board.removeHighlightPattern();
        $('.pattern-selector').removeClass('selected');
      }
    });
    $(document).on('mousedown', ev => {
      if (ev.which == 3) {
        this._board.removeHighlightPattern();
        $('.pattern-selector').removeClass('selected');
      }
    });
  }
}
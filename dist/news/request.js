'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSources = fetchSources;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Key 9a2e24ea621646a89d650945978158ae

function get(url, params) {
  var res;
  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Get request to ' + url + ' with params ' + params);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios2.default.get(url, { params: params }));

        case 4:
          res = _context.sent;
          return _context.abrupt('return', res.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context['catch'](1);
          throw _context.t0;

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this, [[1, 8]]);
}

/**
 * Returns all sources from TechAPI
 * @param {String} category - Optional, default null
 * @param {String} language - Either en, de or fr, default en
 * @param {String} country - Either au, de, gb, in, it or us, default null
 */
function fetchSources(category) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';
  var country = arguments[2];
  var res;
  return regeneratorRuntime.async(function fetchSources$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(get(_constants2.default.sources, {
            category: category,
            language: language,
            country: country
          }));

        case 3:
          res = _context2.sent;


          console.log(res);

          if (!res.sources.length) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt('return', res.sources);

        case 7:
          throw new Error('No sources found. Perhaps the category, language or country specified aren\'t valid');

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2['catch'](0);
          throw _context2.t0;

        case 13:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this, [[0, 10]]);
}
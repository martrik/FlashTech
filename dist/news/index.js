'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiKey = '9a2e24ea621646a89d650945978158ae';

function get(url, params) {
  var res;
  return regeneratorRuntime.async(function get$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios2.default.get(url, { params: params }));

        case 3:
          res = _context.sent;
          return _context.abrupt('return', res.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context['catch'](0);
          throw _context.t0;

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this, [[0, 7]]);
}

/**
 * Returns articles from the specified source
 * @param {String} source
 * @param {String} sortBy - Default top
 */
function fetchArticlesFromSource(source, sortBy) {
  var res;
  return regeneratorRuntime.async(function fetchArticlesFromSource$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(get(_constants2.default.articles, {
            source: source,
            apiKey: apiKey,
            sortBy: sortBy
          }));

        case 3:
          res = _context2.sent;
          return _context2.abrupt('return', res.articles);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2['catch'](0);
          throw _context2.t0;

        case 10:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this, [[0, 7]]);
}

exports.default = {
  fetchArticlesFromSource: fetchArticlesFromSource
};
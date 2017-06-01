'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var apiKey = '9a2e24ea621646a89d650945978158ae';

var newsSources = ['the-verge', 'recode', 'techcrunch', 'engadget'];
var cache = {};

/**
 * Convert article object to meet Flash Briefing API
 * @param {Object} article
 */
function transformArticle(article) {
  return {
    uid: (0, _v2.default)(),
    updateDate: new Date().toISOString(),
    titleText: article.title,
    mainText: article.description,
    redirectionUrl: article.url
  };
}

/**
 * Wrapper around a get request
 * @param {String} url
 * @param {Object} params
 */
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

function reloadCache() {
  var newCache, allArticles;
  return regeneratorRuntime.async(function reloadCache$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log('Reloading cache...');
          _context3.prev = 1;
          newCache = {};

          // Create new cache

          _context3.next = 5;
          return regeneratorRuntime.awrap(Promise.all(newsSources.map(function (source) {
            return fetchArticlesFromSource(source);
          })));

        case 5:
          allArticles = _context3.sent;

          allArticles.forEach(function (articles, index) {
            newCache = _extends({}, newCache, _defineProperty({}, newsSources[index], articles.map(transformArticle)));
          });

          console.log('Cache refreshed!');

          // Update cache
          cache = newCache;
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3['catch'](1);

          console.log(_context3.t0);

        case 14:

          // Reload cache every 30 min
          setTimeout(reloadCache, 300000);

        case 15:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this, [[1, 11]]);
}

/**
 * Initialize news cache
 */
function initCache() {
  return regeneratorRuntime.async(function initCache$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log('Initializing cache...');
          reloadCache();

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, this);
}

function getArticlesFromSource(source) {
  var articles;
  return regeneratorRuntime.async(function getArticlesFromSource$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!cache[source]) {
            _context5.next = 3;
            break;
          }

          console.log('Getting cached news from ' + source + '.');
          return _context5.abrupt('return', cache[source]);

        case 3:

          console.log('News from ' + source + ' not in cache, fetching them...');

          _context5.prev = 4;
          _context5.next = 7;
          return regeneratorRuntime.awrap(fetchArticlesFromSource(source));

        case 7:
          articles = _context5.sent;
          return _context5.abrupt('return', articles.map(transformArticle));

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5['catch'](4);
          throw _context5.t0;

        case 14:
        case 'end':
          return _context5.stop();
      }
    }
  }, null, this, [[4, 11]]);
}

exports.default = {
  getArticlesFromSource: getArticlesFromSource,
  initCache: initCache
};
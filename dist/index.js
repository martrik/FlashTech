'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _news = require('./news');

var _news2 = _interopRequireDefault(_news);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

var app = (0, _express2.default)();

function newsResponse(source, res) {
  var articles;
  return regeneratorRuntime.async(function newsResponse$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_news2.default.getArticlesFromSource(source));

        case 3:
          articles = _context.sent;


          res.status(200).json(articles);
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context['catch'](0);

          console.error(_context.t0);
          res.sendStatus(500);

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this, [[0, 7]]);
}

app.get('/', function (req, res) {
  res.status(200).send('Welcome to the Flash Tech News API! 👋');
});

app.get('/news/theverge', function (req, res) {
  newsResponse('the-verge', res);
});

app.get('/news/recode', function (req, res) {
  newsResponse('recode', res);
});

app.get('/news/techcrunch', function (req, res) {
  newsResponse('techcrunch', res);
});

app.get('/news/hackernews', function (req, res) {
  newsResponse('hacker-news', res);
});

app.get('/news/engadget', function (req, res) {
  newsResponse('engadget', res);
});

app.get('/news/techradar', function (req, res) {
  newsResponse('techradar', res);
});

app.get('/news/tnw', function (req, res) {
  newsResponse('the-next-web', res);
});

app.get('/news/beat', function (req, res) {
  res.status(200).send('We are live, our API is save and sound! 🗞️');
});

app.listen(4242, function () {
  console.log('Flash Tech News running on port 4242.');
});

_news2.default.initCache();
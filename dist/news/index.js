'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNews;

var _request = require('./request');

// Key 9a2e24ea621646a89d650945978158ae

/**
 * Returns tech sources from NewsAPI
 */
function fetchTechSources() {
  return (0, _request.fetchSources)('technology');
}

function getNews() {
  return fetchTechSources();
}
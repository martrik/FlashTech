import axios from 'axios';
import uuid from 'uuid/v4';

import constants from './constants';

const apiKey = '9a2e24ea621646a89d650945978158ae';

const newsSources = ['the-verge', 'recode', 'techcrunch', 'engadget'];
let cache = {};

/**
 * Convert article object to meet Flash Briefing API
 * @param {Object} article
 */
function transformArticle(article) {
  return {
    uid: uuid(),
    updateDate: article.publishedAt || new Date().toISOString(),
    titleText: article.title,
    mainText: `${article.title}. ${article.description}`,
    redirectionUrl: article.url,
  };
}

/**
 * Wrapper around a get request
 * @param {String} url
 * @param {Object} params
 */
async function get(url, params) {
  try {
    const res = await axios.get(url, { params });
    return res.data;
  } catch (e) {
    throw e;
  }
}

/**
 * Returns articles from the specified source
 * @param {String} source
 * @param {String} sortBy - Default top
 */
async function fetchArticlesFromSource(source, sortBy) {
  try {
    const res = await get(constants.articles, {
      source,
      apiKey,
      sortBy,
    });

    return res.articles;
  } catch (e) {
    throw e;
  }
}

async function reloadCache() {
  console.log('Reloading cache...');
  try {
    let newCache = {};

    // Create new cache
    const allArticles = await Promise.all(newsSources.map(source => fetchArticlesFromSource(source)));
    allArticles.forEach((articles, index) => {
      newCache = {
        ...newCache,
        [newsSources[index]]: articles.map(transformArticle),
      };
    });

    console.log('Cache refreshed!');

    // Update cache
    cache = newCache;
  } catch (e) {
    console.log(e);
  }

  // Reload cache every 30 min
  setTimeout(reloadCache, 300000);
}

/**
 * Initialize news cache
 */
async function initCache() {
  console.log('Initializing cache...');
  reloadCache();
}

async function getArticlesFromSource(source) {
  if (cache[source]) {
    console.log(`Getting cached news from ${source}.`);
    return cache[source];
  }

  console.log(`News from ${source} not in cache, fetching them...`);

  try {
    const articles = await fetchArticlesFromSource(source);
    return articles.map(transformArticle);
  } catch (e) {
    throw e;
  }
}

export default {
  getArticlesFromSource,
  initCache,
};

import axios from 'axios';

import constants from './constants';

const apiKey = '9a2e24ea621646a89d650945978158ae';

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

export default {
  fetchArticlesFromSource,
};

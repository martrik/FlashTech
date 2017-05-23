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
 * Returns all sources from TechAPI
 * @param {String} category - Optional, default null
 * @param {String} language - Either en, de or fr, default en
 * @param {String} country - Either au, de, gb, in, it or us, default null
 */
export async function fetchSources(category, language = 'en', country) {
  try {
    const res = await get(constants.sources, {
      category,
      language,
      country,
    });

    if (res.sources.length) {
      return res.sources;
    }

    throw new Error('No sources found. Perhaps the category, language or country specified aren\'t valid');
  } catch (e) {
    throw e;
  }
}

/**
 * Returns articles from the specified source
 * @param {String} source
 * @param {String} sortBy - Default top
 */
export async function fetchArticlesFromSource(source, sortBy) {
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

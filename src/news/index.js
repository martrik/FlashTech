import { fetchSources, fetchArticlesFromSource } from './request';

/**
 * Returns tech sources from NewsAPI
 */
function fetchTechSources() {
  return fetchSources('technology');
}

/**
 * Return an array of objects with source and articles
 */
export default async function getNews() {
  try {
    const sources = await fetchTechSources();
    const sourcesIds = sources.map(source => source.id);

    // Fetch top stories for each source and bundle
    const sourceArticlesFetching = [];
    sourcesIds.forEach((id) => {
      sourceArticlesFetching.push(fetchArticlesFromSource(id));
    });

    // Flatten to get array of all stories
    const articlesBySource = await Promise.all(sourceArticlesFetching);

    const result = [];
    articlesBySource.forEach((articles, index) => {
      result.push({
        source: sources[index],
        articles,
      });
    });

    return result;
  } catch (e) {
    throw e;
  }
}

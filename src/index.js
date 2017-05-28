import express from 'express';
import uuid from 'uuid/v4';

import news from './news';

require('babel-polyfill');

const app = express();

function transformArticle(article) {
  return {
    uid: uuid(),
    updateDate: article.publishedAt || Date(),
    titleText: article.title,
    mainText: article.description,
    redirectionUrl: article.url,
  };
}

function buildResponse(payload) {
  return payload.map(transformArticle);
}

async function newsResponse(source, res) {
  try {
    const articles = await news.fetchArticlesFromSource(source);
    res.status(200).json(buildResponse(articles));
  } catch (e) {
    res.sendStatus(500);
  }
}

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Flash Tech News API! 👋');
});

app.get('/news/theverge', (req, res) => {
  newsResponse('the-verge', res);
});

app.get('/news/recode', (req, res) => {
  newsResponse('recode', res);
});

app.get('/news/techcrunch', (req, res) => {
  newsResponse('techcrunch', res);
});

app.get('/news/hackernews', (req, res) => {
  newsResponse('hacker-news', res);
});

app.get('/news/engadget', (req, res) => {
  newsResponse('engadget', res);
});

app.get('/news/techradar', (req, res) => {
  newsResponse('techradar', res);
});

app.get('/news/tnw', (req, res) => {
  newsResponse('the-new-web', res);
});

app.get('/news/beat', (req, res) => {
  res.status(200).send('We are live, our API is save and sound! 🗞️');
});


app.listen(4242, () => {
  console.log('Flash Tech News running on port 4242.');
});

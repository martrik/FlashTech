import express from 'express';

import news from './news';

require('babel-polyfill');

const app = express();

async function newsResponse(source, res) {
  try {
    const articles = await news.getArticlesFromSource(source);

    res.status(200).json(articles);
  } catch (e) {
    console.error(e);
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
  newsResponse('the-next-web', res);
});

app.get('/news/beat', (req, res) => {
  res.status(200).send('We are live, our API is save and sound! 🗞️');
});

app.listen(4242, () => {
  console.log('Flash Tech News running on port 4242.');
});

news.initCache();


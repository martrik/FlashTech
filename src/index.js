import news from './news';

require('babel-polyfill');

async function test() {
  try {
    const result = await news();

    console.log(result);
  } catch(e) {
    console.error(e);
  }
}

test();


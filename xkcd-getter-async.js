#!/usr/bin/node
const fetch = require('node-fetch');

const xkcd = {
  endpoint: 'http://xkcd.com',
  api_postfix: 'info.0.json'
}

const args = process.argv.slice(2);

(async () =>  {
  if (args[0] == null) {
    throw new Error("please provide comic id to fetch");
  }

  const comic_id = new Number(args[0]);

  if (isNaN(comic_id)) {
    throw new Error("comic id should be a number");
  }

  try {
    const comicRes = await fetch(`${xkcd.endpoint}/${comic_id}/${xkcd.api_postfix}`);

    if (comicRes.status !== 200) {
      throw new Error("Couldn't fetch comic json");
    }

    const comicJson = await comicRes.json();
    console.log(comicJson);
  } catch (e) {
    console.log(e.message);
  }
})().catch((e) => console.log(e.message));

#!/usr/bin/node
const fetch = require('node-fetch');

const xkcd = {
  endpoint: 'http://xkcd.com',
  api_postfix: 'info.0.json'
}

const args = process.argv.slice(2);

function main(comic_id_string) {
  if (comic_id_string == null) {
    throw new Error("please provide comic id to fetch");
  }

  const comic_id = new Number(comic_id_string);

  if (isNaN(comic_id)) {
    throw new Error("comic id should be a number");
  }

  fetch(`${xkcd.endpoint}/${comic_id}/${xkcd.api_postfix}`)
    .then(res => {
      return res.status === 200 ? res.json() : new Promise((_, reject) => {
          reject("Couldn't fetch comic json");
      });
    })
    .then(comicJson => console.log(comicJson))
    .catch(e => console.log(e));
};

try {
  main(args[0]);
} catch (e) {
  console.error(e.message);
}

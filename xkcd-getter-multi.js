#!/usr/bin/node
const fetch = require('node-fetch');

const xkcd = {
  endpoint: 'http://xkcd.com',
  api_postfix: 'info.0.json'
}

const args = process.argv.slice(2);

function get_comic(comic_id_string) {
  if (comic_id_string == null) {
    throw new Error("please provide comic id to fetch");
  }

  const comic_id = new Number(comic_id_string);

  if (isNaN(comic_id)) {
    throw new Error("comic id should be a number");
  }

  return fetch(`${xkcd.endpoint}/${comic_id}/${xkcd.api_postfix}`)
    .then(res => {
      return res.status === 200 ? res.json() : new Promise((resolve, _) => {
        resolve("Couldn't fetch comic json");
      });
    })
};

function main(comic_id_strings) {
  Promise.all(comic_id_strings.map(get_comic))
    .then((comics) => {
      console.log(comics.reduce((prevVal, curVal, i) => {
        return Object.assign(prevVal, { [i]: curVal })
      }, {}));
    })
    .catch(e => console.log(e));
}

try {
  main(args);
} catch (e) {
  console.error(e.message);
}

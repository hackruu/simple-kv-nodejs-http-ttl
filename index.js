const Keyv = require("keyv");
const express = require("express");
const QuickLRU = require('quick-lru');

const port = process.env.PORT || 5000;
const bind = process.env.BIND || '127.0.0.1'
const ttl = Number(process.env.TTL) || 120000; // 120 seconds
const debug = Number(process.env.DEBUG) || 0;
const maxsize = Number(process.env.MAXSIZE) || 100;

const app = express();
const lru = new QuickLRU({ maxSize: maxsize });
const keyv = new Keyv({ store: lru });

app.use(express.json());

app.all("*", async (req, res) => {
  if ( debug == 1 ) { console.warn(req.query); };
  const reqObject = req.query;
  const firstObjectKey =
    Object.keys(reqObject).length && Object.keys(reqObject)[0];
  const firstObjectValue = reqObject[firstObjectKey];

  if (firstObjectKey && firstObjectValue === "") {
    const value = await keyv.get(firstObjectKey);
    return value ? res.send(value) : res.sendStatus(404);
  }

  await keyv.set(firstObjectKey, firstObjectValue, ttl);
  return res.sendStatus(200);
});

app.listen(port, bind , () => {
  if ( debug == 1 ) { console.warn("Debug is enabled!"); };
  console.log(`App listening on ${bind}:${port}, ttl is ${ttl}, maxsize is ${maxsize}!`);
});

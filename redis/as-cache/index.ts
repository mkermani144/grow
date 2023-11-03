/**
 * Simple web server with redis as cache
 *
 * To make most of redis caching, pre-fill the database file with a large amount
 * of data so that reading from it is an io intensive task
 */

import express from "express";
import fs from "fs/promises";
import { createClient } from "redis";

const redis = createClient();

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();

const app = express();
const port = 8080;

app.use(express.json());

const DB_PATH = "./db.json";

if (!(await fs.exists(DB_PATH))) {
  await fs.writeFile(DB_PATH, "{}");
}

const readDb = async () => {
  const currentDataJson = await fs.readFile(DB_PATH, {
    encoding: "utf-8",
  });
  const currentData = JSON.parse(currentDataJson);
  return currentData;
};

const updateDb = async (key: string, value: string) => {
  const currentData = await readDb();
  const newData = {
    ...currentData,
    [key]: value,
  };
  return fs.writeFile(DB_PATH, JSON.stringify(newData));
};

const getKey = async (key: string) => {
  console.time("cache");
  const cacheResult = await redis.get(key);
  console.timeEnd("cache");
  if (cacheResult) {
    return cacheResult;
  }
  console.time("db");
  const currentData = await readDb();
  console.timeEnd("db");
  const result = currentData[key];
  await redis.set(key, result);
  return result;
};

app.post("/add", async (req, res) => {
  await updateDb(req.body.key, req.body.value);
  res.send("ok");
});

app.get("/get", async (req, res) => {
  const value = await getKey((req.query as any).key);
  res.send(value);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

const key = Date.now().toString();
await client.set(`key${key}`, process.argv[2]);
console.log(`Added key value pair: ${key} -> ${process.argv[2]}`);

const allKeys = (await client.scan(0, { MATCH: "key*" })).keys;
const allValues = await client.mGet(allKeys);

const all = allKeys.reduce(
  (acc, cur, index) => ({
    ...acc,
    [cur]: allValues[index],
  }),
  {}
);
console.log(`Redis key value pairs whose keys starting with "key":`);
console.log(all);
process.exit(0);

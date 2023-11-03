/**
 * JSON database
 */

import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.flushDb();

await client.json.set("hello", "$", {
  keyNum: 1,
  keyString: "world",
  keyArr: [6, 7, 8],
});

await client.json.set("hello", "$.keyNum", 2);
await client.json.numIncrBy("hello", "$.keyNum", 5);
console.warn(
  "keyNum finally is: ",
  await client.json.get("hello", { path: "$.keyNum" })
);

await client.json.set("hello", "$.keyString", "awesome");
await client.json.strAppend("hello", "$.keyString", " universe");
console.warn(
  "keyString finally is: ",
  await client.json.get("hello", { path: "$.keyString" })
);

await client.json.set("hello", "$.keyArr", []);
await client.json.arrAppend("hello", "$.keyArr", 2, 3, 4);
console.warn(
  "keyArr finally is: ",
  await client.json.get("hello", { path: "$.keyArr" })
);

process.exit(0);

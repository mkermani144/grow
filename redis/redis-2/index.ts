/**
 * Data types
 */

import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.flushDb();

await client.set("key-string", "hello world");
console.warn("key-string: ", await client.get("key-string"));

await client.lPush("key-list", "hello world");
await client.lPush("key-list", "hello redis");
await client.rPush("key-list", "hello everyone");
const popped = await client.lPop("key-list");
console.warn("popped: ", popped);
console.warn("list len: ", await client.lLen("key-list"));

await client.sAdd("key-set", "world");
await client.sAdd("key-set", "redis");
await client.sAdd("key-set", "everyone");
console.warn("set len: ", await client.sCard("key-set"));

await client.hSet("key-hash", {
  firstGreeted: "world",
  secondGreeted: "redis",
  thirdGreeted: "everyone",
});
console.warn(
  "second greeted: ",
  await client.hGet("key-hash", "secondGreeted")
);

await client.zAdd("key-sorted", {
  score: 2,
  value: "redis",
});
await client.zAdd("key-sorted", {
  score: 1,
  value: "world",
});
await client.zAdd("key-sorted", {
  score: 3,
  value: "everyone",
});
console.warn("sorted: ", await client.zRange("key-sorted", 0, -1));

process.exit(0);

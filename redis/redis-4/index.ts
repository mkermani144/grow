/**
 * Basic indexing and searching
 */

import { createClient, SchemaFieldTypes } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.flushDb();

await client.ft.create(
  "idx:greets",
  {
    "$.type": {
      type: SchemaFieldTypes.TEXT,
      AS: "type",
    },
    "$.content": {
      type: SchemaFieldTypes.TEXT,
      AS: "content",
    },
    "$.greeter": {
      type: SchemaFieldTypes.TEXT,
      AS: "greeter",
    },
  },
  {
    ON: "JSON",
    PREFIX: "greet:",
  }
);

await client.json.set("greet:1", "$", {
  type: "hello",
  content: "hello world",
  greeter: "me",
});
await client.json.set("greet:2", "$", {
  type: "greet",
  content: "greeting to the world",
  greeter: "noone",
});
await client.json.set("greet:3", "$", {
  type: "hi",
  content: "hi universe",
  greeter: "redis",
});

const result = await client.ft.search("idx:greets", "world");
console.warn("search result: ", result);

process.exit(0);

/**
 * Advanced indexing and searching
 */

import { createClient, SchemaFieldTypes } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.flushDb();

await client.ft.create(
  "idx:users",
  {
    "$.name": {
      type: SchemaFieldTypes.TEXT,
      AS: "name",
      WEIGHT: 10,
      SORTABLE: true,
    },
    "$.email": {
      type: SchemaFieldTypes.TEXT,
      AS: "email",
      NOINDEX: true,
    },
    "$.gender": {
      type: SchemaFieldTypes.TAG,
      AS: "gender",
    },
    "$.age": {
      type: SchemaFieldTypes.NUMERIC,
      AS: "age",
      SORTABLE: true,
    },
    "$.username": {
      type: SchemaFieldTypes.TEXT,
      AS: "username",
    },
  },
  {
    ON: "JSON",
    PREFIX: "user:",
    // FILTER: 'endswith(@email, "gmail.com")',
  }
);

await client.json.set("user:0", "$", {
  name: "Mohammad Kermani",
  email: "mk@mk.com",
  gender: "male",
  age: 27,
  username: "mkermani144",
});
await client.json.set("user:1", "$", {
  name: "Johny Depp",
  email: "jd@gmail.com",
  gender: "male",
  age: 40,
  username: "jdjd",
});
await client.json.set("user:2", "$", {
  name: "Moha Karl",
  email: "karl@gmail.com",
  gender: "male",
  age: 14,
  username: "mohakarll",
});
await client.json.set("user:3", "$", {
  name: "Adele",
  email: "adele@adelefans.com",
  gender: "female",
  age: 30,
  username: "adeleofficial",
});
await client.json.set("user:4", "$", {
  name: "Lana Del Rey",
  email: "ldr@gmail.com",
  gender: "female",
  age: 32,
  username: "lanadel",
});
await client.json.set("user:5", "$", {
  name: "Unknown",
  email: "unknown@gmail.com",
  gender: "unknown",
  age: 39,
  username: "unknown",
});

const result = await client.ft.search("idx:users", "@age:[30 +inf]", {
  RETURN: ["name", "age"],
});
console.warn("users older than 30 years: ", result);

const result2 = await client.ft.search("idx:users", "@gender:{female}", {
  RETURN: ["name"],
});
console.warn("all female users: ", result2);

const result3 = await client.ft.search("idx:users", "-@gender:{female}", {
  RETURN: ["name"],
});
console.warn("all non-female users: ", result3);

const result4 = await client.ft.search("idx:users", "moh*", {
  RETURN: ["name"],
});
console.warn("search result for 'moh': ", result4);

process.exit(0);

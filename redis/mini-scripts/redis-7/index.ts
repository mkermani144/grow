/**
 * More groupby aggregations
 */

import {
  AggregateGroupByReducers,
  AggregateSteps,
  createClient,
  SchemaFieldTypes,
} from "redis";

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
      SORTABLE: true,
    },
    "$.gender": {
      type: SchemaFieldTypes.TAG,
      AS: "gender",
      SORTABLE: true,
    },
    "$.age": {
      type: SchemaFieldTypes.NUMERIC,
      AS: "age",
      SORTABLE: true,
    },
    "$.username": {
      type: SchemaFieldTypes.TEXT,
      AS: "username",
      SORTABLE: true,
    },
    "$.networth": {
      type: SchemaFieldTypes.NUMERIC,
      AS: "networth",
      SORTABLE: true,
    },
  },
  {
    ON: "JSON",
    PREFIX: "user:",
  }
);

await client.json.set("user:0", "$", {
  name: "Mohammad Kermani",
  email: "mk@mk.com",
  gender: "male",
  age: 27,
  username: "mkermani144",
  networth: 100000,
});
await client.json.set("user:1", "$", {
  name: "Johny Depp",
  email: "jd@gmail.com",
  gender: "male",
  age: 40,
  username: "jdjd",
  networth: 10000,
});
await client.json.set("user:2", "$", {
  name: "Moha Karl",
  email: "karl@gmail.com",
  gender: "male",
  age: 14,
  username: "mohakarll",
  networth: 990000,
});
await client.json.set("user:3", "$", {
  name: "Adele",
  email: "adele@adelefans.com",
  gender: "female",
  age: 30,
  username: "adeleofficial",
  networth: 10000000,
});
await client.json.set("user:4", "$", {
  name: "Lana Del Rey",
  email: "ldr@gmail.com",
  gender: "female",
  age: 32,
  username: "lanadel",
  networth: 100,
});
await client.json.set("user:5", "$", {
  name: "Unknown",
  email: "unknown@gmail.com",
  gender: "unknown",
  age: 39,
  username: "unknown",
  networth: 0,
});

const result1 = await client.ft.aggregate("idx:users", "*", {
  STEPS: [
    {
      type: AggregateSteps.GROUPBY,
      REDUCE: [
        {
          type: AggregateGroupByReducers.SUM,
          property: "@networth",
          AS: "totalNet",
        },
      ],
    },
  ],
});
console.warn("total users networth: ", result1);

const result2 = await client.ft.aggregate("idx:users", "*", {
  STEPS: [
    {
      type: AggregateSteps.GROUPBY,
      properties: ["@gender"],
      REDUCE: [
        {
          type: AggregateGroupByReducers.AVG,
          property: "@networth",
          AS: "avgNet",
        },
        {
          type: AggregateGroupByReducers.AVG,
          property: "@age",
          AS: "avgAge",
        },
      ],
    },
  ],
});
console.warn("averages by gender: ", result2);

process.exit(0);

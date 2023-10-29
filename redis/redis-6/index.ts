/**
 * Basic groupby aggregation
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

const result1 = await client.ft.aggregate("idx:users", "*", {
  STEPS: [
    {
      type: AggregateSteps.GROUPBY,
      properties: ["@gender"],
      REDUCE: [
        {
          type: AggregateGroupByReducers.COUNT,
          AS: "count",
        },
      ],
    },
  ],
});
console.warn("users grouped by gender type: ", result1);

const result2 = await client.ft.aggregate("idx:users", "*", {
  LOAD: [
    {
      identifier: "@email",
    },
    {
      identifier: "@name",
    },
    {
      identifier: "@gender",
    },
    {
      identifier: "@age",
    },
    {
      identifier: "@username",
    },
  ],
  STEPS: [
    {
      type: AggregateSteps.APPLY,
      expression: "contains(@email, 'gmail')",
      AS: "hasGmail",
    },
    {
      type: AggregateSteps.GROUPBY,
      properties: ["@hasGmail"],
      REDUCE: [
        {
          type: AggregateGroupByReducers.TOLIST,
          property: "@name",
          AS: "names",
        },
      ],
    },
  ],
});
console.warn("users grouped by having or not having gmail: ", result2);

process.exit(0);

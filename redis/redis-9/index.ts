/**
 * Redis OM
 */

import { createClient } from "redis";
import { Repository, Schema } from "redis-om";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

await client.flushDb();

const userSchema = new Schema("user", {
  name: {
    type: "string",
  },
  age: {
    type: "number",
    sortable: true,
  },
  bio: {
    type: "text",
    sortable: true,
  },
});

const repository = new Repository(userSchema, client);
await repository.createIndex();

const user1 = {
  name: "Mohammad Kermani",
  age: 27,
  bio: "it's me!",
};

const user2 = {
  name: "Adele",
  age: 30,
  bio: "I'm a singer",
};

await Promise.all([repository.save(user1), repository.save(user2)]);

console.warn(
  await repository.search().where("age").greaterThan(28).returnAll()
);
console.warn(await repository.searchRaw('@age:[10 28]').returnAll());

process.exit(0);

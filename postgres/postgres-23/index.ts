/**
 * Having clause
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "users";

await knex.schema.dropTableIfExists(TABLE_NAME);
await knex.schema.createTable(TABLE_NAME, (table) => {
  table.text("username").primary();
  table.text("name").notNullable();
  table.enum("gender", ["male", "female"]);
  table.integer("age").notNullable();
  table.integer("revenue").defaultTo(0);
  table.index("username");
});

await knex(TABLE_NAME).insert({
  username: "mkermani144",
  name: "Mohammad Kermani",
  age: 27,
  revenue: 10000,
  gender: "male",
});
await knex(TABLE_NAME).insert({
  username: "anonymous",
  name: "Anonymous",
  age: 33,
  revenue: 500000,
  gender: "male",
});
await knex(TABLE_NAME).insert({
  username: "fakanonymous",
  name: "FakAnonymous",
  age: 33,
  revenue: 5000,
  gender: "male",
});
await knex(TABLE_NAME).insert({
  username: "unknown",
  name: "Unknown",
  age: 18,
  revenue: 10000,
  gender: "female",
});

console.log(
  await knex(TABLE_NAME)
    .select("gender")
    .max("revenue", { as: "max_revenue" })
    .where("revenue", ">", 7500)
    .groupBy("gender")
    .havingRaw("MAX(revenue) > 10000")
);

await knex.schema.dropTableIfExists(TABLE_NAME);

process.exit(0);

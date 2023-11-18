/**
 * Aggregations
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "users";

await knex.schema.createTable(TABLE_NAME, (table) => {
  table.text("username").primary();
  table.text("name").notNullable();
  table.enum("gender", ["male", "female"]);
  table.integer("age").notNullable();
  table.integer("revenue").defaultTo(0);
  table.index("username");
});

await Promise.all([
  knex(TABLE_NAME).insert({
    username: "mkermani144",
    name: "Mohammad Kermani",
    age: 27,
    revenue: 10000,
  }),
  knex(TABLE_NAME).insert({
    username: "foobar",
    name: "Foo Bar",
    age: 77,
  }),
  knex(TABLE_NAME).insert({
    username: "anonymous",
    name: "Anonymous",
    age: 33,
    revenue: 1_000_000,
  }),
]);
const aggregations = await knex(TABLE_NAME)
  .count("username as count")
  .avg("age as avg")
  .min("age as min")
  .max("age as max")
  .sum("revenue as sum");
console.log(aggregations);

await knex.schema.dropTable(TABLE_NAME);

process.exit(0);

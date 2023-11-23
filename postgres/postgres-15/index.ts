/**
 * window functions
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
    gender: "male",
    age: 27,
    revenue: 10000,
  }),
  knex(TABLE_NAME).insert({
    username: "anonymous",
    name: "Anonymous",
    gender: "male",
    age: 33,
    revenue: 1000000,
  }),
  knex(TABLE_NAME).insert({
    username: "mrs. anonymous",
    name: "MrsAnonymous",
    gender: "female",
    age: 22,
    revenue: 200000,
  }),
  knex(TABLE_NAME).insert({
    username: "mrs. unknown",
    name: "MrsUnknown",
    gender: "female",
    age: 16,
    revenue: 10000,
  }),
  knex(TABLE_NAME).insert({
    username: "unknown",
    name: "Unknown",
    gender: "male",
    age: 21,
    revenue: 50000,
  }),
]);

console.warn(
  await knex(TABLE_NAME).select(
    knex.raw(
      "*, RANK() OVER(PARTITION BY gender ORDER BY revenue DESC) as revenue_rank_in_gender"
    )
  )
);

await knex.schema.dropTableIfExists(TABLE_NAME);

process.exit(0);

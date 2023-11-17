/**
 * Coalescing
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
  table.index("username");
});
await knex(TABLE_NAME).insert({
  username: "mkermani144",
  name: "Mohammad Kermani",
});

console.log(
  await knex(TABLE_NAME).select(knex.raw("COALESCE(gender, 'N/A') as gender"))
);

await knex.schema.dropTable(TABLE_NAME);

process.exit(0);

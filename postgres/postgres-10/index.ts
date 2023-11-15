/**
 * Domains
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "users";

await knex.schema.raw(
  "CREATE DOMAIN description AS VARCHAR(30) DEFAULT 'default bio'"
);

await knex.schema.createTable(TABLE_NAME, (table) => {
  table.text("username").primary();
  table.text("name").notNullable();
  table.enum("gender", ["male", "female"]);
  table.specificType("bio", "description");
  table.index("username");
});
await knex(TABLE_NAME).insert({
  username: "mkermani144",
  name: "Mohammad Kermani",
  gender: "male",
});

console.log(await knex(TABLE_NAME).select("*"));

await knex.schema.dropTableIfExists(TABLE_NAME);
await knex.raw("DROP DOMAIN description;");

process.exit(0);

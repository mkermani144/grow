/**
 * Schemas
 */
import knexFactory from "knex";

const knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "users";
const SCHEMA_NAME = "public";

await knex.schema.withSchema(SCHEMA_NAME).createTable(TABLE_NAME, (table) => {
  table.text("username").primary();
  table.text("name").notNullable();
  table.enum("gender", ["male", "female"]);
  table.text("bio").checkLength("<", 30);
  table.index("username");
});
await knex(TABLE_NAME).insert({
  username: "mkermani144",
  name: "Mohammad Kermani",
  gender: "male",
  bio: "I'm an engineer",
});

await knex.schema.dropTable(TABLE_NAME);
await knex.schema.dropSchema(SCHEMA_NAME);

process.exit(0);

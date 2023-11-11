/**
 * Databases
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

await knex.raw("CREATE DATABASE test;");
await knex.destroy();

knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432/test",
});
const TABLE_NAME = "users";

await knex.schema.createTable(TABLE_NAME, (table) => {
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
await knex.destroy();

knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});
await knex.raw("DROP DATABASE test;");

process.exit(0);

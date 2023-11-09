/**
 * Tables
 */
import knexFactory from "knex";

const knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
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

try {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn("name");
    table.text("first_name").notNullable().defaultTo("");
    table.text("last_name").notNullable().defaultTo("");
    table.text("bio").checkLength("<", 50).alter();
  });
  console.log(await knex.select("*").from(TABLE_NAME));
} finally {
  await knex.schema.dropTable(TABLE_NAME);
}

process.exit(0);

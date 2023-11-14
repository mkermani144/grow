/**
 * Table inheritance
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "users";
const INHERITED_TABLE_NAME = "awesome_users";

await knex.schema.createTable(TABLE_NAME, (table) => {
  table.text("username").primary();
  table.text("name").notNullable();
  table.enum("gender", ["male", "female"]);
  table.text("bio").checkLength("<", 30);
  table.index("username");
});
await knex.schema.createTable(INHERITED_TABLE_NAME, (table) => {
  table.inherits(TABLE_NAME);
  table.text("why_awesome");
});
await knex(INHERITED_TABLE_NAME).insert({
  username: "mkermani144",
  name: "Mohammad Kermani",
  gender: "male",
  bio: "I'm an engineer",
  why_awesome: "because :D",
});

console.log(await knex(INHERITED_TABLE_NAME).select("*"));

await knex.schema.dropTableIfExists(INHERITED_TABLE_NAME);
await knex.schema.dropTableIfExists(TABLE_NAME);

process.exit(0);

/**
 * Custom types
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "users";

await knex.schema.raw(`
DO $$ BEGIN
    CREATE TYPE loc AS (x REAL, y REAL);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
`);

await knex.schema.createTable(TABLE_NAME, (table) => {
  table.text("username").primary();
  table.text("name").notNullable();
  table.enum("gender", ["male", "female"]);
  table.text("bio").checkLength("<", 30);
  table.index("username");
  table.specificType("location", "loc").notNullable();
});
await knex(TABLE_NAME).insert({
  username: "mkermani144",
  name: "Mohammad Kermani",
  gender: "male",
  bio: "I'm an engineer",
  location: "(1.2, 2.4)",
});

console.log(await knex(TABLE_NAME).select("*"));

await knex.schema.dropTableIfExists(TABLE_NAME);

process.exit(0);

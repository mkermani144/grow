/**
 * More on schemas
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const SCHEMA_NAME = "custom_schema";
const TABLE_NAME = "users";
await knex.schema.createTable(TABLE_NAME, (table) => {
  table.increments("id").primary();
});

await knex.schema.createSchema(SCHEMA_NAME);

console.log(
  await knex("schemata").withSchema("information_schema").select("*")
);

await knex.raw(`SET search_path TO ${SCHEMA_NAME}`);
try {
  await knex(TABLE_NAME).select("*");
} catch {
  console.warn("Default schema is changed");
}

await knex.schema.dropSchema(SCHEMA_NAME);
await knex.raw("SET search_path TO public");
await knex.schema.withSchema("public").dropTable(TABLE_NAME);

process.exit(0);

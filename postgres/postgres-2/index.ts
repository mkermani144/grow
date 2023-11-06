/**
 * Get started with knex
 */
import knexFactory from "knex";

const knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

await knex.schema.createTable("hello_world", (table) => {
  table.integer("id").primary();
  table.string("greeter");
});

await knex("hello_world").insert({ id: 1, greeter: "Asghar" });
await knex("hello_world").insert({ id: 2, greeter: "Akbar" });

console.log(await knex.select("*").from("hello_world"));

await knex.schema.dropTable("hello_world");

process.exit(0);

/**
 * Data types
 */
import knexFactory from "knex";

const knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "data-types";

await knex.schema.createTable(TABLE_NAME, (table) => {
  table.smallint("small_number");
  table.integer("medium_number");
  table.bigInteger("large_number");
  table.decimal("configurable_number");
  table.float("real_number");
  table.double("large_real_number");
  table.text("text");
  table.date("date");
  table.time("time");
  table.timestamp("timestamp");
  table.boolean("flag");
});

try {
  await knex(TABLE_NAME).insert({
    small_number: 32767,
    medium_number: 2147483647,
    large_number: 9223372036854775807n,
    configurable_number: 2,
    real_number: 1.123456,
    large_real_number: 1.123456789,
    text: "hello world",
    date: new Date(),
    time: new Date().toLocaleTimeString("en-US", { hour12: false }),
    timestamp: new Date(),
    flag: true,
  });

  console.log(await knex.select("*").from(TABLE_NAME));
} finally {
  await knex.schema.dropTable(TABLE_NAME);
}

process.exit(0);

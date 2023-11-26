/**
 * Transactions
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
  table.integer("age").notNullable();
  table.integer("revenue").defaultTo(0);
  table.index("username");
});

try {
  await knex.transaction(async (trx) => {
    await trx(TABLE_NAME).insert({
      username: "mkermani144",
      name: "Mohammad Kermani",
      age: 27,
      revenue: 10000,
    });
    await trx(TABLE_NAME).insert({
      name: "Anonymous",
      age: 33,
      revenue: 500000,
    });
  });
} catch {
} finally {
  console.log(await knex(TABLE_NAME).select("*"));
}

await knex.schema.dropTableIfExists(TABLE_NAME);

process.exit(0);

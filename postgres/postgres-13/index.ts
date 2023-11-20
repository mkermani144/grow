/**
 * Basic foreign keys and joins
 */
import knexFactory from "knex";

let knex = knexFactory({
  client: "pg",
  connection: "postgresql://postgres:1234@localhost:5432",
});

const TABLE_NAME = "users";
const SECOND_TABLE_NAME = "books";

await knex.schema.createTable(TABLE_NAME, (table) => {
  table.text("username").primary();
  table.text("name").notNullable();
  table.enum("gender", ["male", "female"]);
  table.integer("age").notNullable();
  table.integer("revenue").defaultTo(0);
  table.index("username");
});

await knex.schema.createTable(SECOND_TABLE_NAME, (table) => {
  table.text("bookname").notNullable();
  table.text("author");
  table.foreign("author").references("username").inTable(TABLE_NAME);
});

await Promise.all([
  knex(TABLE_NAME).insert({
    username: "mkermani144",
    name: "Mohammad Kermani",
    age: 27,
    revenue: 10000,
  }),
  knex(SECOND_TABLE_NAME).insert({
    bookname: "The two kinds of languages",
    author: "mkermani144",
  }),
]);

console.warn(
  await knex(TABLE_NAME)
    .join(
      SECOND_TABLE_NAME,
      `${TABLE_NAME}.username`,
      `${SECOND_TABLE_NAME}.author`
    )
    .select("bookname", "name as author")
);

await knex.schema.dropTableIfExists(SECOND_TABLE_NAME);
await knex.schema.dropTableIfExists(TABLE_NAME);

process.exit(0);

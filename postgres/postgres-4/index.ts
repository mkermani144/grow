/**
 * Constraints
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
});

try {
  await knex(TABLE_NAME).insert({
    username: "mkermani144",
    name: "Mohammad Kermani",
    gender: "male",
    bio: "I'm an engineer",
  });
  try {
    await knex(TABLE_NAME).insert({
      name: "Asghar",
      gender: "male",
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await knex(TABLE_NAME).insert({
      username: "asghar",
      gender: "male",
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await knex(TABLE_NAME).insert({
      username: "asghar",
      name: "asghar",
      gender: "not specified",
    });
  } catch (error) {
    console.error(error);
  }
  try {
    await knex(TABLE_NAME).insert({
      username: "asghar",
      name: "asghar",
      gender: "male",
      bio: "This is a looooooooong text that exceeds 30 characters limit",
    });
  } catch (error) {
    console.error(error);
  }

  console.log(await knex.select("*").from(TABLE_NAME));

  await knex(TABLE_NAME)
    .where({ username: "mkermani144" })
    .update({ bio: "I'm an engineer!" });

  console.log(await knex.select("*").from(TABLE_NAME));

  await knex(TABLE_NAME).where("name", "Mohammad Kermani").delete();

  console.log(await knex.select("*").from(TABLE_NAME));
} finally {
  await knex.schema.dropTable(TABLE_NAME);
}

process.exit(0);

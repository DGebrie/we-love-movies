// critics

exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary(); // sets supplier_id as the primary key
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};

// movies

exports.up = function (knex) {
  return knex.schema.createTable("movies", (table) => {
    table.increments("movie_id").primary(); // sets supplier_id as the primary key
    table.string("title");
    table.integer("runtime_in_minutes");
    table.string("rating");
    table.text("description");
    table.string("image_url");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("movies");
};

// theaters

exports.up = function (knex) {
  return knex.schema.createTable("theaters", (table) => {
    table.increments("theater_id").primary(); // sets supplier_id as the primary key
    table.string("name");
    table.string("address_line_1");
    table.string("address_line_2");
    table.string("city");
    table.string("state");
    table.string("zip");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("theaters");
};

// reviews

exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary(); // sets supplier_id as the primary key
    table.text("content");
    table.integer("score");
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table.integer("critic_id").unsigned().notNullable();
    table
      .foreign("critic_id")
      .references("critic_id")
      .inTable("critics")
      .onDelete("cascade");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};

// movies theaters

exports.up = function (knex) {
  return knex.schema.createTable("movies_theaters", (table) => {
    table.integer("movie_id").unsigned().notNullable(); // sets supplier_id as the primary key
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade");
    table.integer("theater_id").unsigned().notNullable(); // sets supplier_id as the primary key
    table
      .foreign("theater_id")
      .references("theater_id")
      .inTable("theaters")
      .onDelete("cascade");
    table.boolean("is_showing");
    table.timestamps(true, true); // adds created_at and updated_at columns; passing true as the first argument sets the columns to be a timestamp type while passing true as the second argument sets those columns to be non-nullable and to use the current timestamp by default
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable("movies_theaters");
};

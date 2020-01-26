
exports.up = function(knex) {
  return knex.schema.createTable("user", (t) => {
    t.increments("id").unsigned().primary();
    t.text("first_name");
    t.text("middle_name");
    t.text("last_name");
    t.text("username");
    t.text("external_id");
    t.text("email");
    t.bigInteger("phone");
    t.text("password");
    t.jsonb("meta");
    t.boolean("is_deleted");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.boolean("created_by");
    t.timestamp("updated_at").defaultTo(knex.fn.now());
    t.timestamp("updated_by");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};

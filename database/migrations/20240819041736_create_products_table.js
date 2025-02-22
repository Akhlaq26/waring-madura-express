
exports.up = function(knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.float("price").notNullable();
        table.float("stock").defaultTo(0).notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      });
    };

exports.down = function (knex) {
    return knex.schema.dropTable("products");
};

exports.up = function(knex) {
    return knex.schema.createTable('product_categories', function(table) {
      table.increments('id').primary();
      table.integer('product_id').unsigned().notNullable()
            .references('id').inTable('products').onDelete('CASCADE');
      table.integer('category_id').unsigned().notNullable()
            .references('id').inTable('categories').onDelete('CASCADE');
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTable('product_categories');
};
  
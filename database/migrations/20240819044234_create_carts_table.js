exports.up = function(knex) {
    return knex.schema.createTable('carts', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
            .references('id').inTable('users').onDelete('CASCADE');
      table.integer('product_id').unsigned().notNullable()
            .references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').unsigned().notNullable();
      table.decimal('total_price', 10, 2).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('carts');
  };
  
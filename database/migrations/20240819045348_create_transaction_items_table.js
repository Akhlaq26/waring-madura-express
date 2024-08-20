exports.up = function(knex) {
    return knex.schema.createTable('transaction_items', function(table) {
      table.increments('id').primary();
      table.integer('transaction_id').unsigned().notNullable()
            .references('id').inTable('transactions').onDelete('CASCADE');
      table.string("name").notNullable();
      table.integer('quantity').unsigned().notNullable();
      table.decimal('price', 10, 2).notNullable(); // Price of the product at the time of transaction
      table.decimal('total_price', 10, 2).notNullable(); // Price * Quantity
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transaction_items');
  };
  
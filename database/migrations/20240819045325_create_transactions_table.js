exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
            .references('id').inTable('users').onDelete('CASCADE');
      table.decimal('total_amount', 10, 2).notNullable();
      table.enum('status', ['pending', 'settlement', 'completed','failed']).notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  };
  
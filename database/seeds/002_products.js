exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { id: 1, name: 'Orange Juice', price: 10000, stock: 20},
        { id: 2, name: 'Chocolate Bar', price: 24000,stock: 100},
        { id: 3, name: 'Cheddar Cheese', price: 12000, stock: 30},
        { id: 4, name: 'Apple', price: 2000, stock: 14},
        { id: 5, name: 'Broccoli', price: 3000 ,stock: 3}
      ]);
    });
};

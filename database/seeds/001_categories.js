exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, name: 'Beverages', description: 'Drinks, including water, soda, coffee, and tea' },
        { id: 2, name: 'Snacks', description: 'Quick bites, chips, and snack bars' },
        { id: 3, name: 'Dairy', description: 'Milk, cheese, yogurt, and other dairy products' },
        { id: 4, name: 'Fruits', description: 'Fresh and dried fruits' },
        { id: 5, name: 'Vegetables', description: 'Fresh and frozen vegetables' }
      ]);
    });
};

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('product_categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('product_categories').insert([
        { id: 1, product_id: 1, category_id: 1 }, // Orange Juice -> Beverages
        { id: 2, product_id: 2, category_id: 2 }, // Chocolate Bar -> Snacks
        { id: 3, product_id: 3, category_id: 3 }, // Cheddar Cheese -> Dairy
        { id: 4, product_id: 4, category_id: 4 }, // Apple -> Fruits
        { id: 5, product_id: 5, category_id: 5 }, // Broccoli -> Vegetables
      ]);
    });
};

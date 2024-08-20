const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = function (knex) {
  return knex('users').del()
    .then( async function () {
      return knex("users").insert([
        {
          name: "Test1",
          email: "test1@maildrop.cc",
          password: await bcrypt.hash("Password123#", 10),
        },
      ]);
    });
};
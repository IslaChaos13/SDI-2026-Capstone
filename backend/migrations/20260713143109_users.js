/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
   return knex.schema.createTable('users', table => {
      table.increments('id');
      table.bool('is_admin').notNullable();
      table.bool('is_manager').notNullable();
      table.string('rank');
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('phone');
      table.string('address');
      table.string('avatar');
      table.string('password');
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('users');
};

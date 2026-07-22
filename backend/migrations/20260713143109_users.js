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
      table.string('unit');
      table.string('avatar').defaultTo('https://www.trademark.af.mil/portals/73/240801-F-DQ331-0002.png');
      table.string('password');
      table.string('duty_title');
      table.string('supervisor').nullable();
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('users');
};

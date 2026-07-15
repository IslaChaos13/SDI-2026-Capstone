/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('directory_poc', table => {
        table.increments('id')
        table.integer('id_users').references('id').inTable('users')
        table.integer('id_directory').references('id').inTable('directory')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('directory_poc')
};

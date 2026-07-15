/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user_tasks', table => {
        table.increments('id')
        table.integer('user_id').references('id').inTable('users')
        table.integer('task_id').references('id').inTable('tasks')
        table.string('priority')
        table.date('due_date')
        table.bool('is_complete')
        table.string('note')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_tasks')
};

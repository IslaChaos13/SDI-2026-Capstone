// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client:'pg',
    user:'postgres',
    password:'docker',
    connection: {
      host:'127.0.0.1',
      port:'5432',
      user:'postgres',
      password:'docker',
      database:'Functions'
    },
    migrations: {
      directory: './migrations'
    }
  },
};

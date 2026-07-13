// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    user: 'postgres',
    password: 'docker',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: '5432',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'docker',
      database: process.env.DB_NAME || 'WingmanDatabase'
    },
    migrations: {
      directory: './migrations'
    }
  },
};

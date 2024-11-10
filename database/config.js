require('dotenv').config()

module.exports = {
  development: {
    username: process.env.PGSQL_USERNAME,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    host: process.env.PGSQL_HOST,
    dialect: 'postgres',
  },
  production: {
    username: process.env.PGSQL_USERNAME,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    host: process.env.PGSQL_HOST,
    dialect: 'postgres',
  },
};

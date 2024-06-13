// MARK: - Configuration DB
const config = {
    development: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: "127.0.0.1",
      dialect: "postgres",
    },
    test: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      host: "127.0.0.1",
      dialect: "postgres",
    },
    production: {
      username: "estebansemellier",
      password: null,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "postgres",
    },
  }[process.env.NODE_ENV || "development"];

  module.exports = config;
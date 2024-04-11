// MARK: - Configuration DB
const config = {
    development: {
      username: "estebansemellier",
      password: null,
      database: "database_development",
      host: "127.0.0.1",
      dialect: "postgres",
    },
    test: {
      username: "estebansemellier",
      password: null,
      database: "database_test",
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
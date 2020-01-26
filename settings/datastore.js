const knexClient = require("knex");

const knex = knexClient({
  client: "pg",
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
  },
  pool: { min: 0, max: 7 }
});

module.exports = knex;

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "cliente",
    password: "password",
    host: "143.198.170.87",
    port: 5432,
    database: "odontologia"
});

module.exports = pool;
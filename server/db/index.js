const pg = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: '',
    user: '',
    password: '',
    max: 30 // use up to 30 connections

    // "types" - in case you want to set custom type parsers on the pool level
};

const db = pg(cn)

async function testConnection() {
    const c = await db.connect(); // try to connect
    c.done(); // success, release connection
    return c.client.serverVersion; // return server version
}

module.exports = db;

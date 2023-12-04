const initOptions = {
    // global event notification;
    error(error, e) {
        if (e.cn) {
            // A connection-related error;
            //
            // Connections are reported back with the password hashed,
            // for safe errors logging, without exposing passwords.
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error);
        }
    }
};

const pg = require('pg-promise')(initOptions);

const cn = {
    host: process.env.DB_URL,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: process.env.DB_PW,
    max: 30 // use up to 30 connections

    // "types" - in case you want to set custom type parsers on the pool level
};

const db = pg(cn)

async function testConnection() {
    const c = await db.connect(); // try to connect
    console.log('Connected: ' + c.client.serverVersion);
    c.done(); // success, release connection
}

testConnection();
module.exports = db;

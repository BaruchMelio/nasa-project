const { AuthTypes, Connector, IpAddressTypes } = require('@google-cloud/cloud-sql-connector')
const mysql = require('mysql2/promise')

require('dotenv').config();

var pool;

async function mysqlConnect() {
    const connector = new Connector()
    const clientOpts = await connector.getOptions({
        instanceConnectionName: process.env.MY_SQL_CONNECTION,
        ipType: IpAddressTypes.PUBLIC,
        authType: AuthTypes.PASSWORD,
    })

    pool = await mysql.createPool({
        ...clientOpts,
        user: process.env.MY_SQL_USER,
        password: process.env.MY_SQL_PASSWORD,
        database: process.env.MY_SQL_DATABASE,
    })

    return await pool.getConnection()
}

async function mysqlDisconnect(conn) {
    if (pool) {
        await pool.end();
    }
    conn.close();
}

module.exports = {
    mysqlConnect,
    mysqlDisconnect,
}


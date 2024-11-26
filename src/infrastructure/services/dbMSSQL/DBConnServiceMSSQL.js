const { DBConnCouldNotConnectEx, DBConnCouldNotDisconnectEx } = require("../../../domain/exceptions/DBConnExceptions");
const { IDBConn } = require("../../../domain/interfaces/conn/IDBConn");
const { DBConnService } = require("../DBConnService");
const sql = require("mssql");
const { DBConnConfigMSSQL } = require("./DBConnConfigMSSQL");
const { DBConnMSSQL } = require("./DBConnMSSQL");

/**
* @class DBConnServiceMSSQL
* @extends {DBConnService<DBConnMSSQL, DBConnConfigMSSQL>}
*/
class DBConnServiceMSSQL extends DBConnService{
    /**
    * @returns {Promise<IDBConn | null>}
    */
    async Open(){
        let sqlConn = await sql.connect({
            user : this.config.user,
            password : this.config.pass,
            database : this.config.db,
            server : this.config.host,
            port : this.config.port,
            pool : this.config.pool,
            options : this.config.options
        })

        if(!sqlConn.connected){ throw new DBConnCouldNotConnectEx() }

        this.conn = new DBConnMSSQL(sqlConn, this.config)

        return this.conn
    }

    /**
     * @returns {void}
     */
    Close(){
        if(!this.conn || !this.conn.IsConnnected()){
            throw new DBConnCouldNotDisconnectEx("Connection is not open")
        }

        let error = ""

        this.conn.connObj.close(err => error = err)

        if(error != ""){ throw new DBConnCouldNotDisconnectEx() }
    }
}

module.exports = {
    DBConnServiceMSSQL
}
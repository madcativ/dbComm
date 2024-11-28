const { DBConnCouldNotConnectEx, DBConnCouldNotDisconnectEx } = require("../../../domain/exceptions/DBConnExceptions");
const { DBConnService } = require("../DBConnService");
const sql = require("mssql");
const { DBConnMSSQL } = require("./DBConnMSSQL");

class DBConnServiceMSSQL extends DBConnService{
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
const { IDBConn } = require("../../../domain/interfaces/conn/IDBConn")
const sql = require("mssql")
const { IDBConnConfig } = require("../../../domain/interfaces/conn/IDBConnConfig")
const { DBConnIsNullEx } = require("../../../domain/exceptions/DBConnExceptions")

class DBConnMSSQL extends IDBConn{
    connObj
    config

    constructor(connObj, config){
        super()
        this.connObj = connObj
        this.config = config
    }

    IsConnnected(){
        if (this.connObj == null) { throw new DBConnIsNullEx() }

        return this.connObj.connected
    }
}

module.exports = {
    DBConnMSSQL
}
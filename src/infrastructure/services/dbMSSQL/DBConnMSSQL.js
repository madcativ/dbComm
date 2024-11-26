const { IDBConn } = require("../../../domain/interfaces/conn/IDBConn")
const sql = require("mssql")
const { IDBConnConfig } = require("../../../domain/interfaces/conn/IDBConnConfig")
const { DBConnIsNullEx } = require("../../../domain/exceptions/DBConnExceptions")

/**
 * @class DBConnMSSQL
 * @implements {IDBConn}
 * @extends {IDBConn}
 */
class DBConnMSSQL extends IDBConn{
    
    /** @type {sql.ConnectionPool} */
    connObj

    
    /** @type {IDBConnConfig} */
    config

    /**
     * @constructor
     * @param {sql.ConnectionPool} connObj
     * @param {IDBConnConfig} config
     */
    constructor(connObj, config){
        super()
        this.connObj = connObj
        this.config = config
    }

    /**
    * @returns {boolean}
    */
    IsConnnected(){
        if (this.connObj == null) { throw new DBConnIsNullEx() }

        return this.connObj.connected
    }
}

module.exports = {
    DBConnMSSQL
}
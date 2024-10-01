import { DBConnIsNullEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn"
import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"
import sql from "mssql"

export default class DBConnMSSQL implements IDBConn {
    connObj : sql.ConnectionPool
    config : IDBConnConfig

    constructor(connObj : sql.ConnectionPool, config : IDBConnConfig) {
        this.connObj = connObj
        this.config = config
    }

    IsConnnected(): boolean {
        if (this.connObj == null) { throw new DBConnIsNullEx() }

        return this.connObj.connected
    }
}
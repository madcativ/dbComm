import { DBConnIsNullEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import sql from "mssql"
import DBConn from "../DBConn"

export default class DBConnMSSQL extends DBConn<sql.ConnectionPool>{
    IsConnnected() : boolean {
        if(this.conn == null){ throw new DBConnIsNullEx() }

        return this.conn.connected
    }
}
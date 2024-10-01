import { DBConnCouldNotConnectEx, DBConnCouldNotDisconnectEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn"
import sql from "mssql"
import DBConnService from "../DBConnService"
import DBConnConfigMSSQL from "./DBConnConfigMSSQL"
import DBConnMSSQL from "./DBConnMSSQL"

export default class DBConnMSSQLService extends DBConnService<DBConnMSSQL, DBConnConfigMSSQL>{
    async Open() : Promise<IDBConn>{
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
import { DBConnCouldNotConnectEx, DBConnCouldNotDisconnectEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn"
import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"
import sql from "mssql"
import DBConnService from "../DBConnService"
import DBConnMSSQL from "./DBConnMSSQL"

export default class DBConnMSSQLService extends DBConnService<sql.ConnectionPool>{
    constructor(config : IDBConnConfig<sql.config>){
        super(config)
    }

    async Open() : Promise<IDBConn<sql.ConnectionPool>>{
        let sqlConn = await sql.connect(this.config.GetConfig())

        if(!sqlConn.connected){ throw new DBConnCouldNotConnectEx() }

        this.dbConn = new DBConnMSSQL(sqlConn)

        return this.dbConn
    }

    Close() : void{
        if(!this.dbConn || !this.dbConn.IsConnnected()){
            throw new DBConnCouldNotDisconnectEx("Connection is not open")
        }

        let error = ""

        this.dbConn.GetConn().close(err => error = err)

        if(error != ""){ throw new DBConnCouldNotDisconnectEx() }
    }
}
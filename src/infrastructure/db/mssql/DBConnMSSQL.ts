import { DBConnBadConfigEx, DBConnCouldNotDisconnectEx, DBConnIsNullEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn"
import sql from "mssql"
import DBConnConfigMSSQL from "./DBConnConfigMSSQL"

export default class DBConnMSSQL implements IDBConn {
    connObj : sql.ConnectionPool
    config : DBConnConfigMSSQL

    constructor(config? : DBConnConfigMSSQL){
        this.config = config
    }

    async Open(config? : DBConnConfigMSSQL) : Promise<void> {
        if(config){ this.config = config }
        if(!this.config || !this.config.IsValid()){ throw new DBConnBadConfigEx() }

        this.connObj = await sql.connect({
            user : this.config.user,
            password : this.config.pass,
            server : this.config.host,
            port : this.config.port,
            database : this.config.db,
            pool : this.config.pool,
            options : this.config.options
        })
    }

    Close() {
        if(!this.connObj || !this.IsConnnected()){
            throw new DBConnCouldNotDisconnectEx("Connection is not open")
        }

        let error = ""

        this.connObj.close(err => error = err)

        if(error != ""){ throw new DBConnCouldNotDisconnectEx() }
    }

    IsConnnected() : boolean {
        if (!this.connObj){ return false }

        return this.connObj.connected
    }
}
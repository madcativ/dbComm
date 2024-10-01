import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"

export const defaultPool = {
    max : 10,
    min : 0,
    idleTimeoutMillis : 30000
}

export const defaultOptions = {
    encrypt : false,
    trustServerCertificate : true
}

export default class DBConnConfigMSSQL implements IDBConnConfig{
    user : string
    pass : string
    db : string
    host : string
    port : number
    pool : typeof defaultPool
    options : typeof defaultOptions

    constructor(
        user : string = process.env.MSSQL_USER,
        pass : string = process.env.MSSQL_PASS,
        db : string = process.env.MSSQL_DB,
        host : string = process.env.MSSQL_HOST,
        port : number = parseInt(process.env.MSSQL_PORT),
        pool : typeof defaultPool = defaultPool,
        options : typeof defaultOptions = defaultOptions
    ){
        this.user = user
        this.pass = pass
        this.db = db
        this.host = host
        this.port = port
        this.pool = pool
        this.options = options
    }

    IsValid() : boolean {
        return (
            this.user != "" &&
            this.pass != "" &&
            this.db != "" &&
            this.host != "" &&
            this.port > 0
        )
    }

    RevertDefault() : void {
        this.user = process.env.MSSQL_USER
        this.pass = process.env.MSSQL_PASS
        this.db = process.env.MSSQL_DB
        this.host = process.env.MSSQL_HOST
        this.port = parseInt(process.env.MSSQL_PORT)
        this.pool = defaultPool,
        this.options = defaultOptions
    }
}
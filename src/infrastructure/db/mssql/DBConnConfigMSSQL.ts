import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"
import { DEFAULT_DB_DATABASE, DEFAULT_DB_HOST, DEFAULT_DB_MSSQL_OPTIONS, DEFAULT_DB_MSSQL_POOL, DEFAULT_DB_PASS, DEFAULT_DB_PORT, DEFAULT_DB_USER } from "../../contants/DefaultsDBConnConfig"

export default class DBConnConfigMSSQL implements IDBConnConfig{
    user : string
    pass : string
    db : string
    host : string
    port : number
    pool : typeof DEFAULT_DB_MSSQL_POOL
    options : typeof DEFAULT_DB_MSSQL_OPTIONS

    constructor(
        user : string = DEFAULT_DB_USER,
        pass : string = DEFAULT_DB_PASS,
        db : string = DEFAULT_DB_DATABASE,
        host : string = DEFAULT_DB_HOST,
        port : number = DEFAULT_DB_PORT,
        pool : typeof DEFAULT_DB_MSSQL_POOL = DEFAULT_DB_MSSQL_POOL,
        options : typeof DEFAULT_DB_MSSQL_OPTIONS = DEFAULT_DB_MSSQL_OPTIONS
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
            this.user &&
            this.pass &&
            this.db &&
            this.host &&
            this.port && this.port > 0 &&
            (
                this.pool &&
                "max" in this.pool &&
                "min" in this.pool &&
                "idleTimeoutMillis" in this.pool
            ) &&
            (
                this.options &&
                "encrypt" in this.options &&
                "trustServerCertificate" in this.options
            )
        )
    }

    RevertDefault() : void {
        this.user = DEFAULT_DB_USER
        this.pass = DEFAULT_DB_PASS
        this.db = DEFAULT_DB_DATABASE
        this.host = DEFAULT_DB_HOST
        this.port = DEFAULT_DB_PORT
        this.pool = DEFAULT_DB_MSSQL_POOL,
        this.options = DEFAULT_DB_MSSQL_OPTIONS
    }
}
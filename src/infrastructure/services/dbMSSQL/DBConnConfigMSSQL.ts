import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"
import { DEFAULT_DB_DATABASE, DEFAULT_DB_HOST, DEFAULT_DB_PASS, DEFAULT_DB_PORT, DEFAULT_DB_USER } from "../../contants/DefaultsDBConnConfig"

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
        user : string = DEFAULT_DB_USER,
        pass : string = DEFAULT_DB_PASS,
        db : string = DEFAULT_DB_DATABASE,
        host : string = DEFAULT_DB_HOST,
        port : number = DEFAULT_DB_PORT,
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
        this.user = DEFAULT_DB_USER
        this.pass = DEFAULT_DB_PASS
        this.db = DEFAULT_DB_DATABASE
        this.host = DEFAULT_DB_HOST
        this.port = DEFAULT_DB_PORT
        this.pool = defaultPool,
        this.options = defaultOptions
    }
}
const { IDBConnConfig } = require("../../../domain/interfaces/conn/IDBConnConfig")
const { DEFAULT_DB_USER, DEFAULT_DB_PASS, DEFAULT_DB_DATABASE, DEFAULT_DB_HOST, DEFAULT_DB_PORT } = require("../../contants/DefaultsDBConnConfig")

const defaultPool = {
    max : 10,
    min : 0,
    idleTimeoutMillis : 30000
}

const defaultOptions = {
    encrypt : false,
    trustServerCertificate : true    
}

class DBConnConfigMSSQL extends IDBConnConfig{
    pool
    options
    
    constructor(
        user = DEFAULT_DB_USER,
        pass = DEFAULT_DB_PASS,
        db = DEFAULT_DB_DATABASE,
        host = DEFAULT_DB_HOST,
        port = DEFAULT_DB_PORT,
        pool = defaultPool,
        options = defaultOptions
    ){
        super()
        this.user = user
        this.pass = pass
        this.db = db
        this.host = host
        this.port = port
        this.pool = pool
        this.options = options
    }

    IsValid(){
        return (
            this.user != "" &&
            this.pass != "" &&
            this.db != "" &&
            this.host != "" &&
            this.port > 0
        )
    }
    
    RevertDefault(){
        this.user = DEFAULT_DB_USER
        this.pass = DEFAULT_DB_PASS
        this.db = DEFAULT_DB_DATABASE
        this.host = DEFAULT_DB_HOST
        this.port = DEFAULT_DB_PORT
        this.pool = defaultPool,
        this.options = defaultOptions
    }
}

module.exports = {
    DBConnConfigMSSQL
}
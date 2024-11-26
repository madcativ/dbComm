const { IDBConnConfig } = require("../../../domain/interfaces/conn/IDBConnConfig")
const { DEFAULT_DB_USER, DEFAULT_DB_PASS, DEFAULT_DB_DATABASE, DEFAULT_DB_HOST, DEFAULT_DB_PORT } = require("../../contants/DefaultsDBConnConfig")

/** @type {{ max: number; min: number; idleTimeoutMillis: number; }} */
const defaultPool = {
    max : 10,
    min : 0,
    idleTimeoutMillis : 30000
}

/** @type {{ encrypt: boolean; trustServerCertificate: boolean; }} */
const defaultOptions = {
    encrypt : false,
    trustServerCertificate : true    
}


/**
 * @class DBConnConfigMSSQL
 * @extends {IDBConnConfig}
 * @implements {IDBConnConfig}
 */
class DBConnConfigMSSQL extends IDBConnConfig{
    /** @type {typeof defaultPool} */
    pool

    /** @type {typeof defaultOptions} */
    options
    
    /**
     * @constructor
     * @param {string} user
     * @param {string} pass
     * @param {string} db
     * @param {string} host
     * @param {number} port
     * @param {typeof defaultPool} pool
     * @param {typeof defaultOptions} options
     */
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

    /**
    * @returns {boolean}
    */
    IsValid(){
        return (
            this.user != "" &&
            this.pass != "" &&
            this.db != "" &&
            this.host != "" &&
            this.port > 0
        )
    }

    /**
    * @returns {void}
    */
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
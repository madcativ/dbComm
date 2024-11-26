const { DBConnBadConfigEx } = require("../../domain/exceptions/DBConnExceptions")
const { IDBConn } = require("../../domain/interfaces/conn/IDBConn")
const { IDBConnConfig } = require("../../domain/interfaces/conn/IDBConnConfig")
const { IDBConnService } = require("../../domain/interfaces/conn/IDBConnService")

/**
 * @class DBConnService
 * @implements {IDBConnService}
 * @extends {IDBConnService}
 * @template {IDBConn} T
 * @template {IDBConnConfig} U
 */
class DBConnService extends IDBConnService{
    /** @type {T} */
    conn
    
    /** @type {U} */
    config

    /**
     * @constructor
     * @param {U} config
     */
    constructor(config){
        super()
        
        if(!config.IsValid()){ throw new DBConnBadConfigEx() }

        this.config = config
    }

    /**
    * @returns {Promise<T | null>}
    */
    async Open(){ return null }

    /**
     * @returns {void}
     */
    Close(){}
}

module.exports = {
    DBConnService
}
const { IDBCallsRequestQuery } = require("../../domain/interfaces/calls/IDBCallsRequestQuery");
const { IDBCallsRequestSP } = require("../../domain/interfaces/calls/IDBCallsRequestSP");
const { IDBCallsResult } = require("../../domain/interfaces/calls/IDBCallsResult");
const { IDBCallsService } = require("../../domain/interfaces/calls/IDBCallsService");
const { IDBConnService } = require("../../domain/interfaces/conn/IDBConnService");

/**
* @class DBCallsService
* @implements {IDBCallsService}
* @extends {IDBCallsService}
*/
class DBCallsService extends IDBCallsService{
    /** @type {IDBConnService} */
    dbConnService

    /**
     * @constructor
     * @param {IDBConnService} dbConnService
     */
    constructor(dbConnService){
        super()
        this.dbConnService = dbConnService
    }

    
    /**
     * @async
     * @template U
     * @param {IDBCallsRequestQuery} request
     * @returns {Promise<IDBCallsResult<U>>}
     */
    async CallQuery(request){ return null }

    
    /**
     * @async
     * @template U
     * @param {IDBCallsRequestSP} request
     * @returns {Promise<IDBCallsResult<U>>}
     */
    async CallSP(request){ return null }
}

module.exports = {
    DBCallsService
}
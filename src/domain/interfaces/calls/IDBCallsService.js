const { IDBConnService } = require("../conn/IDBConnService")
const { IDBCallsRequestQuery } = require("./IDBCallsRequestQuery")
const { IDBCallsRequestSP } = require("./IDBCallsRequestSP")
const { IDBCallsResult } = require("./IDBCallsResult")

/**
 * @interface IDBCallsService
 */
class IDBCallsService{
    /**
    * @type {IDBConnService}
    * @readonly
    */
    dbConnService

    /**
     * @abstract
     * @template T
     * @param {IDBCallsRequestQuery} request
     * @returns {Promise<IDBCallsResult<T>>}
     */
    CallQuery(request){ return null }
    
    /**
     * @abstract
     * @template T
     * @param {IDBCallsRequestSP} request
     * @returns {Promise<IDBCallsResult<T>>}
     */
    CallSP(request){ return null}
}

module.exports = {
    IDBCallsService
}
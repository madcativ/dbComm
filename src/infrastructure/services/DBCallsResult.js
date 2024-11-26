const { IDBCallsResult } = require("../../domain/interfaces/calls/IDBCallsResult");

/**
 * @class DBCallsResult
 * @template T
 * @implements {IDBCallsResult<T>}
 * @extends {IDBCallsResult}
 */
class DBCallsResult extends IDBCallsResult{
    /** @type {Array<T>} */
    result

    
    /**
     * @constructor
     * @param {Array<T>} result
     */
    constructor(result){
        super()
        this.result = result
    }
}

module.exports = {
    DBCallsResult
}
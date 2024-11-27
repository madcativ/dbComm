const { IDBCallsResult } = require("../../domain/interfaces/calls/IDBCallsResult");

/**
 * @class DBCallsResult
 * @template T, U
 * @implements {IDBCallsResult<T>}
 * @extends {IDBCallsResult}
 */
class DBCallsResult extends IDBCallsResult{
    /** @type {Array<T>} */
    result

    /** @type {?U} */
    output
    
    /**
     * @constructor
     * @param {Array<T>} result
     * @param {U} [output]
     */
    constructor(result = null, output = null){
        super()
        this.result = result
        this.output = output
    }
}

module.exports = {
    DBCallsResult
}
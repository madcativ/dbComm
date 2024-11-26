const { IDBCallsRequestQuery } = require("../../domain/interfaces/calls/IDBCallsRequestQuery");
const { QueryParam } = require("../../domain/valueObjs/QueryParam");

/**
 * @class DBCallsRequestQuery
 * @implements {IDBCallsRequestQuery}
 * @extends {IDBCallsRequestQuery}
 */
class DBCallsRequestQuery extends IDBCallsRequestQuery{
    /** @type {string} */
    query
    
    /** @type {?Array<QueryParam>} */
    data

    /**
     * @constructor
     * @param {string} query
     * @param {?Array<QueryParam>} [data]
     */
    constructor(query, data){
        super()
        this.query = query
        this.data = data
    }
}

module.exports = {
    DBCallsRequestQuery
}
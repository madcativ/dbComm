const { QueryParam } = require("../../valueObjs/QueryParam")

/**
 * @interface IDBCallsRequestQuery
 */
class IDBCallsRequestQuery{
    /** @type {string}; @readonly */
    query
    
    /** @type {?Array<QueryParam>}; @readonly */
    data
}

module.exports = {
    IDBCallsRequestQuery
}
const { SPParam } = require("../../valueObjs/SPParam")

/**
 * @interface IDBCallsRequestSP
 */
class IDBCallsRequestSP{
    /** @type {string}; @readonly */
    spName
    
    /** @type {Array<SPParam>}; @readonly */
    params
}

module.exports = {
    IDBCallsRequestSP
}
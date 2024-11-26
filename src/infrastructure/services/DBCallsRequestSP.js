const { IDBCallsRequestSP } = require("../../domain/interfaces/calls/IDBCallsRequestSP");
const { SPParam } = require("../../domain/valueObjs/SPParam");

/**
 * @class DBCallsRequestSP
 * @implements {IDBCallsRequestSP}
 * @extends {IDBCallsRequestSP}
 */
class DBCallsRequestSP extends IDBCallsRequestSP{
    /** @type {string} */
    spName
    
    /** @type {Array<SPParam>} */
    params

    /**
     * @constructor
     * @param {string} spName
     * @param {Array<SPParam>} params
     */
    constructor(spName, params){
        super()
        this.spName = spName
        this.params = params
    }
}

module.exports = {
    DBCallsRequestSP
}
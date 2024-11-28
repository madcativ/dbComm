const { IDBCallsRequestSP } = require("../../domain/interfaces/calls/IDBCallsRequestSP");

class DBCallsRequestSP extends IDBCallsRequestSP{
    spName
    params

    constructor(spName, params){
        super()
        this.spName = spName
        this.params = params
    }
}

module.exports = {
    DBCallsRequestSP
}
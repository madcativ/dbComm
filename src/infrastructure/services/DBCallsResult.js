const { IDBCallsResult } = require("../../domain/interfaces/calls/IDBCallsResult");

class DBCallsResult extends IDBCallsResult{
    result
    output
    
    constructor(result = null, output = null){
        super()
        this.result = result
        this.output = output
    }
}

module.exports = {
    DBCallsResult
}
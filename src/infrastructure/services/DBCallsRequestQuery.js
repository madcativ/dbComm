const { IDBCallsRequestQuery } = require("../../domain/interfaces/calls/IDBCallsRequestQuery");

class DBCallsRequestQuery extends IDBCallsRequestQuery{
    query
    data

    constructor(query, data){
        super()
        this.query = query
        this.data = data
    }
}

module.exports = {
    DBCallsRequestQuery
}
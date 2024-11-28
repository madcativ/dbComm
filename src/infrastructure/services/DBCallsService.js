const { IDBCallsService } = require("../../domain/interfaces/calls/IDBCallsService");

class DBCallsService extends IDBCallsService{
    dbConnService

    constructor(dbConnService){
        super()
        this.dbConnService = dbConnService
    }

    async CallQuery(request){ return null }

    async CallSP(request){ return null }
}

module.exports = {
    DBCallsService
}
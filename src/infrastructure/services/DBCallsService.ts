import IDBCallsRequestQuery from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestQuery"
import IDBCallsRequestSP from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestSP"
import IDBCallsResult from "@dbComm/src/domain/interfaces/calls/IDBCallsResult"
import IDBCallsService from "@dbComm/src/domain/interfaces/calls/IDBCallsService"
import IDBConnService from "@dbComm/src/domain/interfaces/conn/IDBConnService"

export default class DBCallsService<T> implements IDBCallsService{
    dbConnService : IDBConnService<T>

    constructor(dbConnService : IDBConnService<T>){
        this.dbConnService = dbConnService
    }

    async CallQuery<U>(request : IDBCallsRequestQuery) : Promise<IDBCallsResult<U>>{ return null }

    async CallSP<U>(request : IDBCallsRequestSP) : Promise<IDBCallsResult<U>>{ return null }
}
import IDBConnService from "../conn/IDBConnService"
import IDBCallsRequestQuery from "./IDBCallsRequestQuery"
import IDBCallsRequestSP from "./IDBCallsRequestSP"
import IDBCallsResult from "./IDBCallsResult"

export default interface IDBCallsService{
    dbConnService : IDBConnService
    CallQuery<T>(request : IDBCallsRequestQuery) : Promise<IDBCallsResult<T>>
    CallSP<T>(request : IDBCallsRequestSP) : Promise<IDBCallsResult<T>>
}
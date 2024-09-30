import IDBCallsRequestQuery from "./IDBCallsRequestQuery"
import IDBCallsRequestSP from "./IDBCallsRequestSP"
import IDBCallsResult from "./IDBCallsResult"

export default interface IDBCallsService{
    CallQuery<T>(request : IDBCallsRequestQuery) : Promise<IDBCallsResult<T>>
    CallSP<T>(request : IDBCallsRequestSP) : Promise<IDBCallsResult<T>>
}
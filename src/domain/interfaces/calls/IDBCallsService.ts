import IDBCallsRequestQuery from "./IDBCallsRequestQuery"
import IDBCallsRequestSP from "./IDBCallsRequestSP"
import IDBCallsResultQuery from "./IDBCallsResultQuery"
import IDBCallsResultSP from "./IDBCallsResultSP"

export default interface IDBCallsService{
    CallQuery<T>(request : IDBCallsRequestQuery) : Promise<IDBCallsResultQuery<T>>
    CallSP<T, U = {}>(request : IDBCallsRequestSP) : Promise<IDBCallsResultSP<T, U>>
}
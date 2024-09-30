import IDBCallsResult from "@dbComm/src/domain/interfaces/calls/IDBCallsResult"

export default class DBCallsResult<T> implements IDBCallsResult<T>{
    result : Array<T>

    constructor(result : Array<T>){
        this.result = result
    }
}
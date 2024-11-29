import IDBCallsResult from "@dbComm/src/domain/interfaces/calls/IDBCallsResultQuery"

export default class DBCallsResult<T, U> implements IDBCallsResult<T, U>{
    result : T
    output : U

    constructor(result : T = null, output : U = null){
        this.result = result
        this.output = output
    }
}
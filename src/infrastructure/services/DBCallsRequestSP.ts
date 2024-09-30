import IDBCallsRequestSP from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestSP"
import SPParam from "@dbComm/src/domain/valueObjs/SPParam"

export default class DBCallsRequestSP implements IDBCallsRequestSP{
    spName : string
    params : Array<SPParam>

    constructor(spName : string, params : Array<SPParam>){
        this.spName = spName
        this.params = params
    }
}
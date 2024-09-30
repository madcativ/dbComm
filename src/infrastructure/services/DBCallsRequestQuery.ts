import IDBCallsRequestQuery from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestQuery"
import QueryParam from "@dbComm/src/domain/valueObjs/QueryParam"

export default class DBCallsRequestQuery implements IDBCallsRequestQuery{
    query : string
    data? : Array<QueryParam>

    constructor(query : string, data? : Array<QueryParam>){
        this.query = query
        this.data = data
    }
}
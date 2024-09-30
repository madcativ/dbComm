import QueryParam from "../../valueObjs/QueryParam"

export default interface IDBCallsRequestQuery{
    query : string
    data? : Array<QueryParam>
}
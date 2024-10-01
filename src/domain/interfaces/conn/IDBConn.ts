import IDBConnConfig from "./IDBConnConfig"

export default interface IDBConn{
    connObj : any
    config : IDBConnConfig
    IsConnnected() : boolean
}
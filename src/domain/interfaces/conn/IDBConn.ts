import IDBConnConfig from "./IDBConnConfig"

export default interface IDBConn{
    Open(config? : IDBConnConfig) : Promise<void>
    Close() : void
    IsConnnected() : boolean
}
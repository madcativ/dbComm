import IDBConn from "./IDBConn"

export default interface IDBConnService<T>{
    Open() : Promise<IDBConn<T>>
    Close() : void
}
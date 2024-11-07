import IDBConn from "./IDBConn"

export default interface IDBConnService{
    conn : IDBConn
    Open() : Promise<IDBConn | null>
    Close() : void
}
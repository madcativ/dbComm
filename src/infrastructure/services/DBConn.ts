import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn"

export default class DBConn<T> implements IDBConn<T>{
    conn : T

    constructor(conn : T){ this.conn = conn }

    GetConn() : T{ return this.conn }

    IsConnnected() : boolean{ return false }
}
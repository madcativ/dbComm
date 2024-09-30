import { DBConnBadConfigEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn"
import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"
import IDBConnService from "@dbComm/src/domain/interfaces/conn/IDBConnService"

export default class DBConnService<T> implements IDBConnService<T>{
    dbConn : IDBConn<T>
    config : IDBConnConfig<any>

    constructor(config : IDBConnConfig<any>){
        this.config = config

        if(!this.config.IsValid()){ throw new DBConnBadConfigEx() }
    }

    async Open() : Promise<IDBConn<any>>{ return null }

    Close() : void{  }
}
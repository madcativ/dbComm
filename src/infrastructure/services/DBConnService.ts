import { DBConnBadConfigEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn"
import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"
import IDBConnService from "@dbComm/src/domain/interfaces/conn/IDBConnService"

export default class DBConnService<T extends IDBConn, U extends IDBConnConfig> implements IDBConnService{
    conn : T
    config : U

    constructor(config : U){
        if(!config.IsValid()){ throw new DBConnBadConfigEx() }

        this.config = config
    }

    async Open() : Promise<T | null>{ return null }

    Close() : void{  }
}
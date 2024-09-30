import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig"

export default class DBConnConfig<T> implements IDBConnConfig<T>{
    defaultConfig : T
    config : T

    constructor(defaultConfig : T, config? : T){
        this.defaultConfig = defaultConfig
        this.config = config ?? this.defaultConfig
    }

    GetConfig() : T { return this.config }

    IsValid() : boolean{ return false }

    RevertDefault() : void{ this.config = this.defaultConfig }
}
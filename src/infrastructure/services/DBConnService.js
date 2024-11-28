const { DBConnBadConfigEx } = require("../../domain/exceptions/DBConnExceptions")
const { IDBConnService } = require("../../domain/interfaces/conn/IDBConnService")

class DBConnService extends IDBConnService{
    conn
    config

    constructor(config){
        super()
        if(!config.IsValid()){ throw new DBConnBadConfigEx() }
        this.config = config
    }

    async Open(){ return null }

    Close(){}
}

module.exports = {
    DBConnService
}
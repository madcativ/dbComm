const { IDBConnService } = require("../../domain/interfaces/conn/IDBConnService");
const { DBConnConfigMSSQL } = require("../services/dbMSSQL/DBConnConfigMSSQL");
const { DBConnServiceMSSQL } = require("../services/dbMSSQL/DBConnServiceMSSQL");

/**
* @class DBConnServiceFactory
*/
class DBConnServiceFactory{
    
    /**
     * @param {string} [serviceName = "mssql"]
     * @param {*} [config]
     * @returns {IDBConnService}
     */
    Get(serviceName = "mssql", config){
        switch(serviceName){
            case "mssql" :
                const dbConnConfigMSSQL = config === undefined
                    ? new DBConnConfigMSSQL()
                    : new DBConnConfigMSSQL(config.user, config.password, config.database, config.server, config.port)
                return new DBConnServiceMSSQL(dbConnConfigMSSQL)
            default :
                return null
        }
    }
}

module.exports = {
    DBConnServiceFactory
}
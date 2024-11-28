const { DBConnConfigMSSQL } = require("../services/dbMSSQL/DBConnConfigMSSQL");
const { DBConnServiceMSSQL } = require("../services/dbMSSQL/DBConnServiceMSSQL");

class DBConnServiceFactory{
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
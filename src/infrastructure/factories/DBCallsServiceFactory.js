const { DBCallsMSSQLService } = require("../services/dbMSSQL/DBCallsMSSQLService")
const { DBConnServiceFactory } = require("./DBConnServiceFactory")

class DBCallsServiceFactory{
    Get(serviceName = "mssql", config){
        switch(serviceName){
            case "mssql" :
                const dbConnService = new DBConnServiceFactory().Get("mssql", config)
                return new DBCallsMSSQLService(dbConnService)
            default :
                return null
        }
    }
}

module.exports = {
    DBCallsServiceFactory
}
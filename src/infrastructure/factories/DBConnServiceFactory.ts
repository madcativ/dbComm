import IDBConnService from "@dbComm/src/domain/interfaces/conn/IDBConnService"
import DBConnConfigMSSQL from "../services/dbMSSQL/DBConnConfigMSSQL"
import DBConnMSSQLService from "../services/dbMSSQL/DBConnServiceMSSQL"

export default class DBConnServiceFactory{
    Get(serviceName : string = "mssql", config? : any) : IDBConnService{
        switch(serviceName){
            case "mssql" :
                const dbConnConfigMSSQL = config === undefined
                    ? new DBConnConfigMSSQL()
                    : new DBConnConfigMSSQL(config.user, config.password, config.database, config.server, config.port)
                return new DBConnMSSQLService(dbConnConfigMSSQL)
            default :
                return null
        }
    }
}
import IDBConnService from "@dbComm/src/domain/interfaces/conn/IDBConnService"
import DBConnConfigMSSQL from "../services/dbMSSQL/DBConnConfigMSSQL"
import DBConnMSSQLService from "../services/dbMSSQL/DBConnMSSQLService"

export default class DBConnServiceFactory{
    Get(serviceName : string = "mssql", config? : any) : IDBConnService{
        switch(serviceName){
            case "mssql" :
                const dbConnConfigMSSQL = config === undefined
                    ? new DBConnConfigMSSQL()
                    : new DBConnConfigMSSQL(config.user, config.pass, config.db, config.host, config.port)
                return new DBConnMSSQLService(dbConnConfigMSSQL)
            default :
                return null
        }
    }
}
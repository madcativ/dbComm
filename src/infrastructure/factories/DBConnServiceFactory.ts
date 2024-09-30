import IDBConnService from "@dbComm/src/domain/interfaces/conn/IDBConnService"
import DBConnConfigMSSQL from "../services/dbMSSQL/DBConnConfigMSSQL"
import DBConnMSSQLService from "../services/dbMSSQL/DBConnMSSQLService"

export default class DBConnServiceFactory{
    Get(serviceName : string = "mssql", config? : any) : IDBConnService<any>{
        switch(serviceName){
            case "mssql" :
                return new DBConnMSSQLService(
                    new DBConnConfigMSSQL(config)
                )
            default :
                return null
        }
    }
}
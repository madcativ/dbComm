import IDBCallsService from "@dbComm/src/domain/interfaces/calls/IDBCallsService";
import DBCallsMSSQLService from "../services/dbMSSQL/DBCallsMSSQLService";
import DBConnServiceFactory from "./DBConnServiceFactory";

export default class DBCallsServiceFactory{
    Get(serviceName : string = "mssql", config? : any) : IDBCallsService{
        switch(serviceName){
            case "mssql" :
                const dbConnService = new DBConnServiceFactory().Get("mssql", config)
                return new DBCallsMSSQLService(dbConnService)
            default :
                return null
        }
    }
}
import IDBCallsService from "@dbComm/src/domain/interfaces/calls/IDBCallsService";
import DBCallsMSSQLService from "../services/dbMSSQL/DBCallsMSSQLService";
import DBConnServiceFactory from "./DBConnServiceFactory";

export default class DBCallsServiceFactory{
    Get(serviceName : string = "mssql", config? : any) : IDBCallsService{
        switch(serviceName){
            case "mssql" :
                return new DBCallsMSSQLService(new DBConnServiceFactory().Get("mssql", config))
            default :
                return null
        }
    }
}
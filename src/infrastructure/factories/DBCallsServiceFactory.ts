import IDBCallsService from "@dbComm/src/domain/interfaces/calls/IDBCallsService";
import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig";
import DBVendors from "@dbComm/src/domain/valueObjs/DBVendors";
import DBCallsServiceMSSQL from "../db/mssql/DBCallsServiceMSSQL";
import DBConnConfigMSSQL from "../db/mssql/DBConnConfigMSSQL";
import DBConnMSSQL from "../db/mssql/DBConnMSSQL";

export default class DBCallsServiceFactory{
    static Get(vendor : DBVendors = DBVendors.MSSQL, config? : IDBConnConfig) : IDBCallsService{
        switch(vendor){
            case DBVendors.MSSQL :
                const dbConnConfig = config as DBConnConfigMSSQL ?? new DBConnConfigMSSQL()
                const dbConn = new DBConnMSSQL(dbConnConfig)
                return new DBCallsServiceMSSQL(dbConn)
            case DBVendors.MYSQL :
                return null
            default :
                return null
        }
    }
}
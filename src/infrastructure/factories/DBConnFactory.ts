import IDBConn from "@dbComm/src/domain/interfaces/conn/IDBConn";
import IDBConnConfig from "@dbComm/src/domain/interfaces/conn/IDBConnConfig";
import DBVendors from "@dbComm/src/domain/valueObjs/DBVendors";
import DBConnConfigMSSQL from "../services/dbMSSQL/DBConnConfigMSSQL";
import DBConnMSSQL from "../services/dbMSSQL/DBConnMSSQL";

export default class DBConnFactory{
    static Get(vendor : DBVendors = DBVendors.MSSQL, config? : IDBConnConfig) : IDBConn | null{
        if(vendor == DBVendors.MSSQL){
            const dbConnConfig : DBConnConfigMSSQL = config as DBConnConfigMSSQL ?? new DBConnConfigMSSQL()
            const dbConn = new DBConnMSSQL(dbConnConfig)
            
            return dbConn
        }else if(vendor == DBVendors.MYSQL){
            return null
        }

        return null
    }
}
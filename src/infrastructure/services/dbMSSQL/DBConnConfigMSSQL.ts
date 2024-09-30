import sql from "mssql"
import DBConnConfig from "../DBConnConfig"

export const defaultPool = {
    max : 10,
    min : 0,
    idleTimeoutMillis : 30000
}

export const defaultOptions = {
    encrypt : false,
    trustServerCertificate : true
}

export default class DBConnConfigMSSQL extends DBConnConfig<sql.config>{
    constructor(config? : sql.config){
        super(
            {
                user : process.env.MSSQL_USER,
                password : process.env.MSSQL_PASS,
                database : process.env.MSSQL_DB,
                server : process.env.MSSQL_HOST,
                port : parseInt(process.env.MSSQL_PORT),
                pool : defaultPool,
                options : defaultOptions
            },
            config
        )
    }

    IsValid() : boolean {
        if(
            this.config.user != "" &&
            this.config.password != "" &&
            this.config.database != "" &&
            this.config.server != "" &&
            this.config.port > 0
        ){
            return true
        }

        return false
    }
}
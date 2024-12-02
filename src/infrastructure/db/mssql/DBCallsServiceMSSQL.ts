import { DBCallsBadRequestEx, DBCallsCouldNotCallEx, DBCallsEx, DBCallsNoResultEx } from "@dbComm/src/domain/exceptions/DBCallsExceptions"
import { DBConnEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBCallsRequestQuery from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestQuery"
import IDBCallsRequestSP from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestSP"
import IDBCallsResultQuery from "@dbComm/src/domain/interfaces/calls/IDBCallsResultQuery"
import IDBCallsResultSP from "@dbComm/src/domain/interfaces/calls/IDBCallsResultSP"
import IDBCallsService from "@dbComm/src/domain/interfaces/calls/IDBCallsService"
import ParamsDirections from "@dbComm/src/domain/valueObjs/ParamsDirections"
import QueryParam from "@dbComm/src/domain/valueObjs/QueryParam"
import sql, { RequestError } from "mssql"
import DBConnMSSQL from "./DBConnMSSQL"
import TediousMSSQLTypes from "./TediousMSSQLTypes"

export default class DBCallsServiceMSSQL implements IDBCallsService{
    dbConn : DBConnMSSQL

    constructor(dbConn : DBConnMSSQL){
        this.dbConn = dbConn
    }

    FillQueryRequest(params : Array<QueryParam>, mssqlrequest : sql.Request) : sql.Request{
        if(params === undefined){ return mssqlrequest }

        params.forEach((param) => {
            mssqlrequest = mssqlrequest.input(
                param.name, TediousMSSQLTypes[param.type], param.value
            )
        })

        return mssqlrequest
    }

    FillSPRequest(params : Array<QueryParam>, mssqlRequest : sql.Request) : sql.Request{
        if(params === undefined){ return mssqlRequest }

        params.forEach((param) => {
            if(param.dir == ParamsDirections.INPUT){
                mssqlRequest = mssqlRequest.input(
                    param.name, TediousMSSQLTypes[param.type], param.value
                )
            }else{
                mssqlRequest = mssqlRequest.output(
                    param.name, TediousMSSQLTypes[param.type], param.value
                )
            }
        })

        return mssqlRequest
    }

    async CallQuery<T>(request : IDBCallsRequestQuery) : Promise<IDBCallsResultQuery<T>>{
        try{
            if(request.query == ""){ throw new DBCallsBadRequestEx() }

            await this.dbConn.Open()
            const mssqlRequest = this.FillQueryRequest(request.data, this.dbConn.connObj.request())
            const mssqlQueryResult = await mssqlRequest.query<T>(request.query)

            if(mssqlQueryResult.recordset.length <= 0){ throw new DBCallsNoResultEx() }
            const dbCallsResultQuery : IDBCallsResultQuery<T> = {
                result : mssqlQueryResult.recordset
            }

            this.dbConn.Close()

            return dbCallsResultQuery
        }catch(error){
            if(error instanceof DBConnEx){ throw error }
            
            this.dbConn.Close()

            if(error instanceof DBCallsEx || error instanceof RequestError){
                throw new DBCallsBadRequestEx(error.message)
            }

            throw new DBCallsCouldNotCallEx()
        }
    }

    async CallSP<T, U = {}>(request : IDBCallsRequestSP) : Promise<IDBCallsResultSP<T, U>>{
        try{
            if(request.spName == ""){ throw new DBCallsBadRequestEx() }

            await this.dbConn.Open()
            const mssqlRequest = this.FillSPRequest(request.params, this.dbConn.connObj.request())
            const mssqlQueryResult = await mssqlRequest.execute<T>(request.spName)

            if(mssqlQueryResult.recordset === undefined && Object.keys(mssqlQueryResult.output).length <= 0){
                throw new DBCallsNoResultEx()
            }
            const dbCallsResultSP : IDBCallsResultSP<T, U> = {
                result : mssqlQueryResult.recordset,
                outputs : mssqlQueryResult.output as U
            }

            this.dbConn.Close()

            return dbCallsResultSP
        }catch(error){
            if(error instanceof DBConnEx){ throw error }
            
            this.dbConn.Close()

            if(error instanceof DBCallsEx || error instanceof RequestError){
                throw new DBCallsBadRequestEx(error.message)
            }

            throw new DBCallsCouldNotCallEx()
        }
    }
}
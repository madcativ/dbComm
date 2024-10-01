import { DBCallsBadRequestEx, DBCallsCouldNotCallEx, DBCallsEx, DBCallsNoResultEx } from "@dbComm/src/domain/exceptions/DBCallsExceptions"
import { DBConnEx } from "@dbComm/src/domain/exceptions/DBConnExceptions"
import IDBCallsRequestQuery from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestQuery"
import IDBCallsRequestSP from "@dbComm/src/domain/interfaces/calls/IDBCallsRequestSP"
import IDBCallsResult from "@dbComm/src/domain/interfaces/calls/IDBCallsResult"
import ParamsDirections from "@dbComm/src/domain/valueObjs/ParamsDirections"
import QueryParam from "@dbComm/src/domain/valueObjs/QueryParam"
import sql, { RequestError } from "mssql"
import DBCallsResult from "../DBCallsResult"
import DBCallsService from "../DBCallsService"
import TediousMSSQLTypes from "./TediousMSSQLTypes"

export default class DBCallsMSSQLService extends DBCallsService<sql.ConnectionPool>{

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

    async CallQuery<U>(request : IDBCallsRequestQuery) : Promise<IDBCallsResult<U>>{
        try{
            if(request.query == ""){ throw new DBCallsBadRequestEx() }

            let dbConn = await this.dbConnService.Open()

            let mssqlRequest = this.FillQueryRequest(request.data, dbConn.connObj.request())

            let queryResult = await mssqlRequest.query<U>(request.query)

            if(queryResult.recordset.length <= 0){ throw new DBCallsNoResultEx() }

            let callsResult = new DBCallsResult<U>(queryResult.recordset)

            this.dbConnService.Close()

            return callsResult
        }catch(error){
            if(error instanceof DBConnEx){ throw error }
            
            this.dbConnService.Close()

            if(error instanceof DBCallsEx || error instanceof RequestError){
                throw new DBCallsBadRequestEx(error.message)
            }

            throw new DBCallsCouldNotCallEx()
        }
    }

    async CallSP<U>(request : IDBCallsRequestSP) : Promise<IDBCallsResult<U>>{
        try{
            if(request.spName == ""){ throw new DBCallsBadRequestEx() }

            let dbConn = await this.dbConnService.Open()

            let mssqlRequest = this.FillSPRequest(request.params, dbConn.connObj.request())

            let queryResult = await mssqlRequest.execute(request.spName)

            if(queryResult.recordset.length <= 0){ throw new DBCallsNoResultEx() }

            let callsResult = new DBCallsResult<U>(queryResult.recordset)

            this.dbConnService.Close()

            return callsResult
        }catch(error){
            if(error instanceof DBConnEx){ throw error }
            
            this.dbConnService.Close()

            if(error instanceof DBCallsEx || error instanceof RequestError){
                throw new DBCallsBadRequestEx(error.message)
            }

            throw new DBCallsCouldNotCallEx()
        }
    }
}
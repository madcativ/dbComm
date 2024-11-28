const { QueryParam } = require("../../../domain/valueObjs/QueryParam");
const { DBCallsService } = require("../DBCallsService");
const sql = require("mssql");
const { TediousMSSQLTypes } = require("./TediousMSSQLTypes");
const { ParamsDirections } = require("../../../domain/valueObjs/ParamsDirections");
const { IDBCallsRequestQuery } = require("../../../domain/interfaces/calls/IDBCallsRequestQuery");
const { IDBCallsResult } = require("../../../domain/interfaces/calls/IDBCallsResult");
const { DBCallsBadRequestEx, DBCallsNoResultEx, DBCallsEx, DBCallsCouldNotCallEx } = require("../../../domain/exceptions/DBCallsExceptions");
const { DBCallsResult } = require("../DBCallsResult");
const { DBConnEx } = require("../../../domain/exceptions/DBConnExceptions");
const { IDBCallsRequestSP } = require("../../../domain/interfaces/calls/IDBCallsRequestSP");

class DBCallsMSSQLService extends DBCallsService{
    FillQueryRequest(params, mssqlrequest){
        if(params === undefined){ return mssqlrequest }

        params.forEach((param) => {
            mssqlrequest = mssqlrequest.input(
                param.name, TediousMSSQLTypes[param.type], param.value
            )
        })

        return mssqlrequest
    }
    
    FillSPRequest(params, mssqlRequest){
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
    
    async CallQuery(request){
        try{
            if(request.query == ""){ throw new DBCallsBadRequestEx() }

            let dbConn = await this.dbConnService.Open()

            let mssqlRequest = this.FillQueryRequest(request.data, dbConn.connObj.request())
            
            let queryResult = await mssqlRequest.query(request.query)

            if(queryResult.recordset.length <= 0){ throw new DBCallsNoResultEx() }

            let callsResult = new DBCallsResult(queryResult.recordset)

            this.dbConnService.Close()

            return callsResult
        }catch(error){
            if(error instanceof DBConnEx){ throw error }
            
            this.dbConnService.Close()

            if(error instanceof DBCallsEx || error instanceof sql.RequestError){
                throw new DBCallsBadRequestEx(error.message)
            }

            throw new DBCallsCouldNotCallEx()
        }
    }
    
    async CallSP(request){
        try{
            if(request.spName == ""){ throw new DBCallsBadRequestEx() }

            let dbConn = await this.dbConnService.Open()

            let mssqlRequest = this.FillSPRequest(request.params, dbConn.connObj.request())

            let queryResult = await mssqlRequest.execute(request.spName)
            
            if(queryResult.recordset === undefined && Object.keys(queryResult.output).length <= 0){
                throw new DBCallsNoResultEx()
            }

            let callsResult = new DBCallsResult(queryResult.recordset, queryResult.output)
            
            this.dbConnService.Close()

            return callsResult
        }catch(error){
            if(error instanceof DBConnEx){ throw error }
            
            this.dbConnService.Close()

            if(error instanceof DBCallsEx || error instanceof sql.RequestError){
                throw new DBCallsBadRequestEx(error.message)
            }

            throw new DBCallsCouldNotCallEx()
        }
    }
}

module.exports = {
    DBCallsMSSQLService
}
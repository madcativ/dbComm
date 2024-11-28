import { describe, test, expect } from "vitest"
const { DBCallsServiceFactory } = require("../src/infrastructure/factories/DBCallsServiceFactory")
const { DBCallsRequestQuery } = require("../src/infrastructure/services/DBCallsRequestQuery")
const { QueryParam } = require("../src/domain/valueObjs/QueryParam")
const { ParamsTypes } = require("../src/domain/valueObjs/ParamsTypes")
const { ParamsDirections } = require("../src/domain/valueObjs/ParamsDirections")
const { DBCallsBadRequestEx } = require("../src/domain/exceptions/DBCallsExceptions")
const { DBCallsRequestSP } = require("../src/infrastructure/services/DBCallsRequestSP")
const { SPParam } = require("../src/domain/valueObjs/SPParam")

describe("DB Calls", () => {
    test("Select simple", async () => {
        let dbCallsService = new DBCallsServiceFactory().Get()

        let callsResult = await dbCallsService.CallQuery(new DBCallsRequestQuery(
            `
            WITH TEMP(field1, field2, field3)
            AS
            (
                SELECT 'Hola' AS 'field1', 'Mundo' AS 'field2', '!!!' AS 'field3'
                UNION
                SELECT 'Hello' AS 'field1', 'World' AS 'field2', '!!!' AS 'field3'
            )
            SELECT *
            FROM TEMP
            `
        ))
        
        expect(callsResult.result).toEqual([
            { "field1" : "Hola", "field2" : "Mundo", "field3" : "!!!" },
            { "field1" : "Hello", "field2" : "World", "field3" : "!!!" }
        ])
    })

    test("Select with good params", async () => {
        let dbCallsService = new DBCallsServiceFactory().Get()

        let callsResult = await dbCallsService.CallQuery(new DBCallsRequestQuery(
            `
            WITH TEMP(field1, field2, field3)
            AS
            (
                SELECT 'Hola' AS 'field1', 'Mundo' AS 'field2', '!!!' AS 'field3'
                UNION
                SELECT 'Hello' AS 'field1', 'World' AS 'field2', '!!!' AS 'field3'
            )
            SELECT *
            FROM TEMP
            WHERE field1 = @p1
            `,
            [
                new QueryParam("p1", ParamsTypes.VARCHAR, ParamsDirections.INPUT, "Hello")
            ]
        ))

        expect(callsResult.result.length > 0).toBe(true)
        expect(callsResult.result).toEqual([
            { "field1" : "Hello", "field2" : "World", "field3" : "!!!" }
        ])
    })

    test("Select with no/bad params", async () => {
        try{
            let dbCallsService = new DBCallsServiceFactory().Get()

            await dbCallsService.CallQuery(new DBCallsRequestQuery(
                `
                WITH TEMP(field1, field2, field3)
                AS
                (
                    SELECT 'Hola' AS 'field1', 'Mundo' AS 'field2', '!!!' AS 'field3'
                    UNION
                    SELECT 'Hello' AS 'field1', 'World' AS 'field2', '!!!' AS 'field3'
                )
                SELECT *
                FROM TEMP
                WHERE field1 = 
                `
            ))
        }catch(error){
            expect(error).toBeInstanceOf(DBCallsBadRequestEx)
        }
    })

    test("Execute SP with good params", async () => {
        let dbCallsService = new DBCallsServiceFactory().Get()
        
        let resultEntity = await dbCallsService.CallSP(new DBCallsRequestSP("SPTest", [
            new SPParam("param1", ParamsTypes.VARCHAR, "Hello")
        ]))

        expect(resultEntity.result).toEqual([
            { "field1" : "Hello", "field2" : "World", "field3" : "!!!" }
        ])
    })

    test("Execute SP with bad params", async () => {
        try{
            let dbCallsService = new DBCallsServiceFactory().Get()

            await dbCallsService.CallSP(new DBCallsRequestSP("SPTest", [
                new SPParam("p1", ParamsTypes.VARCHAR)
            ]))
        }catch(error){
            expect(error).toBeInstanceOf(DBCallsBadRequestEx)
        }
    })
})
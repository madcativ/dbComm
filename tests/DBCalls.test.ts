import { DBCallsBadRequestEx } from '@dbComm/src/domain/exceptions/DBCallsExceptions'
import ParamsDirections from '@dbComm/src/domain/valueObjs/ParamsDirections'
import ParamsTypes from '@dbComm/src/domain/valueObjs/ParamsTypes'
import QueryParam from '@dbComm/src/domain/valueObjs/QueryParam'
import SPParam from '@dbComm/src/domain/valueObjs/SPParam'
import DBCallsRequestQuery from '@dbComm/src/infrastructure/DBCallsRequestQuery'
import DBCallsRequestSP from '@dbComm/src/infrastructure/DBCallsRequestSP'
import DBCallsServiceFactory from '@dbComm/src/infrastructure/factories/DBCallsServiceFactory'
import 'dotenv/config'
import { describe, expect, test } from "vitest"

describe("DB Calls", () => {
    test("Select simple", async () => {
        const dbCallsService = DBCallsServiceFactory.Get()

        const callsResult = await dbCallsService.CallQuery<{
            field1 : string,
            field2 : string,
            field3 : string
        }>(new DBCallsRequestQuery(
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
        const dbCallsService = DBCallsServiceFactory.Get()

        const callsResult = await dbCallsService.CallQuery<{
            field1 : string,
            field2 : string,
            field3 : string
        }>(new DBCallsRequestQuery(
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
            const dbCallsService = DBCallsServiceFactory.Get()

            await dbCallsService.CallQuery<{
                field1 : string,
                field2 : string,
                field3 : string
            }>(new DBCallsRequestQuery(
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

    test("Select with no results", async () => {
        try{
            const dbCallsService = DBCallsServiceFactory.Get()

            const callResult = await dbCallsService.CallQuery<{
                field1 : string,
                field2 : string,
                field3 : string
            }>(new DBCallsRequestQuery(
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
                WHERE field1 = 'X'
                `
            ))

            expect(callResult.result.length).lessThanOrEqual(0)
        }catch(error){
            expect(error).toBeInstanceOf(DBCallsBadRequestEx)
        }
    })

    test("Execute SP with good params", async () => {
        const dbCallsService = DBCallsServiceFactory.Get()

        const resultEntity = await dbCallsService.CallSP<
        {
            field1 : string,
            field2 : string,
            field3 : string
        }, {}>(new DBCallsRequestSP("SPTest", [
            new SPParam("param1", ParamsTypes.VARCHAR, "Hello")
        ]))

        expect(resultEntity.result).toEqual([
            { "field1" : "Hello", "field2" : "World", "field3" : "!!!" }
        ])
    })

    test("Execute SP with bad params", async () => {
        try{
            const dbCallsService = DBCallsServiceFactory.Get()

            await dbCallsService.CallSP<{
                field1 : string,
                field2 : string,
                field3 : string
            }, {hola : string}>(new DBCallsRequestSP("SPTest", [
                new SPParam("p1", ParamsTypes.VARCHAR)
            ]))
        }catch(error){
            expect(error).toBeInstanceOf(DBCallsBadRequestEx)
        }
    })
})
import { DBConnBadConfigEx, DBConnCouldNotDisconnectEx } from '@dbComm/src/domain/exceptions/DBConnExceptions'
import { DEFAULT_DB_DATABASE, DEFAULT_DB_HOST, DEFAULT_DB_PASS, DEFAULT_DB_PORT, DEFAULT_DB_USER } from '@dbComm/src/infrastructure/contants/DefaultsDBConnConfig'
import DBConnConfigMSSQL from '@dbComm/src/infrastructure/services/dbMSSQL/DBConnConfigMSSQL'
import DBConnMSSQLService from '@dbComm/src/infrastructure/services/dbMSSQL/DBConnServiceMSSQL'
import "dotenv/config"
import { describe, expect, test } from "vitest"

describe("DB Connection", () => {
    test("Connect with bad config", async () => {
        try{
            let dbConnConfig = new DBConnConfigMSSQL()
            let dbConnService = new DBConnMSSQLService(dbConnConfig)
            dbConnService.Open()
        }catch(error){
            expect(error).toBeInstanceOf(DBConnBadConfigEx)
        }
    })

    test("Connect with good config", async () => {
        let dbConnConfig = new DBConnConfigMSSQL(
            DEFAULT_DB_USER,
            DEFAULT_DB_PASS,
            DEFAULT_DB_DATABASE,
            DEFAULT_DB_HOST,
            DEFAULT_DB_PORT
        )
        let dbConnService = new DBConnMSSQLService(dbConnConfig)
        let dbConn = await dbConnService.Open()

        expect(dbConn).not.toBe(null)
        expect(dbConn?.IsConnnected()).toBe(true)

        dbConnService.Close()
    })

    test("Disconnect properly", async () => {
        let dbConnConfig = new DBConnConfigMSSQL(
            DEFAULT_DB_USER,
            DEFAULT_DB_PASS,
            DEFAULT_DB_DATABASE,
            DEFAULT_DB_HOST,
            DEFAULT_DB_PORT
        )
        let dbConnService = new DBConnMSSQLService(dbConnConfig)
        let dbConn = await dbConnService.Open()

        expect(dbConn).not.toBe(null)
        expect(dbConn?.IsConnnected()).toBe(true)

        dbConnService.Close()
    })

    test("Disconnect without open", async() => {
        try{
            let dbConnConfig = new DBConnConfigMSSQL(
                DEFAULT_DB_USER,
                DEFAULT_DB_PASS,
                DEFAULT_DB_DATABASE,
                DEFAULT_DB_HOST,
                DEFAULT_DB_PORT
            )
            let dbConnService = new DBConnMSSQLService(dbConnConfig)

            dbConnService.Close()
        }catch(error){
            expect(error).toBeInstanceOf(DBConnCouldNotDisconnectEx)
        }
    })
})
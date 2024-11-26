import { describe, test, expect } from "vitest"
const { DBConnConfigMSSQL } = require("../src/infrastructure/services/dbMSSQL/DBConnConfigMSSQL")
const { DBConnService } = require("../src/infrastructure/services/DBConnService")
const { DBConnBadConfigEx, DBConnCouldNotDisconnectEx } = require("../src/domain/exceptions/DBConnExceptions")
const { DEFAULT_DB_USER, DEFAULT_DB_PASS, DEFAULT_DB_DATABASE, DEFAULT_DB_HOST, DEFAULT_DB_PORT } = require("../src/infrastructure/contants/DefaultsDBConnConfig")
const { DBConnServiceMSSQL } = require("../src/infrastructure/services/dbMSSQL/DBConnServiceMSSQL")

describe("DB Connection", () => {
    test("Connect with bad config", async () => {
        try{
            let dbConnConfig = new DBConnConfigMSSQL()
            let dbConnService = new DBConnService(dbConnConfig)
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
        let dbConnService = new DBConnServiceMSSQL(dbConnConfig)
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
        let dbConnService = new DBConnServiceMSSQL(dbConnConfig)
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
            let dbConnService = new DBConnServiceMSSQL(dbConnConfig)

            dbConnService.Close()
        }catch(error){
            expect(error).toBeInstanceOf(DBConnCouldNotDisconnectEx)
        }
    })
})
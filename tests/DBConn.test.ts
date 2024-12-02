import { DBConnBadConfigEx, DBConnCouldNotDisconnectEx } from '@dbComm/src/domain/exceptions/DBConnExceptions'
import DBConnConfigMSSQL from '@dbComm/src/infrastructure/db/mssql/DBConnConfigMSSQL'
import DBConnMSSQL from '@dbComm/src/infrastructure/db/mssql/DBConnMSSQL'
import "dotenv/config"
import { describe, expect, test } from "vitest"

describe("DB Connection", () => {
    test("Connect with bad config - config through constructor", async () => {
        try{
            const dbConnConfig = new DBConnConfigMSSQL(null)
            const dbConn = new DBConnMSSQL(dbConnConfig)
            await dbConn.Open()
            expect(dbConn.IsConnnected()).toBe(false)
        }catch(error){
            expect(error).toBeInstanceOf(DBConnBadConfigEx)
        }
    })

    test("Connect with bad config - config through open func", async () => {
        try{
            const dbConn = new DBConnMSSQL()
            const dbConnConfig = new DBConnConfigMSSQL(null)
            await dbConn.Open(dbConnConfig)
            expect(dbConn.IsConnnected()).toBe(false)
        }catch(error){
            expect(error).toBeInstanceOf(DBConnBadConfigEx)
        }
    })

    test("Connect with good config, then disconnect", async () => {
        const dbConn = new DBConnMSSQL()
        const dbConnConfig = new DBConnConfigMSSQL()
        await dbConn.Open(dbConnConfig)

        expect(dbConn.IsConnnected()).toBe(true)

        dbConn.Close()

        expect(dbConn.IsConnnected()).toBe(false)
    })

    test("Disconnect without open", async() => {
        try{
            const dbConn = new DBConnMSSQL()
            dbConn.Close()
        }catch(error){
            expect(error).toBeInstanceOf(DBConnCouldNotDisconnectEx)
        }
    })
})
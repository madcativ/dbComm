import { DBConnBadConfigEx, DBConnCouldNotDisconnectEx } from '@dbComm/src/domain/exceptions/DBConnExceptions'
import DBVendors from '@dbComm/src/domain/valueObjs/DBVendors'
import DBConnFactory from '@dbComm/src/infrastructure/factories/DBConnFactory'
import DBConnConfigMSSQL from '@dbComm/src/infrastructure/services/dbMSSQL/DBConnConfigMSSQL'
import "dotenv/config"
import { describe, expect, test } from "vitest"

describe("DB Connection", () => {
    test("Connect with bad config", async () => {
        try{
            const dbConnConfig = new DBConnConfigMSSQL(null)
            const dbConn = DBConnFactory.Get(DBVendors.MSSQL, dbConnConfig)

            expect(dbConn).not.toBeNull()
            expect(dbConn.IsConnnected()).toBe(false)

            await dbConn.Open()
        }catch(error){
            expect(error).toBeInstanceOf(DBConnBadConfigEx)
        }
    })

    test("Connect with good config, then disconnect", async () => {
        const dbConn = DBConnFactory.Get()
        await dbConn.Open()

        expect(dbConn.IsConnnected()).toBe(true)

        dbConn.Close()

        expect(dbConn.IsConnnected()).toBe(false)
    })

    test("Disconnect without open", async() => {
        try{
            const dbConn = DBConnFactory.Get()
            dbConn.Close()
        }catch(error){
            expect(error).toBeInstanceOf(DBConnCouldNotDisconnectEx)
        }
    })
})
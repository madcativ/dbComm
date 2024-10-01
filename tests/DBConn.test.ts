import { DBConnBadConfigEx, DBConnCouldNotDisconnectEx } from '@dbComm/src/domain/exceptions/DBConnExceptions'
import DBConnConfigMSSQL from '@dbComm/src/infrastructure/services/dbMSSQL/DBConnConfigMSSQL'
import DBConnMSSQLService from '@dbComm/src/infrastructure/services/dbMSSQL/DBConnMSSQLService'
import 'dotenv/config'

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
            process.env.MSSQL_USER,
            process.env.MSSQL_PASS,
            process.env.MSSQL_DB,
            process.env.MSSQL_HOST,
            parseInt(process.env.MSSQL_PORT)
        )
        let dbConnService = new DBConnMSSQLService(dbConnConfig)
        let dbConn = await dbConnService.Open()

        expect(dbConn).not.toBe(null)
        expect(dbConn.IsConnnected()).toBe(true)

        dbConnService.Close()
    })

    test("Disconnect properly", async () => {
        let dbConnConfig = new DBConnConfigMSSQL(
            process.env.MSSQL_USER,
            process.env.MSSQL_PASS,
            process.env.MSSQL_DB,
            process.env.MSSQL_HOST,
            parseInt(process.env.MSSQL_PORT)
        )
        let dbConnService = new DBConnMSSQLService(dbConnConfig)
        let dbConn = await dbConnService.Open()

        expect(dbConn).not.toBe(null)
        expect(dbConn.IsConnnected()).toBe(true)

        dbConnService.Close()
    })

    test("Disconnect without open", async() => {
        try{
            let dbConnConfig = new DBConnConfigMSSQL(
                process.env.MSSQL_USER,
                process.env.MSSQL_PASS,
                process.env.MSSQL_DB,
                process.env.MSSQL_HOST,
                parseInt(process.env.MSSQL_PORT)
            )
            let dbConnService = new DBConnMSSQLService(dbConnConfig)

            dbConnService.Close()
        }catch(error){
            expect(error).toBeInstanceOf(DBConnCouldNotDisconnectEx)
        }
    })
})
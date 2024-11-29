import "dotenv/config"

export const DEFAULT_DB_USER : string = process.env.DB_USER ?? ""
export const DEFAULT_DB_PASS : string = process.env.DB_PASS ?? ""
export const DEFAULT_DB_HOST : string = process.env.DB_HOST ?? ""
export const DEFAULT_DB_PORT : number = parseInt(process.env.DB_PORT ?? "0")
export const DEFAULT_DB_DATABASE : string = process.env.DB_DATABASE ?? ""

export const DEFAULT_DB_MSSQL_POOL = {
    max : 10,
    min : 0,
    idleTimeoutMillis : 30000
}
export const DEFAULT_DB_MSSQL_OPTIONS = {
    encrypt : false,
    trustServerCertificate : true
}
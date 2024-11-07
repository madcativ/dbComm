import "dotenv/config"

export const DEFAULT_DB_USER : string = process.env.DB_USER ?? ""
export const DEFAULT_DB_PASS : string = process.env.DB_PASS ?? ""
export const DEFAULT_DB_HOST : string = process.env.DB_HOST ?? ""
export const DEFAULT_DB_PORT : number = parseInt(process.env.DB_PORT ?? "0")
export const DEFAULT_DB_DATABASE : string = process.env.DB_DATABASE ?? ""
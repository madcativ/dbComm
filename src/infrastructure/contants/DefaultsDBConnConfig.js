require('dotenv').config()

const DEFAULT_DB_USER = process.env.DB_USER ?? ""
const DEFAULT_DB_PASS = process.env.DB_PASS ?? ""
const DEFAULT_DB_HOST = process.env.DB_HOST ?? ""
const DEFAULT_DB_PORT = parseInt(process.env.DB_PORT ?? "0")
const DEFAULT_DB_DATABASE = process.env.DB_DATABASE ?? ""


module.exports = {
    DEFAULT_DB_USER,
    DEFAULT_DB_PASS,
    DEFAULT_DB_HOST,
    DEFAULT_DB_PORT,
    DEFAULT_DB_DATABASE
}
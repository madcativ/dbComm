require('dotenv').config()

/** @type {string} */
const DEFAULT_DB_USER = process.env.DB_USER ?? ""

/** @type {string} */
const DEFAULT_DB_PASS = process.env.DB_PASS ?? ""

/** @type {string} */
const DEFAULT_DB_HOST = process.env.DB_HOST ?? ""

/** @type {number} */
const DEFAULT_DB_PORT = parseInt(process.env.DB_PORT ?? "0")

/** @type {string} */
const DEFAULT_DB_DATABASE = process.env.DB_DATABASE ?? ""


module.exports = {
    DEFAULT_DB_USER,
    DEFAULT_DB_PASS,
    DEFAULT_DB_HOST,
    DEFAULT_DB_PORT,
    DEFAULT_DB_DATABASE
}
const { IDBConn } = require("./IDBConn")

/**
 * @interface
 */
class IDBConnService{
    /**
     * @type {IDBConn}
     * @readonly
     */
    conn

    /**
     * @abstract
     * @returns {Promise<IDBConn | null>}
     */
    Open(){ return null }

    /**
     * @abstract
     * @returns {void}
     */
    Close(){}
}

module.exports ={
    IDBConnService
}
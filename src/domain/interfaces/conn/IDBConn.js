const { IDBConnConfig } = require("./IDBConnConfig")

/**
 * @interface
 */
class IDBConn{
    /**
    * @type {any}
    * @readonly
    */
    connObj
    /**
    * @type {IDBConnConfig}
    * @readonly
    */
    config

    /**
    * @abstract
    * @returns {boolean}
    */
    IsConnnected(){ return false; }
}

module.exports = {
    IDBConn   
}
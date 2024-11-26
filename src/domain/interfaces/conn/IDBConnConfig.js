/**
 * @interface
 */
class IDBConnConfig{
    /**
    * @type {string}
    * @readonly
    */
    user

    /**
    * @type {string}
    * @readonly
    */
    pass

    /**
    * @type {string}
    * @readonly
    */
    db

    /**
    * @type {string}
    * @readonly
    */
    host

    /**
    * @type {number}
    * @readonly
    */
    port

    /**
    * @abstract
    * @returns {boolean}
    */
    IsValid(){ return false }

    /**
    * @abstract
    * @returns {void}
    */
    RevertDefault(){}
}

module.exports = {
    IDBConnConfig
}
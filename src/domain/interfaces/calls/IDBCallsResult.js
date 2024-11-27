/**
 * @interface IDBCallsResult
 * @template T, U
 */
class IDBCallsResult{
    /** @type {Array<T>}; @readonly */
    result
    
    /** @type {?U}; @readonly */
    output
}

module.exports = {
    IDBCallsResult
}
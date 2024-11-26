const { ParamsDirections } = require("./ParamsDirections")
const { ParamsTypes } = require("./ParamsTypes")

/**
 * @class
 */
class QueryParam{
    /**
    * @type {string}
    */
    name
    
    /**
    * @type {ParamsTypes}
    */
    type

    /**
    * @type {ParamsDirections}
    */
    dir

    
    /**
    * @type {any}
    */
    value

    
    /**
    * @constructor
    * @param {string} name
    * @param {ParamsTypes} type
    * @param {ParamsDirections} dir
    * @param {any} value
    */
    constructor(
        name,
        type,
        dir,
        value,
    ){
        this.name = name
        this.type = type
        this.dir = dir
        this.value = value
    }
}

module.exports = {
    QueryParam
}
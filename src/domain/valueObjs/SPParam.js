const { ParamsDirections } = require("./ParamsDirections")
const { ParamsTypes } = require("./ParamsTypes")

/**
* @class SPParam
*/
class SPParam{
    /** @type {string} */
    name
    
    /** @type {ParamsTypes} */
    type
    
    /** @type {any} */
    value
    
    /** @type {number} */
    varying
    
    /** @type {boolean} */
    nullable
    
    /** @type {string} */
    defaultValue

    /** @type {ParamsDirections} */
    dir

    
    /**
    * @constructor
    * @param {string} name
    * @param {ParamsTypes} type
    * @param {any} value
    * @param {number} varying
    * @param {boolean} nullable
    * @param {string} defaultValue
    * @param {ParamsDirections} dir
    */
    constructor(
        name,
        type,
        value,
        varying,
        nullable,
        defaultValue,
        dir
    ){
        this.name = name
        this.type = type
        this.value = value
        this.varying = varying
        this.nullable = nullable
        this.defaultValue = defaultValue
        this.dir = dir
    }
}
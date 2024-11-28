const { ParamsDirections } = require("./ParamsDirections")

class SPParam{
    name
    type
    value
    varying
    nullable
    defaultValue
    dir

    constructor(
        name,
        type,
        value,
        varying,
        nullable,
        defaultValue,
        dir = ParamsDirections.INPUT
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

module.exports = {
    SPParam
}
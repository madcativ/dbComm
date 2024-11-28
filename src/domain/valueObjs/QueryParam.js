class QueryParam{
    name
    type
    dir
    value

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
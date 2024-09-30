import ParamsDirections from "./ParamsDirections"
import ParamsTypes from "./ParamsTypes"

export default class QueryParam{
    name : string
    type : ParamsTypes
    dir : ParamsDirections
    value : any

    constructor(
        name : string,
        type : ParamsTypes,
        dir : ParamsDirections,
        value : any
    ){
        this.name = name
        this.type = type
        this.dir = dir
        this.value = value
    }
}
import ParamsDirections from "./ParamsDirections"
import ParamsTypes from "./ParamsTypes"

export default class SPParam{
    name : string
    type : ParamsTypes
    value : any
    varying : number
    nullable : boolean
    defaultValue : string
    dir : ParamsDirections

    constructor(
        name : string,
        type : ParamsTypes,
        value : any = null,
        varying : number = 0,
        nullable : boolean = false,
        defaultValue : string = null,
        dir : ParamsDirections = ParamsDirections.INPUT,
    ){
        this.name = name
        this.type = type
        this.varying = varying
        this.nullable = nullable
        this.defaultValue = defaultValue
        this.dir = dir
        this.value = value
    }
}
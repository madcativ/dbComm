export default interface IDBConnConfig{
    user : string
    pass : string
    db : string
    host : string
    port : number
    IsValid() : boolean
    RevertDefault() : void
}
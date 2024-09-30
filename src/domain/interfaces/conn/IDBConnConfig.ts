export default interface IDBConnConfig<T>{
    GetConfig() : T
    IsValid() : boolean
    RevertDefault() : void
}
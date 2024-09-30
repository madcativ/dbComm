export default interface IDBConn<T>{
    GetConn() : T
    IsConnnected() : boolean
}
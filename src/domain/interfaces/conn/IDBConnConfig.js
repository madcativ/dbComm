class IDBConnConfig{
    user
    pass
    db
    host
    port

    IsValid(){ return false }
    RevertDefault(){}
}

module.exports = {
    IDBConnConfig
}
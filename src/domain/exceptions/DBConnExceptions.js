class DBConnEx extends Error{
    constructor(name, msg){ super(msg); this.name = name }
}

class DBConnBadConfigEx extends DBConnEx{
    constructor(msg = "Connection config is not valid"){ super("DBConnBadConfigEx", msg) }
}

class DBConnCouldNotConnectEx extends DBConnEx{
    constructor(msg = "Couldn't connect to DB"){ super("DBConnCouldNotConnectEx", msg) }
}

class DBConnCouldNotDisconnectEx extends DBConnEx{
    constructor(msg = "There was an error trying to disconnect"){
        super("DBConnCouldNotDisconnectEx", msg)
    }
}

class DBConnIsNullEx extends DBConnEx{
    constructor(msg = "DB connection is null"){ super("DBConnIsNullEx", msg) }
}

module.exports = {
    DBConnEx,
    DBConnBadConfigEx,
    DBConnCouldNotConnectEx,
    DBConnCouldNotDisconnectEx,
    DBConnIsNullEx
}
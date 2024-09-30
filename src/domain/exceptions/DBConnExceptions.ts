export class DBConnEx extends Error{
    constructor(name : string, msg? : string){ super(msg); this.name = name }
}

export class DBConnBadConfigEx extends DBConnEx{
    constructor(msg = "Connection config is not valid"){ super("DBConnBadConfigEx", msg) }
}

export class DBConnCouldNotConnectEx extends DBConnEx{
    constructor(msg = "Couldn't connect to DB"){ super("DBConnCouldNotConnectEx", msg) }
}

export class DBConnCouldNotDisconnectEx extends DBConnEx{
    constructor(msg = "There was an error trying to disconnect"){
        super("DBConnCouldNotDisconnectEx", msg)
    }
}

export class DBConnIsNullEx extends DBConnEx{
    constructor(msg = "DB connection is null"){ super("DBConnIsNullEx", msg) }
}
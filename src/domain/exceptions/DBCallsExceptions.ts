export class DBCallsEx extends Error{
    constructor(name : string, msg? : string){ super(msg); this.name = name }
}

export class DBCallsCouldNotCallEx extends DBCallsEx{
    constructor(msg = "Couldn't perform call"){ super("DBCallsCouldNotCallEx", msg) }
}

export class DBCallsBadRequestEx extends DBCallsEx{
    constructor(msg = "The request is faulty"){ super("DBCallsBadRequestEx", msg) }
}

export class DBCallsNoResultEx extends DBCallsEx{
    constructor(msg = "The result is empty"){ super("DBCallsNoResultEx", msg) }
}
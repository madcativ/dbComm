class DBCallsEx extends Error{
    constructor(name, msg){ super(msg); this.name = name }
}

class DBCallsCouldNotCallEx extends DBCallsEx{
    constructor(msg = "Couldn't perform call"){ super("DBCallsCouldNotCallEx", msg) }
}

class DBCallsBadRequestEx extends DBCallsEx{
    constructor(msg = "The request is faulty"){ super("DBCallsBadRequestEx", msg) }
}

class DBCallsNoResultEx extends DBCallsEx{
    constructor(msg = "The result is empty"){ super("DBCallsNoResultEx", msg) }
}

module.exports = {
    DBCallsEx,
    DBCallsCouldNotCallEx,
    DBCallsBadRequestEx,
    DBCallsNoResultEx
}
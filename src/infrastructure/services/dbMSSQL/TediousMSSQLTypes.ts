import ParamsTypes from "@dbComm/src/domain/valueObjs/ParamsTypes"
import sql from "mssql"

const TediousMSSQLTypes = {
    [ParamsTypes.VARCHAR] : sql.VarChar,
    [ParamsTypes.CHAR] : sql.Char,
    [ParamsTypes.NVARCHAR] : sql.NVarChar,
    [ParamsTypes.TEXT] : sql.Text,
    [ParamsTypes.SMALLINT] : sql.SmallInt,
    [ParamsTypes.INT] : sql.Int,
    [ParamsTypes.BIGINT] : sql.BigInt,
    [ParamsTypes.DECIMAL] : sql.Decimal,
    [ParamsTypes.FLOAT] : sql.Float,
    [ParamsTypes.DATE] : sql.Date,
    [ParamsTypes.TIME] : sql.Time,
    [ParamsTypes.DATETIME] : sql.DateTime,
    [ParamsTypes.BIT] : sql.Bit,
}

export default TediousMSSQLTypes
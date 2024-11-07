For testing DBCalls, you must create the next simple SP:
Notes:
* This example if for Transact SQL
* The db user must have execute permission

```sql
CREATE PROCEDURE SPTest
	@param1 VARCHAR(50)
AS
BEGIN
	WITH TEMP(field1, field2, field3)
    AS
    (
        SELECT 'Hola' AS 'field1', 'Mundo' AS 'field2', '!!!' AS 'field3'
        UNION
        SELECT 'Hello' AS 'field1', 'World' AS 'field2', '!!!' AS 'field3'
    )
    SELECT *
    FROM TEMP
    WHERE field1 = @param1

END
```
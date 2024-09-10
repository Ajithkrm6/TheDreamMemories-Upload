import sql from "mysql2/promise";

const mySqlPool = sql.createPool({
  host: "localhost",
  user: "root",
  password: "8686668096@Aji",
  database: "upload",
});

export default mySqlPool;

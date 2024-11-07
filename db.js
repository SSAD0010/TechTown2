// db.js
import { connect } from "mssql";

const config = {
  user: "sap",
  password: "P@ssw0rd805~",
  server: "3.1.37.245",   
  database: "tt",
  requestTimeout : 500 *1000,
  options: {
    encrypt: true,  
    trustServerCertificate: true, 
  },
};

async function connectToDatabase() {
  try {
    const pool = await connect(config);
    // console.log("Connected to MSSQL");
    return pool;
  } catch (err) {
    // console.error("Database connection failed", err);
  }
}

export default connectToDatabase;

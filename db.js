// db.js
import { connect } from "mssql";

const passAsync = async () => {
  const x = await decrypt(
    "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiUEBzc3cwcmQ4MDV-In0.RaRWC9eH5v2Udaw9DtGOjq1irIiJ7kt1Guu6ZxNt5E8"
  );
  return x.data | "";
};

const config = {
  user: "sap",
  password: passAsync(),
  server: "3.1.37.245",
  database: "tt",
  requestTimeout: 500 * 1000,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    const pool = await connect(config);
    console.log("Connected to MSSQL");
    return pool;
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

export default connectToDatabase;

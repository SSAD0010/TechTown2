// db.js
import { jwtVerify } from "jose";
import { connect } from "mssql";

const key = new TextEncoder().encode(process.env.KEY);
const dycrptor = async (xx) => {
  const x = await decrypt(xx);
  // console.log(x.data);
  return x.data;
};

async function config() {
  return {
    user: await dycrptor(process.env.DB_USER),
    password: await dycrptor(process.env.DB_PASS),
    server: await dycrptor(process.env.DB_IP),
    database: await dycrptor(process.env.DB),
    requestTimeout: 500 * 1000,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };
}

async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return await payload;
  } catch (error) {
     console.error("Failed to Decrypt", error);
  }
}

async function connectToDatabase() {
  try { 
    const pool = connect(await config());
    console.log("Connected to MSSQL");
    return pool;
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

export default connectToDatabase;

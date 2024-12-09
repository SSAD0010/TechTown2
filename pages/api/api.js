// pages/api/read.js
import connectToDatabase from "../../db";

export default async function handler(req, res) {
  const pool = await connectToDatabase();
  try {
    // console.log(req.body.SQLID);
    let query = `execute spDMF_EDS @SQLID = '${
      req.body.SQLID || ""
    }' ,  @VAL1 = '${req.body.VAL1 || ""}',  @VAL2 = '${
      req.body.VAL2 || ""
    }',  @VAL3 = '${req.body.VAL3 || ""}',  @VAL4 = '${
      req.body.VAL4 || ""
    }',  @VAL5 = '${req.body.VAL5 || ""}',  @VAL6 = '${
      req.body.VAL6 || ""
    }',  @VAL7 = '${req.body.VAL7 || ""}',  @VAL8 = '${
      req.body.VAL8 || ""
    }',  @VAL9 = '${req.body.VAL9 || ""}',  @VAL10 = '${req.body.VAL10 || ""}'`;
    console.log({query})
    const result = await pool.request().query(query);
    console.log(result.recordset)
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log( "500: ",{error: "Error fetching data", error })
    res.status(500).json({ error: "Error fetching data", error });
  }
}

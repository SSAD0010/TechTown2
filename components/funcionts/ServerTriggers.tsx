type EXEC_API_TYPE = {
  SQLID: number;
  VAL1?: string | "";
  VAL2?: string | "";
  VAL3?: string | "";
  VAL4?: string | "";
  VAL5?: string | "";
  VAL6?: string | "";
  VAL7?: string | "";
  VAL8?: string | "";
  VAL9?: string | "";
  VAL10?: string | "";
};
export default async function EXEC_API(e: EXEC_API_TYPE) {
  try {
    // "use server";
    const response = await fetch("../api/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...e }),
    });
    return response.json();
  } catch (error) {
    // console.log({ error });
  }
}

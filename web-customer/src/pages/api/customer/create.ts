import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/api/v1/customer`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(request.body),
    });

    const data = await res.json();
    console.log(data);
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

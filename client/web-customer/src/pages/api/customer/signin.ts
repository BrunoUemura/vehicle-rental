import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_API}/api/v1/customer/signin`,
      request.body
    );

    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
    return response.status(400).json({ error: "auth error" });
  }
}

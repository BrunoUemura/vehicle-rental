import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const res = await axios
      .get(`${process.env.BACKEND_API}/api/v1/vehicle`)
      .then((res) => {
        return res.data;
      });
    return response.status(200).json(res);
  } catch (error) {
    console.log(error);
  }
}

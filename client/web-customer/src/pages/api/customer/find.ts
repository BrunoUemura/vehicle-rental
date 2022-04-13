import type { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    console.log(request);

    const { data } = await axios.get(
      `${process.env.BACKEND_API}/api/v1/customer/${request.query.id}`
    );

    return response.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}

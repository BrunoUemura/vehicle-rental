import axios from "axios";
import jwt from "jsonwebtoken";

export async function recoverUserInfoById(token: string) {
  try {
    const { id }: any = jwt.decode(token);
    const { data } = await axios.get(`/users/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

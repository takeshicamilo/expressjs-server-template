import { Request } from "express";

interface UserPayload {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface CustomRequest extends Request {
  user?: UserPayload;
}

export default CustomRequest
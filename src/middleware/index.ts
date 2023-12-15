import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CustomRequest from "./types";

export default function authorization(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(403).send("Session is not valid");
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Session not valid");
    }
    console.log(decoded);
    req.user = decoded;

    next();
  });
}

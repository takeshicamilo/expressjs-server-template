import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./src/api/auth/index.ts";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import middleware from './src/middleware/index.ts'
import CustomRequest from "./src/middleware/types.ts";

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter); // Mount the auth router

app.get("/", middleware, (req: CustomRequest, res: Response) => {
  console.log(req.user, 'asd')
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

export default app;

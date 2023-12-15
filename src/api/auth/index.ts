import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import authorization from "@/src/middleware";

const router = express.Router();
//Login API
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(409).json({ message: "user doesn't exist" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);

      console.log(passwordMatch);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
        expiresIn: process.env.EXPIRE_TIME,
      });

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ messsage: "Theres are problems", error });
    }
  }
);
//REGISTER API
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("phone").isMobilePhone("es-CO").withMessage("Phone number is invalid"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, phone } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (existingUser) {
        return res.status(409).json({ message: "Email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          phone: phone,
        },
      });
      return res.status(201).json({ message: "New account created", user });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ messsage: "Theres are problems", error });
    }
  }
);

router.get("/logout", authorization, (req, res) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

export default router;

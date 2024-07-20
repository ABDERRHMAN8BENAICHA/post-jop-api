import { Router } from "express";
import { login, signup } from "../controllers/auth.mjs";

const authRoutes: Router = Router();

authRoutes.post("/signin", signup)
authRoutes.post("/login", login)

export default authRoutes;
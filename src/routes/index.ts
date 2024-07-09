import { Router } from "express";
import authRoutes from "./auth";
import postsRoutes from "./posts";


const rootRoutes : Router= Router();
rootRoutes.use("/auth",authRoutes);
rootRoutes.use("/posts",postsRoutes);


export default rootRoutes;
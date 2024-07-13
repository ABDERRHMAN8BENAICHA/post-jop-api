import { Router } from "express";
import authRoutes from "./auth";
import postsRoutes from "./posts";
import commentsRoutes from "./comments";


const rootRoutes : Router= Router();
rootRoutes.use("/auth",authRoutes);
rootRoutes.use("/posts",postsRoutes);
rootRoutes.use("/comments",commentsRoutes);


export default rootRoutes;
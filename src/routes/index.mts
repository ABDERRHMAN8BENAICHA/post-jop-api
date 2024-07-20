import { Router } from "express";
import authRoutes from "./auth.mjs";
import postsRoutes from "./posts.mjs";
import commentsRoutes from "./comments.mjs";
import likesRoutes from "./likes.mjs";


const rootRoutes : Router= Router();
rootRoutes.use("/auth",authRoutes);
rootRoutes.use("/posts",postsRoutes);
rootRoutes.use("/comments",commentsRoutes);
rootRoutes.use("/likes",likesRoutes);


export default rootRoutes;
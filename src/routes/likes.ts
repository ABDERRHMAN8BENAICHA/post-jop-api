import { Router } from "express";
import { isLiked, ToggleLike } from "../controllers/likes";

const likesRoutes: Router = Router();

likesRoutes.post("/toggle-like", ToggleLike)
likesRoutes.post("/is-liked", isLiked)  


export default likesRoutes;
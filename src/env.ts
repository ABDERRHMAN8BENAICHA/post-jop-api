import dotenv from "dotenv";

dotenv.config({ path: ".env" })

export const PORT = process.env.PORT || 8080
export const SECRET_KEY = process.env.SECRET_KEY
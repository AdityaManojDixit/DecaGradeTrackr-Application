import {Router} from "express";
import { fetchUserGrades, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { csvParser } from "../middlewares/csvParser.middleware.js";

const router = Router()

router.route("/upload").post(
    upload.single('file'),
    csvParser,
    registerUser
) //http://localhost:8000/api/v1/users/upload

router.route("/fetch").post(
    fetchUserGrades
)

export default router
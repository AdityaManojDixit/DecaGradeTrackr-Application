import {Router} from "express";
import { fetchUserGrades, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { csvParser } from "../middlewares/csvParser.middleware.js";

const router = Router()

//Exposed two API Endpoints: /upload and /fetch

router.route("/upload").post(
    upload.single('file'),
    csvParser,
    registerUser
)

router.route("/fetch").post(
    fetchUserGrades
)

export default router
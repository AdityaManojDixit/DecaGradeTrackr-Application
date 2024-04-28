import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { csvParser } from "../middlewares/csvParser.middleware.js";

const router = Router()

router.route("/register").post(
    upload.single('marks'),
    csvParser,
    registerUser
) //http://localhost:8000/api/v1/users/register


export default router
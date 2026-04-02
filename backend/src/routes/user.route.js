import { Router} from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js"; 

const router = Router();

router.route("/register").post(registerUser); // Route for user registration
router.route("/login").post(loginUser); // Route for user login
router.route("/logoutUser").post(logoutUser); // Route for user logout

export default router;
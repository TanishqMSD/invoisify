import {Router} from "express";
import { callback, loginFailure, loginSuccess } from "../controllers/oauth.controller.js";
import passport from "passport";

const router = Router();

router.route('/google/callback').get(passport.authenticate("google", {
    failureRedirect: "/api/v1/oauth/login/failure",
}), callback);

router.route('/google-screen').get(passport.authenticate('google', {scope: ["profile", "email"]}));

router.route('/login/failure').get(loginFailure);
router.route('/login/success').get(loginSuccess); 

export default router;
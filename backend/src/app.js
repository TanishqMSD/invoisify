import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import errorHandler from "./utils/errorHandler.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = path.join(__dirname, '../public');

app.use(cors({origin: ["http://localhost:5173", process.env.CORS_ORIGIN], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(staticPath));
app.use(cookieParser());
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//routes import
import userRouter from "./routes/user.route.js";
import oauthRouter from "./routes/oauth.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/oauth", oauthRouter);

app.use(errorHandler);

export default app;
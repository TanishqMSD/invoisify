import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {fileURLToPath} from "url";
import { dirname } from "path";
import path from "path";
import errorHandler from "./utils/errorHandler.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = path.join(__dirname, '../public');

app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(staticPath));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);

app.use(errorHandler);

export default app;
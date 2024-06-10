import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import mainRoute from "./routes/main.js";
import tasksRouter from "./routes/tasks.js";
import { authRouter } from "./routes/auth.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser());

app.use(mainRoute); //use the main route
app.use(tasksRouter); //use all the tasks api routes
app.use(authRouter); //use all the auth api routes

app.use((req, res) => res.json({message: "page not found"}));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

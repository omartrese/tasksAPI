import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import connectSqlite3 from "connect-sqlite3";
import cors from "cors";
import passport from "passport";
import "./lib/validate.js";
import mainRoute from "./routes/main.js";
import tasksRouter from "./routes/tasks.js";
import { authRouter } from "./routes/auth.js";

const app = express();
const SQLiteStore = connectSqlite3(session);
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "http://localhost:5500", // URL de tu frontend
    credentials: true
}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
 });

app.use(cookieParser());

app.use(session({
    secret: "nodeTasksAPI",
    name: 'user_ID',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new SQLiteStore({ db: "database.db", dir: "./" }),

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(mainRoute);
app.use(tasksRouter);
app.use(authRouter);

app.use((req, res) => res.status(404).json({ message: "Page not found" }));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

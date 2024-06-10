import express from "express";
import cookieParser from 'cookie-parser';
import bcrypt from "bcrypt";
import { database } from "../db.js";

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({extended: false}));
authRouter.use(cookieParser());

authRouter.get('/api/signup', (req, res) => res.json({message: "pagina de registro (hacer petición tipo POST con datos: name, username y password)"}));
authRouter.get('/api/login', (req, res) => res.json({message: "pagina de inicio de sesión (hacer petición tipo POST con datos: username y password)"}));

authRouter.post('/api/signup', (req, res) => {
    const {username, userId, password} = req.body;
    const hashPasswd = bcrypt.hashSync(password, 10);

})

export { authRouter };
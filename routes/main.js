import express from "express";
import cookieParser from 'cookie-parser';

const mainRoute = express.Router();

mainRoute.use(cookieParser());

mainRoute.get("/", (req, res) => {
  if(Object.keys(req.cookies).length === 0) return res.json({message: "You need to sign up or login to continue", signupURL: "http://localhost:8000/api/signup", loginURL: "http://localhost:8000/api/login"}); //si no se ha iniciado sesión con una cuenta, redirigir a las paginas registro e inicio de sesión

  return res.json({ tasks: "http://localhost:8000/api/tasks" });
});

export default mainRoute;

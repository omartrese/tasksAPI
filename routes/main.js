import express from "express";
import passport from "passport";

const mainRoute = express.Router();

mainRoute.get("/", (req, res) => {

  return res.json({ tasks: "http://localhost:8000/api/tasks" });
});

export default mainRoute;

import express from "express";

const mainRoute = express.Router();

mainRoute.get("/", (req, res) => {
  res.json({ tasks: "http://localhost:8000/api/tasks" });
});

export default mainRoute;

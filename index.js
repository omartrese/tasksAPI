import express from "express";
import mainRoute from "./routes/main.js";
import tasksRouter from "./routes/tasks.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(mainRoute); //use the main route
app.use(tasksRouter); //use all the tasks api routes

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

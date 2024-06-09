import express from "express";
import { database } from "../db.js";
// import testTasks from "../dataTest/testTasks.js";

const tasksRouter = express.Router();

tasksRouter.use(express.json());
tasksRouter.use(express.urlencoded({ extended: false }));

tasksRouter.get('/api', (req, res) => res.redirect('/'));

tasksRouter.get('/api/tasks', (req, res) => {
    try {
        database.all("SELECT * FROM tasks", [], (err, rows) => {
            if (err) return console.log(err.message);

            const tasks = rows.map(row => ({
                ...row,
                isCompleted: row.isCompleted === 1
            }));

            res.json(tasks || []);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to get tasks" });
    }
});

tasksRouter.post('/api/tasks', (req, res) => {

    const currentDate = Date.now();
    const dateString = new Date(currentDate).toISOString().split('.')[0].slice(0, 16);

    try {
        const name = req.body.name || "untitled";
        const description = req.body.description || "new Task";

        const query = `INSERT INTO tasks (name, description, isCompleted, createdAt) VALUES (?, ?, ?, ?)`;
        const params = [name, description, 0, dateString];

        database.run(query, params, (err) => {

            if(err) return console.log(err);

            const task = {
                name,
                description,
                isCompleted: false,
                createdAt: dateString
            };

            res.status(201).json({message: "task created successfully!", task}); 

        })

        // res.status(201).json({ message: 'Task created', task, redirectUrl: 'http://localhost:8000/api/tasks' });

    } catch (error) {
        console.log(error);
        res.status(500);
    }

});

export default tasksRouter;

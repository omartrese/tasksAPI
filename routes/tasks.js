import express from "express";
import testTasks from "../data/testTasks.js";

const tasksRouter = express.Router();

// Middleware para analizar los cuerpos de las solicitudes
tasksRouter.use(express.json());
tasksRouter.use(express.urlencoded({ extended: false }));

tasksRouter.get('/api', (req, res) => res.redirect('/'));

tasksRouter.get('/api/tasks', (req, res) => {
    try {
        res.json(testTasks);
    } catch (error) { console.log(error); }

});

tasksRouter.post('/api/tasks', (req, res) => {
    const id = testTasks.length + 1;
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ error: "Name and description are required" });
        }

        const task = {
            name,
            description,
            id
        };
        testTasks.push(task);
        res.status(201).json({ message: 'Task created', task, redirectUrl: 'http://localhost:8000/api/tasks' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

});

export default tasksRouter;

import express from "express";
import passport from "passport";
import { isAuthenticated } from "../lib/checkValidation.js";
import { database } from "../db.js";
// import testTasks from "../dataTest/testTasks.js";

const tasksRouter = express.Router();

tasksRouter.use(express.json());
tasksRouter.use(express.urlencoded({ extended: false }));

tasksRouter.get('/api', (req, res) => res.redirect('/'));

tasksRouter.get('/api/tasks', isAuthenticated, (req, res) => {
    try {
        const { userId } = req.user;

        database.all("SELECT * FROM tasks WHERE userOwner = ?", [userId], (err, rows) => {
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

tasksRouter.post('/api/tasks', isAuthenticated, (req, res) => {

    console.log(req.user);
    const { userId } = req.user;
    const currentDate = Date.now();
    const dateString = new Date(currentDate).toISOString().split('.')[0].slice(0, 16);

    try {
        const name = req.body.name || "untitled";
        const description = req.body.description || "new Task";

        const query = `INSERT INTO tasks (name, description, isCompleted, createdAt, userOwner) VALUES (?, ?, ?, ?, ?)`;
        const params = [name, description, 0, dateString, userId];

        database.run(query, params, (err) => {

            if (err) return console.log(err);

            const task = {
                name,
                description,
                isCompleted: false,
                createdAt: dateString,
                userOwner: userId,
            };

            res.status(201).json({ message: "task created successfully!", task });

        })

        // res.status(201).json({ message: 'Task created', task, redirectUrl: 'http://localhost:8000/api/tasks' });

    } catch (error) {
        res.status(500).json({ error: "You need to log in to create tasks" });
    }

});

tasksRouter.put('/api/tasks/:id', isAuthenticated, (req, res) => {
    // res.json({message: "actualizaste en el id " + req.params.id});
    const { userId } = req.user;
    const { id } = req.params;
    console.log(id);
    console.log(userId);


    try {
        const name = req.body.name || "untitled";
        const description = req.body.description || "new Task";

        console.log(name + "\n" + description);

        const query = `UPDATE tasks SET name = ?, description = ? WHERE id = ? AND userOwner = ?`

        const params = [name, description, id, userId];

        database.run(query, params, (err) => {

            if (err) return console.log(err);

            const task = {
                name,
                description,
            };

            res.status(201).json({ message: "task edited successfully!", task });

        })

    } catch (error) {
        console.log("error updating task\n\n\n");
        console.log(error);
    }
})

tasksRouter.delete('/api/tasks/:id', isAuthenticated, (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    console.log(id);
    console.log(userId);
    try {

        const query = `DELETE FROM tasks WHERE id = ? AND userOwner = ?`;

        const params = [id, userId];

        database.run(query, params, (err) => {

            if (err) return console.log(err);

            res.status(201).json({ message: "task deleted successfully!" });

        })

    } catch (error) {
        console.log("error updating task\n\n\n");
        console.log(error);
    }

})

export default tasksRouter;

import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { database } from "../db.js";

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: false }));
authRouter.use(passport.initialize());
authRouter.use(passport.session());


authRouter.get('/api/signup', (req, res) => res.json({ message: "pagina de registro (hacer petición tipo POST con datos: name, username y password)" }));
authRouter.get('/api/login', (req, res) => res.json({ message: "pagina de inicio de sesión (hacer petición tipo POST con datos: username y password)" }));

authRouter.post('/api/signup', async (req, res) => {

    const { userId, password } = req.body;
    let { username } = req.body;
    const hashPasswd = bcrypt.hashSync(password, 10);
    let userIdExists = false;

    try {

        if (!userId || !password) return res.status(400).json({ message: "UserId and password are required " });

        if (!username) username = userId;

        await database.all("SELECT * FROM users WHERE userId = ?", userId, (err, results) => {
            if (err) {
                res.status(402).json({ "error": err.message });
                return;
            }

            userIdExists = results.length > 0;
        })


        await database.run('INSERT INTO users (username, userId, password) VALUES (?, ?, ?)', [username, userId, hashPasswd], (results, err) => {

            if (userIdExists) return res.status(400).json({ message: "userId Already exists" });

            if (err) return res.status(400).json({ message: "Error creating user" });

            return res.status(201).json({ message: "User created successfully!", redirectUrl: 'http://localhost:8000/api/login' });


        });

    } catch (err) {
        return console.error(err);
    }



})

authRouter.post('/api/login', passport.authenticate('local.login'), (req, res) => {
    return res.json({ message: 'You are logged in successfully!.', user: req.user, tasks: 'http://localhost:8000/api/tasks'});
});

export { authRouter };
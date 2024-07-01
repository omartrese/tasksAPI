import passport from "passport";
import { Strategy } from "passport-local";
import { database } from "../db.js";
import bcrypt from "bcrypt";

passport.use('local.login', new Strategy({
    usernameField: 'userId',
    passwordField: 'password',
    passReqToCallback: true
},

    async (req, userId, password, done) => {
        try {

            if (!userId || !password) return done(null, false, { error: "UserId and password are required" });

            await database.all("SELECT * FROM users WHERE userId = ?", userId, async (error, results) => {
                if (error) return done({ error: "Error query database" });

                if (results.length === 0) return done(null, false, { error: 'No valid userId or password.' });

                const user = results[0];
                console.log(user);

                if (!user) return done(null, false, { error: 'No valid userId or password.' });
                const validPasswd = bcrypt.compareSync(password, user.password);

                return validPasswd ? done(null, user) : done(null, false, { error: 'Wrong password.' });
            });


        } catch (err) {
            return done(err);
        }
    }));

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    done(null, user.userId);
});

passport.deserializeUser(async (userId, done) => {
    try {
        await database.all("SELECT * FROM users WHERE userId = ?", userId, async (error, results) => {
            if (error) return done({ error: "Error query database" });

            const user = results[0];

            // console.log("Deserializing user:", user);

            done(null, user);
        });
    } catch (err) {
        done(err);
    }
});
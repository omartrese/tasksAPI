import sqlite3 from 'sqlite3'

sqlite3.verbose();

const database = new sqlite3.Database("./database.db", (err) => {
    if(err) return console.log(err.message);

    return console.log("db connected successfully!");
})

export { database };
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routes/user_routes.js";
import dotenv from 'dotenv';
import path from 'path';

const app = express();
dotenv.config();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

const __dirname = path.resolve();
app.use(morgan('dev'));
app.use(express.json());
app.use("/api/v1", router);

app.get("/ping", (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
})

app.get("/urlencoded", (req, res) => {
    res.send(
        `<form method='post' action='/login'>
            <input name="email" placeholder="email" />
            <input name="password"  placeholder="password"/>
            <button>login</button>
        </form>`
    )
})

app.post('/login', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    //to be store in DB => 
    res.send(`Your email ${req.body.email} and passsword is ${req.body.password}`)
})


mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB error", err))

app.listen(process.env.PORT, ()=>console.log("working on a port 5001"));
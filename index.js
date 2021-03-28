import express from 'express';
import cors from 'cors';
import path from 'path';
import { createRequire } from 'module';

const __dirname = path.resolve();
const require = createRequire(import.meta.url);
const bParser = require('body-parser');

let app = express();

let messages = [];

const timeStamp = () => {
    let d = new Date();
    let time = `${d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()} | ${d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear()}`;
    return time
}

app.use(bParser.urlencoded({ extended: true }))
app.use(bParser.json());

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/message/', (req, res) => {
    console.log('You have a mail:', req.body)
    messages.push({
        userName: req.body.userName,
        message: req.body.message,
        time: timeStamp()
    })
    res.send('Message sent successfully!')
})

app.listen(process.env.PORT)
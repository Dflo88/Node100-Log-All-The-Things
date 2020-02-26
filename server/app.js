const express = require('express');
// const logFile = require('./log.csv')
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
// write your logging code here
const agent = req.headers["user-agent"].replace(/,/g, '');
const time = new Date().toISOString();
const method = req.method;
const resource = req.url;
const version = `http/${req.httpVersion}`;
const status = '200';

fs.appendFile('./server/log.csv', agent+",", (err) => {
    if (err) throw err;
    fs.appendFile('./server/log.csv', time+",", (err) => {
        if (err) throw err;
        fs.appendFile('./server/log.csv', method+",", (err) => {
                if (err) throw err;
                fs.appendFile('./server/log.csv', resource+",", (err) => {
                    if (err) throw err;
                    fs.appendFile('./server/log.csv', version+",", (err) => {
                        if (err) throw err;
                        fs.appendFile('./server/log.csv', status+"\n", (err) => {
                            if (err) throw err;
})})})})})});
next();

});

app.get('/', (req, res) => {
    console.log(req);
// write your code to respond "ok" here
    res.status(200).send('ok');
});

app.get('/logs', (req, res) => {
    console.log(req);
// write your code to return a json object containing the log data here
    fs.readFile('./server/log.csv', (err,data) => {
        res.status(200).send(data)
    });
});

module.exports = app;

const dotenv = require('dotenv');
const express = require('express');
const app = express();

// Config environment
dotenv.config();

// use EJS with Express, specify views folder
app.set('views', 'target/views');
app.set('view engine', 'ejs');
app.use(express.static('target/static'));

const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

module.exports = app;

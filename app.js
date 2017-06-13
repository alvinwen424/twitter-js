const express = require('express');
const nunjucks = require('nunjucks')
const app = express();
const routes = require('./routes');
const socketio = require('socket.io');



nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views'); // point nunjucks to the proper directory for templates

const server = app.listen(3000, () => {console.log('Listening on 3000')});
const io = socketio.listen(server);

app.use('/', routes(io));

app.use('/static',express.static('public'));
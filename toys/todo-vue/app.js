// app.js

const express = require('express');
const ejs = require('ejs');

const host = '127.0.0.1';
const port = 8080;

var app = express();

app.use(express.static('public'));

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './views');


app.get('/', (req, res) =>{
  var document = {};
  document['_time'] = new Date();
  console.debug('time: ' + document._time);

  res.render('todos', document);
});

app.get('/login', (req, res) =>{
  var document = {};
  document['_time'] = new Date();
  console.debug('login time: ' + document._time);

  res.render('login', document);
});

app.get('/callback', (req, res) =>{
  var document = {};
  document['_time'] = new Date();
  console.debug('callback time: ' + document._time);

  res.render('callback', document);
});

app.listen(port, () => {
    console.log(`Web server is running at ${host}:${port}`);
});

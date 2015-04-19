var mongodb    = require('mongodb');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

app.engine('html', require('ejs').renderFile);
app.use('/www', express.static(__dirname + '/www'));
app.set('views', './www/');
app.set('view engine', 'html');
app.use(bodyParser());

app.get('/', function(req, res){
    res.render('');
});

var port = 8080;

app.listen(port);
console.log('Listening on port ' + port);
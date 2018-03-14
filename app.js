var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())

//注册路由

const all = require('./routes/all')

app.use('/all', all)


var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

const http = require('http');
const express = require('express');
const router = require('./router.js');
const qs = require('querystring');
const bodyParser=require('body-parser');

var app = express();
http.createServer(app).listen(8080);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
   extended: false,                 //扩展模式
   limit:    2*1024*1024           //限制-2M
}));
console.log("开始运行...");

app.post('/login',router.login);
app.post('/regist',router.regist);
app.post('/namerepeatcheck',router.namerepeatcheck);
app.post('/cidrepeatcheck',router.cidrepeatcheck);
app.post('/pwcheck',router.pwcheck);
app.post('/pwedit',router.pwedit);
app.post('/infoload',router.infoload);
app.post('/authedit',router.authedit);
app.post('/cidrepeatcheckforuser',router.cidrepeatcheckforuser);
app.post('/book',router.book);
app.post('/returnticket',router.returnticket);
app.post('/bookinfoload',router.bookinfoload);

app.get('/date',router.date);
app.get('/ticket',router.ticket);
app.get('/line',router.line);
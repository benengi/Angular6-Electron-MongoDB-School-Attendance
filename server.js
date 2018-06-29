var express = require('express');
var bodyParser = require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());

var child = require('child_process').exec('net start MongoDB', function (error, stdout, stderr) {

});

app.all('/*',function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if(req.method=='OPTIONS'){
        res.status(200).end();
    }else{
        next();
    }
});

app.use('/api/user',require('./src/api/user'));
app.use('/api/class',require('./src/api/class'));
app.use('/api/student',require('./src/api/student'));
app.use('/api/attendance',require('./src/api/attendance'));


setTimeout(() => {

var server=app.listen(9090,function(req,res){
    var host = server.address().address;
    var port = server.address().port;
    console.log("listening at %s %s",host,port);
});
    
}, 1000);

require("http").createServer(function (req, res) {
    res.end("Hello from server started by Electron app!");
}).listen(9000);

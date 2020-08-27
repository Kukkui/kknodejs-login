var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'kukkui',
    password : 'kukkui',
    database : 'nodelogin'
});

//Set app as express 
var app = express();

//Set session with Express module
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(request,response){
    response.sendFile(path.join(__dirname + '/login.html'));

    //response send file to client from path of /login.html file
    
});

//get data from request.body.xxx from html name in body.
app.post('/auth', function(request,response){
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        
        if(results.length > 0){
            //set session here
            //session name at the end request.session.xxx ... xxx is session name
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
        }else{
            response.send('Incorrect account');
        }

        response.end();
        });
    }
    else{
        response.send('Please enter Username and Passeord');
        response.end();
    }
});

app.get('/home',function(request,response){
    if(request.session.loggedin){
        response.send('Welcome : ' + request.session.username);
    } 
    else{
        response.send('Login First');
    }
    response.end();
    //similar to break fn
});

app.listen(3000);

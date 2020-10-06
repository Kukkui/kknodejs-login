var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var xlsxj = require("xlsx-to-json");
var excelToJson = require('convert-excel-to-json');
var XLSX = require('xlsx');
var http = require('http');
var fill_pdf = require('fill-pdf-utf8');
const pdftk = require('node-pdftk');
var formidable = require('formidable');

// var pdffiller = require('pdffiller');
// var execPHP = require('./execphp.js')();

// execPHP.phpFolder = 'C:\Users\kukku\Desktop\kukkui-nodejs\kknodejs-login\nodelogin\phpfiles';
var app = express();
app.use(express.static(__dirname));

// app.use('*.php',function(request,response,next) {
// 	execPHP.parseFile(request.originalUrl,function(phpResult) {
// 		response.write(phpResult);
// 		response.end();
// 	});
// });




var workbook = XLSX.readFile('test.xlsx');
var sheet_name_list = workbook.SheetNames;
var jsondatax = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
// const utf8 = require('utf8');
const fs = require('fs');
jsondatax = JSON.stringify(jsondatax);
fs.writeFile('./test.json', jsondatax, (err) => {
    if (!err) {
        console.log('done');
    }
});
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'kukkui',
    password : 'kukkui',
    database : 'nodelogin'
});

//Set app as express 
var app = express();
// var app = http.createServer(function(req,res){
    
// });
//Set session with Express module
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.csv());
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/'));
// app.use(express.static(__dirname + '/fonts'));
// app.use(express.static(__dirname + '/images'));
// app.use(express.static(__dirname + '/js'));
// app.use(express.static(__dirname + '/vendor'));
app.get('/',function(request,response){
    // response.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({ a: 1 }));
    console.log(__dirname);
    response.sendFile('/loginx.html',{root: __dirname});
    app.use(express.static(__dirname));
    // response.send(jsondatax);
    
    
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

        // response.end();
        });
    }
    else{
        response.send('Please enter Username and Passeord');
        // response.end();
    }
});

app.post('/pdf-fill-form', function(request,response){
//     var sourcePDF = "public/pdf-template/TestForm4New.pdf";
// var destinationPDF =  "public/outx.pdf";
// var data = {
//     "Pre":col7,
//                  "Name":col8 + " " + col9,
//                  "FA":col35,
//                  "FAPositionName":col34,
//                  "HouseNumber":housenumber,
//                  "Mhoo":mhoo,
//                  "Village":village,
//                  "Soii": soii,
//                  "Road":road,
//                  "Kwang":kwang,
//                  "District":district,
//                  "Province":province,
//                  "Postal":col16,
//                  "one":one,
//                  "two":two,
//                  "three":three,
//                  "four":four
// };

// pdfFiller.fillForm( sourcePDF, destinationPDF, data, function(err) {
//     if (err) throw err;
//     alert("In callback (we're done).");
// });
    var col0 = request.body.col0;
    var col1 = request.body.col1;
    var col2 = request.body.col2;
    var col3 = request.body.col3;
    var col4 = request.body.col4;
    var col5 = request.body.col5;
    var col6 = request.body.col6;
    var col7 = request.body.col7;
    var col8 = request.body.col8;
    var col9 = request.body.col9;
    var col10 = request.body.col10;
    var col11 = request.body.col11;
    var col12 = request.body.col12;
    var col13 = request.body.col13;
    var col14 = request.body.col14;
    var col15 = request.body.col15;
    var col16 = request.body.col16;
    var col17 = request.body.col17;
    var col18 = request.body.col18;
    var col19 = request.body.col19;
    var col20 = request.body.col20;
    var col21 = request.body.col21;
    var col22 = request.body.col22;
    var col23 = request.body.col23;
    var col24 = request.body.col24;
    var col25 = request.body.col25;
    var col26 = request.body.col26;
    var col27 = request.body.col27;
    var col28 = request.body.col28;
    var col29 = request.body.col29;
    var col30 = request.body.col30;
    var col31 = request.body.col31;
    var col32 = request.body.col32;
    var col33 = request.body.col33;
    var col34 = request.body.col34;
    var col35 = request.body.col35;
    var col36 = request.body.col36;
    var col37 = request.body.col37;
    var col38 = request.body.col38;
    var col39 = request.body.col39;
    var col40 = request.body.col40;
    var col41 = request.body.col41;
    var col42 = request.body.col42;
    var col43 = request.body.col43;
    var col44 = request.body.col44;
    var col45 = request.body.col45;
    var soii = request.body.soii;
    var mhoo = request.body.mhoo;
    var housenumber = request.body.housenumber;
    var kwang = request.body.kwang;
    var district = request.body.district;
    var village = request.body.village;
    var road = request.body.road;
    var province = request.body.province;
    
    var one = request.body.one;
    var two = request.body.two;
    var three = request.body.three;
    var four = request.body.four;
    

 

     fill_pdf.generatePdf(
         {fields:
             {
                
                 Pre:col7,
                 Name:col8 + " " + col9,
                 FA:col35,
                 FAPositionName:col34,
                 HouseNumber:housenumber,
                 Mhoo:mhoo,
                 Village:village,
                 Soii: soii,
                 Road:road,
                 Kwang:kwang,
                 District:district,
                 Province:province,
                 Postal:col16,
                 one:one,
                 two:two,
                 three:three,
                 four:four
             }
         },
         'public/pdf-template/TestForm4New.pdf',
         {fontSize: 10.0},
         'public/result.pdf',
         function (error, stdout, stderr) {
             if(error){
                 throw error;
             }
             console.log(stdout);
            
             }
         )
        //   const filex = `${__dirname}/result.fdf`;
         // response.download(filex); // Set disposition and send it.
        response.redirect('/download');
        // response.send('DONE');
        // response.end();
         // Trigger the browser to download the PDF document
    
       
});

app.post('/upload', function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        response.redirect('/home');
    });
});
app.get('/download', function (req, res) {
    
    // var filePath = "./result.pdf";

    // fs.readFile(__dirname + filePath , function (err,data){
    //     res.contentType("application/pdf");
    //     res.send(data);
    // });

    var path = require('path');     
    var file = path.join(__dirname, 'public/result.xfdf');    
    res.download(file, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");
       }    
    });
});

        

app.get('/home',function(request,response){
    if(request.session.loggedin){
        // response.send('Welcome : ' + request.session.username);
        response.sendFile('public/customerx.html',{root:__dirname});
        app.use(express.static(__dirname));
    } 
    else{
        response.send('Login First');
    }
    // response.end();
    //similar to break fn
});
// app.get('/filex', (req, res, next) => {
//     var formdata="public/result.xfdf";
//     pdftk
//         .input('public/result.pdf')
//         .fillForm(formdata)
//         .flatten()
//         .output('public/outx.pdf')
//         .then(buf => {
//             res.type('application/pdf'); // If you omit this line, file will download
//             res.send(buf);
//         })
//         .catch(next);
// });
app.listen(3000);

var express = require('express');
var app = express();
const port = 4000;
var parser = require('body-parser');
var str = "";

app.use(parser.urlencoded({extended: true}));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/', function(req, res){
  MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db("shopdb");
    dbo.collection("products").find({}).toArray(function(err, result){
      if (err) throw err;
      console.log(result);
      db.close();
    })
  })
  console.log(str);
res.send("Server is Up ");
});


app.post('/', function(req, res){
  res.send("Server is running ");
});


app.listen(port, function(req, res){
  console.log("Server is up and Running on Port" + port);
});

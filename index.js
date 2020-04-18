const express = require('express');
const app = express();
const port = 4000;
var results = [];
var parser = require('body-parser');
var str = "";

app.use(parser.urlencoded({ extended: true}));

// Retrieve
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shopdb");
  dbo.collection("products").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    str = str + result.item;


    db.close();
  });
});

// Connect to the db





app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");



});

app.get('/show', function(req, res){
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shopdb");
  var cursor = dbo.collection('products').find();

  cursor.each(function(err, item){
      if(item != null){
        str = str + item.item + "<br>" ;
      }
  });


    db.close();

});

res.send("<h1>"+str);

});

app.post('/feed', function(req, res){
  var name = req.body.item;
  var Cost = Number(req.body.cost);
  var Quantity = Number(req.body.quantity);


  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("shopdb");
  var myobj = { item: name, cost: Cost, quantity: Quantity };
  dbo.collection("products").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});

  res.redirect('/show');
});

app.listen(port, function(req, res){
  console.log("Server is up and running fine");
});

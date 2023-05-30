const mysql = require('mysql');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const PORT = 3000;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "websitedata"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/",(req,res)=>{
    res.render('index');
});

app.get("/about",(req,res)=>{
    res.render('About');
});

app.get("/signup",(req,res)=>{
    res.render('signup');
});

app.get("/login",(req,res)=>{
    res.render('login');
});

app.post("/signup", encoder, (req, res) => {
    let firstName = req.body.fname;
    let lastName = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
    
    let newUser = {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password
    };
    con.query("INSERT INTO userdetails SET ?", newUser, function (err, result) {
      if (err) {
        console.log("Error inserting user:", err);
        res.redirect("/signup");
      } else {
        console.log("User inserted successfully");
        res.redirect("/login"); 
      }
    });
  });

app.post("/login",encoder,(req,res)=>{
    let username="";
    let eMail = req.body.email;
    let password = req.body.password;
    con.query(`Select * from userdetails where email='${eMail}' and password='${password}'`,function (err, results, fields) {
        if (results.length>0){
            con.query(`SELECT fname FROM userdetails where email='${eMail}'`, function (err, result, fields) {
              if (err) throw err;
              username=result[0]['fname'];;
            });  
            res.render("index",{ name: username });
        }else{
            res.render("login");
        }
    });
});

app.get("/cart",(req,res)=>{
    res.render('Cart');
});

app.get("/contact",(req,res)=>{
    res.render('Contact');
});

app.get("/shop",(req,res)=>{
    res.render('Shop');
});

app.listen(PORT, ()=>{
    console.log(`connected to localhost:${PORT}`);
});
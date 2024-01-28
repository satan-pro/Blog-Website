const express = require('express');
const bodyParser = require('body-parser');
const load = require('lodash');
const app = express();

const post=[];

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname+"/public"));

let date = new Date;
let currDay = date.toLocaleString("en-us", {day:"2-digit"});
let currMonth = date.toLocaleString("en-us", {month:"short"});
let currYear = date.toLocaleString("en-us", {year:"numeric"});

app.get("/", function(req, res){
    res.render('home',{post:post, day:currDay, month:currMonth, year:currYear});
});

app.post("/", function(req, res){
    let newPost = {};
    let newTitle = req.body.title;
    let newContent = req.body.content;
    newPost['postTitle'] = newTitle;
    newPost['postContent'] = newContent;
    post.push(newPost);
    res.redirect("/");
});

app.get("/about", function(req, res){
    res.render('about');
});

app.get("/contact", function(req, res){
    res.render('contact');
});

app.get("/compose", function(req, res){
    res.render('compose');
});

app.get('/posts/:postName', function(req, res){
    for(let i=0; i<post.length; i++)
    {
        if(load.lowerCase(post[i]['postTitle'])===load.lowerCase(req.params['postName']))
        {
            res.render('post',{post:post[i]});
        }
    }
});

app.listen(3000, function()
{
    console.log("Server set on port 3000");
});



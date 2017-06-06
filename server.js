var express = require('express');
var server  = express();
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(bodyParser.urlencoded({'extended':'true'}));
server.use(bodyParser.json());

var Blogpost = new Schema({
    title      : String,
    content    : String,
    updated_at : { type: Date, default: Date.now },
    ups        : { type: Number, default: 0 },
    downs        : { type: Number, default: 0 }
});
 
mongoose.model('Blogpost', Blogpost);
mongoose.connect('mongodb://localhost/data');

server.get('/', function (req, res) {
    var mongoose = require('mongoose');
    var Blogpost = mongoose.model('Blogpost');
    Blogpost.
    find().
    sort('-updated_at').
    exec( function (err, blogposts){
        if (!err) {
            res.render('index', { blogposts: blogposts });
        } else {
            console.log("Error while getting posts");
        }
    });
});

server.get('/newpost', function (req, res) {
    res.render('newpost', {});
});

server.post('/post', function (req, res) {
    console.log(req);
    var mongoose = require('mongoose');
    var Blogpost = mongoose.model('Blogpost');
    console.log(req.body.title);
    console.log(req.body.content);
    new Blogpost({
        title : req.body.title,
        content : req.body.content,
        updated_at : Date.now()
    }).save( function(err, blogpost, count){
        if (!err)
            res.redirect('/');
        else 
            console.log("Error while creating new post");
    });
});

server.listen(process.env.PORT, function() {
    console.log("Server is running!");
});
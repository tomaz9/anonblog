var express = require('express');
var server  = express();
server.set('view engine', 'ejs');
server.use(express.static('public'));

server.get('/', function (req, res) {
    res.render('index', {});
});

server.listen(process.env.PORT, function() {
    console.log("Server is running!");
});
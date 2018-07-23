var express = require('express');
var mailController = require('./controllers/mailController');

var app = express();

// choose port
var port = process.env.PORT || 8080

// //set up tamplate express
// app.set('view engine', 'ejs');

// fire controllers
mailController(app);

//static files
// app.use('/asstes', express.static('./public'))
app.use(express.static(__dirname))

//lissen to port
console.log('You are listening to port' + port);
app.listen(port, function() {
  console.log('app is running');
})
console.log('You are listening to port' + port);
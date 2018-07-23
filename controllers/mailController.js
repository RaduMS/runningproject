var bodyParser = require('body-parser');
var fs = require('fs');
var nodemailer = require('nodemailer');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vastrunningapp@gmail.com',
    pass: 'vaalseta'
  }
});

module.exports = function(app) {
  // app.set('views', path.join(__dirname, 'views'))
  app.get('/', function(req, res) {
    if (req.url == '/') {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      console.log('ceva');
      fs.createReadStream('./index.html').pipe(res);
    }
  });
  app.post('/email', urlencodedParser, function(req, res) {
    // get data from the view and added to mangodb
    console.log(req.body);
    var bodyMail = req.body.text + ' Email: ' + req.body.from + ' Phone: ' + req.body.phone;
    var htmlBodyMail = req.body.text + ' <br><br> <b> Email: </b>' + req.body.from + ' <br><br><b> Phone: </b>' + req.body.phone;
    var mailOptions = {
      from: req.body.from,
      to: 'vastrunningapp@gmail.com',
      subject: req.body.subject,
      text: bodyMail,
      html: htmlBodyMail
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
}
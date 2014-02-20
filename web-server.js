var express = require('express'),
	  phone = require('./routes/phones.js'),
    path  = require('path');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(express.static(path.join(__dirname, 'app')));
 
app.configure(function () {
	app.use(allowCrossDomain);
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/phones', phone.findAll);
app.get('/phones/:id', phone.findById);
app.post('/phones', phone.savePhone); // adding 
app.post('/phones/:id', phone.updatePhone); // updating 
app.delete('/phones/:id', phone.deletePhone);

app.listen(3000);
console.log('Listening on port 3000...');
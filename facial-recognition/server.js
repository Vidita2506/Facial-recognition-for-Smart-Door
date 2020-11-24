 var express = require('express');
 var routes = require('./routes/index');
 var app = express();
 app.use(require('cookie-parser')());
 app.use(require('body-parser').urlencoded({ limit: '100mb', extended: true }));
 app.use(require("body-parser").json({ limit: '100mb' }));
 app.use('/', routes);
 
 const port_runing = 3000;
 app.listen(port_runing);
 console.log("Application started at port: " + port_runing)
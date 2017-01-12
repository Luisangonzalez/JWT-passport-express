var express = require("express");
var bodyParser = require("body-parser");
var jwt = require("jwt-simple");
var moment = require('moment');
var auth = require("./auth.js")();
var users = require("./users.js");
var cfg = require("./config.js");
var app = express();

app.use(bodyParser.json());
app.use(auth.initialize());

app.get("/", function(req, res) {
    res.json({status: "My API is alive!"});
});

app.get("/user", auth.authenticate(), function(req, res) {
    res.json({status: "authenticate"});
    // var token = req.headers.authorization.split(" ")[1];
    // console.log('req.headers.authorization :',req.headers);
    // var payload = jwt.decode(token, 'MyS3cr3tK3Y');
    // console.log('payload --> :', payload);
    // console.log('Token --> :', token);
});

app.post("/token", function(req, res) {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = {
                sub: user.id,
                iat: moment().unix(),
                exp: moment().add(60, 'seconds').unix()
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.send({ user: user, jwtToken: token });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

app.listen(3000, function() {
    console.log("My API is running...");
});

module.exports = app;

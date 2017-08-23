//create the routes to be used by the sensors for logging data

var db = require("../models");

// Routes
module.exports = function(app) {
    
    //landing page for app
    app.get("/api/data", function(req, res) {
        db.Data.findAll({}).then(function(results) {
            res.json(results);
        });
    });
    
    //to allow sensor to do a get request for configuration data
    app.get("/api/config/:id", function(req, res){
        db.Sensor.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(results) {
            res.json(results);
        });
    });

    //add a new sensor
    app.post("/api/new", function(req, res){
        db.Sensor.create(req.body).then(function(results){
            res.json(results);
        });
    });

    //sensor to post a new record
    app.post("/api/record", function(req, res) {
        db.Data.create(req.body).then(function(results) {
            res.json(results);
        });
    });

};


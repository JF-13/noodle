//create the routes to be used by the sensors for logging data

var db = require("../models");

// Routes
module.exports = function(app) {
    
    //landing page for app

    //TODO - change this route to be specific to a single sensor.
    app.get("/api/data/:id", function(req, res) {
        db.Data.findAll({
          where: {
            SensorId: req.params.id
        }
        }).then(function(results) {
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

    //TODO - add 5 routes to update the different status values for the sensor.

    app.put("/api/pumpOn", function(req, res) {
        db.Sensor.update(req.body,
          {
            where: {
              id: req.body.id
            }
          })
        .then(function() {
          res.sendStatus(200);
        });
      });

      app.put("/api/lightOn", function(req, res) {
        db.Sensor.update(req.body,
          {
            where: {
              id: req.body.id
            }
          })
        .then(function() {
          res.sendStatus(200);
        });
      });
      
      app.put("/api/autoLightOn", function(req, res) {
        db.Sensor.update(req.body,
          {
            where: {
              id: req.body.id
            }
          })
        .then(function() {
          res.sendStatus(200);
        });
      });

      app.put("/api/autoPumpOn", function(req, res) {
        db.Sensor.update(req.body,
          {
            where: {
              id: req.body.id
            }
          })
        .then(function() {
          res.sendStatus(200);
        });
      });

      app.put("/api/targetSoil", function(req, res) {
        db.Sensor.update(req.body,
          {
            where: {
              id: req.body.id
            }
          })
        .then(function() {
          res.sendStatus(200);
        });
      });
    
    //a single route for checking online status - for use on view
    
    app.get("/api/config", function(req, res){
        db.Sensor.findAll({})
        .then(function(results) {
            res.json(results);
        });
    });

};


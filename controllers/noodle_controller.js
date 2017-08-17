//create the routes to be used by the sensors for logging data

var express = require("express");
var monitor = require("../models/monitor.js");
var sensor = require("../models/sensor.js");

// Routes
var router = {
    
    //--------------------------------------------------------------------
    //POSSIBLE ROUTES FOR USER INTERACTING ON WEBSITE
    //--------------------------------------------------------------------
    
    //landing page for app
    index: function(app){
        //get a list of all the sensors so user can choose one
        app.get("/", function(req, res) {
            //run monitor.allSensors() then load up an html page;
        });
    },

    //landing page for a specific sensor
    sensorPage: function(app){
         //serve up a page with all of the data specific to a given sensor
         app.get("/:id", function(req, res) {
        });
    },

    //let user update the status (i.e. turn on a pump) for a given sensor
    updateStatus: function(app){
        //do a post request with whatever needs to change
        app.post("/:id/update", function(req, res) {
            //run monitor.updateSensorStatus()
       });
    },

    //let user add a new sensor
    addSensor: function(app){
        //do a post request with new sensor details
        app.post("/add", function(req, res) {
            //run monitor.addSensor()
       });
    },


    //--------------------------------------------------------------------
    //POSSIBLE ROUTES FOR SENSOR TO DO REQUESTS ON DATABASE
    //--------------------------------------------------------------------

    //to allow sensor to do a post request for new data
    addData: function(app){

        //allow for sensor do to a post request with the new data
        app.post("/:id/add",function(req,res){

            //run sensor.recordNewData()
        });
    },

    //to allow sensor to do a get request for configuration data
    getSensorConfig: function(){
        app.get("/:id/config", function(req, res){
            //run sensor.getConfig() then respond with the required data
        });
    },

};

module.exports = router;


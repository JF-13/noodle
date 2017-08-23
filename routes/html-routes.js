// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.
    app.get("/", function(req, res) {

        //query the sensor database - get array of sensors so we can setup our handlebars buttons
        
        res.render("index", {
            //need to include whatever arrays we want to use
            "test": "Hello World!"
        });
    });

};

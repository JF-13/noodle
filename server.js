// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var router = require("./controllers/noodle_controller.js");

// Create an instance of the express app.
var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// //use logic and css files linked on views
app.use(express.static(__dirname + '/'));

// Specify the port.
var PORT = process.env.PORT || 8080;

//router.  See noodle_controller.js for logic.
//routes for user
router.index(app);
router.sensorPage(app);
router.addSensor(app);
router.updateStatus(app);
//routes for sensor
router.getSensorConfig(app);
router.addData(app);

// Initiate the listener.
app.listen(PORT);

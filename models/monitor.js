// Create logic to handle the routes specified in the noodle controller for a visitor to the html page.


var monitor = {
    
    //method to get all of the sensors currently in database
    allSensors: function(){
        //run query (or ORM function) from a sensor table and return all the sensors which are configured by app
        
    },

    //add a new sensor to the database
    addSensor: function(){
        
    },

    //grab data for a selected sensor to be used for a view
    getSensorData: function(sensorID){

    },

    //change sensor status value in database if certain conditions are met or if user does it manually
    //i.e. turn on/off water
    updateSensorStatus:function(){
        
    },



    //QUESTION - do we want to allow user to set a "target" soil moisture when pump is turned on
        // //set soil moisture target
        // setTargetSoilMoisture: function(){
        
        // },
        

    //QUESTION - do we care if sensor is online or not for the views?
    //potential problem in trying to do this is how do we trigger the "disconnect" case?  i.e. sensor can't call a POST request if it isn't online

        // //method to get all of the sensors currently online
        // allOnlineSensors: function(){
        
        // },

        // //method to update a sensor status when it connects or disconnects
        // changeSensorStatus: function(){

        // },  
   
}

module.exports = monitor;
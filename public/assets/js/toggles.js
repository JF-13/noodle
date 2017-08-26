
console.log("doing some js");

var pumpOn = function(id){
    
    var updates = {
        "SensorId": id,
        "pumpOn": true,
    };

    $.ajax({
        
        type: 'PUT',
        // The URL to make the request to.
        url: 'https://noodle-northwestern.herokuapp.com/api/pumpOn',
        data: updates,
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        },
        success: function() {    
            console.log("pump has been turned on for sensor "+id);
        },
    
        error: function() {
            console.log("error");
        }
    });
}

pumpOn(1);
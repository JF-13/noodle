
console.log("doing some js");

var pumpOn = function(id){
    var state = false;

    var updates = "id="+ id+"&pumpOn="+state;

    console.log(updates);

    $.ajax({
        
        type: 'PUT',
        // The URL to make the request to.
        url: 'https://noodle-northwestern.herokuapp.com/api/pumpOn',
        data: updates,
        success: function(data) {    
            console.log("pump has been turned on for sensor "+id);
        },
    });
}

pumpOn(1);
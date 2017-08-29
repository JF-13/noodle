
//toggle the config variable for a selected button
var updateDB = function(updates){
    $.ajax({       
        type: 'PUT',
        // The URL to make the request to.
        url: 'https://noodle-northwestern.herokuapp.com/api/config/update',
        data: updates,
        success: function(data) {    
            console.log("database updated");
        },
    });
}

//listener for pump on button
$(document).on("click", ".js-pump-on", function(){
    var id=$(this).attr("data-id");
    if($(this).attr("data-state") === "false"){
        //change data attr state and the newState to be saved to the DB.
        $(this).attr("data-state", "true"); 
        var newState = true;
    }
    else{
        //change data attr state and the newState to be saved to the DB.
        $(this).attr("data-state", "false"); 
        var newState = false;        
    }; 
    var updates = "id="+ id+"&pumpOn="+newState;
    updateDB(updates)
});

//listener for light button
$(document).on("click", ".js-light-on", function(){
    var id=$(this).attr("data-id");
    var updates = "id="+ id+"&lightOn="+true;
    updateDB(updates)
});

//listener for auto button
$(document).on("click", ".js-auto-on", function(){
    var id=$(this).attr("data-id");
    if($(this).attr("data-state") === "false"){
        var newState = true;
        var soilId = "#soil-target-"+id;
        //set target soil value - hardcoding for now
        //var targetSoil = parseFloat($(soilId).val());
        var targetSoil = 0.750;

        if(targetSoil >= 0 && targetSoil<=1){
            //change data attr state and the newState to be saved to the DB.
            $(this).attr("data-state", "true"); 
            var updates = "id="+ id+"&autoLightOn="+newState+"&autoPumpOn="+newState+"&targetSoil="+targetSoil;       
        }
        else{
            alert("invalid input - enter a number between 0 and 1 for target soil moisture");
        }
    }
    else{
        //change data attr state and the newState to be saved to the DB.
        $(this).attr("data-state", "false"); 
        var newState = false;
        var updates = "id="+ id+"&autoLightOn="+newState+"&autoPumpOn="+newState;
    };
    updateDB(updates);
});
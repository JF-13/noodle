var arrPlantName = ["Tomato", "Ficus Bonsai", "Aloe Vera", "Cactus"];

//initializes toggles
$('#auto-toggle').bootstrapToggle();

var initToggle = function() {
    //set ititial toggle states to off
    $('#auto-toggle').bootstrapToggle('off');
    $('#pump-toggle').bootstrapToggle('off');
    $('#light-toggle').bootstrapToggle('off');
}

var getStatusData = function(sensorId){
    //GET THE DATA
    $.ajax({       
        type: 'GET',
        // The URL to make the request to.
        url: 'https://noodle-northwestern.herokuapp.com/api/config/' + sensorId,
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        },
        success: function(data) {
            console.log("get data success");
            setToggleStatus(sensorId, data);
        },

        error: function() {
            console.log("error");
        }
    });
}

//Reads current status from database and sets toggles accordingly
var setToggleStatus = function(sensorId, data){
    if (data[0].lightOn) {
        var lightStatus = "on";
        $('#light-toggle').bootstrapToggle(lightStatus).attr("data-state", "true");
    }
    else {
        var lightStatus = 'off';
        $('#light-toggle').bootstrapToggle(lightStatus).attr("data-state", "false");
    }

    if (data[0].pumpOn) {
        var pumpStatus = "on";
        $('#pump-toggle').bootstrapToggle(pumpStatus).attr("data-state", "true");;   
    }
    else {
        var pumpStatus = 'off';
        $('#pump-toggle').bootstrapToggle(pumpStatus).attr("data-state", "false");;
    }    

    if (data[0].autoPumpOn) {
        var autoStatus = "on";
        $('#auto-toggle').bootstrapToggle(autoStatus).attr("data-state", "true");;    
    }
    else {
        var autoStatus = 'off';
        $('#auto-toggle').bootstrapToggle(autoStatus).attr("data-state", "false");;
    }

        initListeners();
}

var initListeners = function(){
    console.log("listeners on");
    //listener for light toggle
    $('#light-toggle').change(function(){
        var id=$(this).attr("data-id");
        console.log("data id for change: " + id);
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
        var updates = "id="+ id+"&lightOn="+newState;
        console.log(updates);
        updateDB(updates);
    });

    //listener for pump toggle
    $('#pump-toggle').change(function(){
        var id=$(this).attr("data-id");
        console.log("data id for change: " + id);
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
        console.log(updates);
        updateDB(updates);

        setTimeout(function(){
            if($('#pump-toggle').attr("data-state") === "true"){
                $(this).attr("data-state", "false");
                $('#pump-toggle').bootstrapToggle('off'); 
            }           
        }, 10000);
    });

    //listener for auto toggle
    $('#auto-toggle').change(function(){
        var id=$(this).attr("data-id");
        if($(this).attr("data-state") === "false"){
            var newState = true;
            var soilId = "#soil-target-"+id;
            //set target soil value
            //var targetSoil = parseFloat($(soilId).val());
            var targetSoil = .6;
            if(targetSoil >= 0 && targetSoil<=1){
                //change data attr state and the newState to be saved to the DB.
                $(this).attr("data-state", "true"); 
                var updates = "id="+ id+"&autoLightOn="+newState+"&autoPumpOn="+newState+"&targetSoil="+targetSoil;
                //$('#pump-toggle').bootstrapToggle('off').bootstrapToggle('disable');
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
            //$('#pump-toggle').bootstrapToggle('off').bootstrapToggle('enable');
        };
        console.log(updates);
        updateDB(updates);
    }); 
} 

//toggle the config variable for a selected button
var updateDB = function(updates){
    $.ajax({       
        type: 'PUT',
        // The URL to make the request to.
        url: 'https://noodle-northwestern.herokuapp.com/api/config/update',
        data: updates,
        success: function(data) {    
            console.log("status database updated");
        },
    });
}

//dropdown click selects new sensor
$('.dropdown-item').on('click', function() {
    $(".toggle").off("change");

    sensorId = $(this).attr("data-id");

    //destroys gauge
    $('.fill-gauge').empty();

    //changes sensor number and plant name in header and toggles
    $('#sensor-id').html(sensorId);
    $('#plant-name').html(arrPlantName[sensorId-1]);
    $(".toggle").attr("data-id", sensorId);

    //resets toggles to off
    initToggle();

    //re-draws charts
    initChart(sensorId);
    
    //gets sensor data
    getStatusData(sensorId);
   
}) 

//set default to sensor 2 (best data)
var sensorId = 2;

//Init sequence
initToggle();
getStatusData(sensorId);
initChart(sensorId);

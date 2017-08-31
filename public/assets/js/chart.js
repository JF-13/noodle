var counter = 0;

var initChart = function(sensorId){
    //GET THE DATA
    $.ajax({
        
        type: 'GET',
        // The URL to make the request to.
        url: 'https://noodle-northwestern.herokuapp.com/api/data/' + sensorId,
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        },
        success: function(data) {
            counter = 0;    
            drawAllCharts(data);
            dashboard(data);
            window.onresize = function(){
                $('.fill-gauge').empty();
                drawAllCharts(data);
                dashboard(data);
            };
        },

        error: function() {
            console.log("error");
        }
    });
}

var drawAllCharts = function(data) {
        drawChart(data, "#chart3", ["soil", "water", "light"], "Reading", 0, 1, ["rgb(41,128,185)", "#31b0d5","#ec971f"]);
        drawChart(data, "#chart1", ["temp"], "Temperature (F)", 65, 85, ["rgb(192,57,43)"]) ;
        drawChart(data, "#chart2", ["humid"], "Humidity (%)", 40, 70, ["rgb(22,160,133)"]);      
}
        
var dashboard = function(data) {
        //loading sensor data for dashboard
        var temp = (data[(data.length-1)].temp);
        temp = temp.toString().substr(0,4);
        $("#temp").html(temp + "°F");

        var humid = (data[(data.length-1)].humid).substr(0, 4);
        $("#humid").html(humid + "%");

        var soil= (data[(data.length-1)].soil);
        soil = soil.toString().substr(0,4);
        $("#soil").html((soil) + "%");
        
        var water = (data[(data.length-1)].water).substr(0, 4);
        drawGauge(water);

        var light = (data[(data.length-1)].light);
        if (light < .2) {
          var lightDisplay = ("Dark");
        } else if (light < .3) {
          var lightDisplay = ("Dim");
        } else if (light < .7) {
          var lightDisplay = ("Day");
        } else if(light < 1) {
          var lightDisplay = ("Bright");
        }
        $("#light").html(lightDisplay);  
}

var drawGauge = function(water) {
    	var gauge1 = loadLiquidFillGauge("fillgauge1", water*100);
		var config1 = liquidFillGaugeDefaultSettings();
		config1.circleColor = "#FF7777";
		config1.textColor = "#FF4444";
		config1.waveTextColor = "#FFAAAA";
		config1.waveColor = "#FFDDDD";
		config1.circleThickness = 0.2;
		config1.textVertPosition = 0.2;
        config1.waveAnimateTime = 1000;
}

var drawChart = function(data, targetDiv, keys, yAxisLabel, ymin, ymax, colors){
    var chart = $(targetDiv);
    chart.empty();

    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = chart.width() - margin.left - margin.right,
    height = chart.height() - margin.top - margin.bottom;
    
    var parseDate = d3.time.format("%Y%m%d").parse;
    //var bisectDate = d3.bisector(function(d) { return d.date; }).left;
    
    var num_ticks = 12;
    if (width < 300) {
        num_ticks = 3;
    }
    else if (width < 600) {
        num_ticks = 6;
    }

    var x = d3.time.scale()
    .range([0, width]);
    
    var y = d3.scale.linear()
    .range([height, 0]);
    
    let color = d3.scale.ordinal()
    .domain(keys)
    .range(colors);
    
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    var yScale = d3.scale.linear()
    .range([height, 0]);
    
    var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.reading); });
    
    var svg = d3.select(targetDiv).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    //this line chooses which keys we want to have as series in the chart
    color.domain(keys);

    data.forEach(function(d) {
        d.date = Date.parse(d.createdAt);
    });
    //console.log(counter);
    counter = counter + 1;

        var sensors = color.domain().map(function(name) {
        return {
        name: name,
        visible: true,
        values: data.map(function(d) {
                if (counter < 3){
                    if(name === "light"){
                        d[name] = 1 - parseFloat(d[name]);
                        d[name].toString();
                    }
                    if(name === "temp"){
                        d[name] = (d[name] * 9 / 5 + 32);
                        d[name].toString();
                    }
                    if(name === "soil"){
                        d[name] = 1 - parseFloat(d[name]);
                        d[name].toString();
                    }
                }
                    return {date: d.date, reading: +d[name]};
                })
            };
        });



    x.domain(d3.extent(data, function(d) { return d.date; }));

    y.domain([ymin, ymax]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        //.call(xAxis);
        .call(xAxis.ticks(num_ticks));

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yAxisLabel);


    var sensor = svg.selectAll(".sensor")
        .data(sensors)
        .enter().append("g")
        .attr("class", "sensor");

    sensor.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
        .attr("data-legend",function(d) { return d.name})
        .style("stroke", function(d) { return color(d.name); });

    /*sensor.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.reading) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; }); */


    /*legend = svg.append("g")
        .attr("class","legend")
        .attr("transform","translate(50,30)")
        .style("font-size","12px")
        .call(d3.legend)

    setTimeout(function() { 
    legend
        .style("font-size","20px")
        .attr("data-style-padding",10)
        .call(d3.legend)
    },1000)*/
    // draw legend
  var legendSpace = 35; // 450/number of issues (ex. 40)    

  sensor.append("rect")
      .attr("width", 10)
      .attr("height", 10)                                    
      .attr("x", width + (margin.right/3) - 15) 
      .attr("y", function (d, i) { return (legendSpace)+i*(legendSpace) - 8; })  // spacing
      .attr("fill",function(d) {
        return d.visible ? color(d.name) : "#F1F1F2";
             // If array key "visible" = true then color rect, if not then make it grey 
      })

      .attr("class", "legend-box")

      .on("click", function(d){ // On click make d.visible 
        d.visible = !d.visible; // If array key for this data selection is "visible" = true then make it false, if false then make it true

       /* maxY = findMaxY(keys); // Find max Y rating value categories data with "visible"; true
        yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
        svg.select(".y.axis")
          .transition()
          .call(yAxis); */

        sensor.select("path")
          .transition()
          .attr("d", function(d){
            return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
          })

        sensor.select("rect")
          .transition()
          .attr("fill", function(d) {
          return d.visible ? color(d.name) : "#F1F1F2";
        });
      })

      .on("mouseover", function(d){

        d3.select(this)
          .transition()
          .attr("fill", function(d) { return color(d.name); });

        d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
          .transition()
          .style("stroke-width", 2.5);  
      })

      .on("mouseout", function(d){

        d3.select(this)
          .transition()
          .attr("fill", function(d) {
          return d.visible ? color(d.name) : "#F1F1F2";});

        d3.select("#line-" + d.name.replace(" ", "").replace("/", ""))
          .transition()
          .style("stroke-width", 1.5);
      })
      
  sensor.append("text")
      .attr("x", width + (margin.right/3)) 
      .attr("y", function (d, i) { return (legendSpace)+i*(legendSpace); })  // (return (11.25/2 =) 5.625) + i * (5.625) 
      .text(function(d) { return d.name; }); 


  // End Data callback function
  
  function findMaxY(data){  // Define function "findMaxY"
    var maxYValues = data.map(function(d) { 
      if (d.visible){
        return d3.max(d.values, function(value) { // Return max rating value
          return value.rating; })
      }
    });
    return d3.max(maxYValues);
  }

};
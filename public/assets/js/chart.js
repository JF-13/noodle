

var sensorId = 2
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
        drawChart(data, "#chart3", ["soil", "water", "light"], "Reading", 0, 1, ["#62ad1b", "#704569","#ffd2a0"]);
        drawChart(data, "#chart1", ["temp"], "Temperature (C)", 0, 40, ["#35db29"]) ;
        drawChart(data, "#chart2", ["humid"], "Humidity (%)", 0, 100, ["#528af2"]);
    },

    error: function() {
        console.log("error");
    }
});

var drawChart = function(data, targetDiv, keys, yAxisLabel, ymin, ymax, colors){

    var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    
    var parseDate = d3.time.format("%Y%m%d").parse;
    
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

    var sensors = color.domain().map(function(name) {
    return {
    name: name,
    values: data.map(function(d) {
        return {date: d.date, reading: +d[name]};
    })
    };
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));

    y.domain([ymin, ymax]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

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

    sensor.append("text")
        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.reading) + ")"; })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; });


    legend = svg.append("g")
        .attr("class","legend")
        .attr("transform","translate(50,30)")
        .style("font-size","12px")
        .call(d3.legend)

    setTimeout(function() { 
    legend
        .style("font-size","20px")
        .attr("data-style-padding",10)
        .call(d3.legend)
    },1000)

};
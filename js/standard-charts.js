
var chartType = 0
createHistogram()


d3.select('button')
.on('click', function () {
    d3.select('#standard-chart').selectAll('*').remove();
    if(chartType == 0){
        console.log("I want to create a heatmap")
        createHeatMap()
        chartType = 1
    }
    else{
        console.log("I want to create a histogram")
        createHistogram()
        chartType = 0
    }
});

function createHistogram(){
    var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

    var svgWidth = 500, svgHeight = 300, barPadding = 5;
    var barWidth = (svgWidth / dataset.length);
    
    var svg = d3.select('#standard-chart')
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    
    var barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .style('color', 'blue')
        .attr("y", function(d) {
            return svgHeight - d;
        })
        .attr("height", function(d) {
            return d;
        })
        .attr("width", barWidth - barPadding)
        .attr("transform", function (d, i) {
            var translate = [barWidth * i, 0];
            return "translate("+ translate +")";
        });
}

function createHeatMap(){
    console.log("We created a heatmap")
    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#standard-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns
    var myGroups = ["Male","Female"]
    var myVars = ["Old","Young"]

    // Build X scales and axis:
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.01);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    // Build X scales and axis:
    var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.01);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Build color scale
    var myColor = d3.scaleLinear()
    .range(["white", "#69b3a2"])
    .domain([1,50])

    //Read the data
    heatmap_data = [
        {
            "Gender": "Male",
            "AgeGroup": "Old",
            "Count": 14
        },
        {
            "Gender": "Female",
            "AgeGroup": "Old",
            "Count": 1
        },
        {
            "Gender": "Male",
            "AgeGroup": "Young",
            "Count": 21
        },
        {
            "Gender": "Female",
            "AgeGroup": "Young",
            "Count": 32
        }
    ]

     svg.selectAll()
        .data(heatmap_data, function(d) {return d.Gender+':'+d.AgeGroup;})
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.Gender) })
        .attr("y", function(d) { return y(d.AgeGroup) })
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.Count)} )
}
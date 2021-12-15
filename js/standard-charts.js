
// var chartType = 0
// createHistogram()


d3.select('button')
.on('click', function () {
    var order_vals = []

    var values = d3.select("#trail")
        .selectAll("li")
    values.each(function (p,j) {
        // console.log("p: " + p, "j: " + j)
        var this_text = d3.select(this).text();
        // console.log(this_text)
        order_vals.push(this_text)
    });  
    
    console.log(order_vals)

    d3.json("../datasets/flare-2.json").then(function(data){
        // console.log(data)

        var explore = data.children;
        var sub_explore = [];
        var data_objs = [];
        explore.forEach(element => {
            if (element.name == order_vals[0]){
                sub_explore = element.children;
                sub_explore.forEach(ele => {
                    if (ele.name == order_vals[1]){
                        data_objs = ele.children;
                    }
                });
            }
        });

        console.log(data_objs);
        const svg = d3.select("#standard-chart");

        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.bottom;

        var x = d3.scaleBand().rangeRound([0,width]).padding(0.2);
        var y = d3.scaleLinear().rangeRound([height,0]);
        g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        x.domain(data_objs.map(d => d.name));
        y.domain([0, d3.max(data_objs, d => d.value)]);

        g.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))

        g.append("g")
            .attr("class", "axis axis-y")
            .call(d3.axisLeft(y).ticks(10));

        g.selectAll(".bar")
            .data(data_objs)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value));
    });
    // d3.select('#standard-chart').selectAll('*').remove();
    // if(chartType == 0){
    //     console.log("I want to create a heatmap")
    //     createHeatMap()
    //     chartType = 1
    // }
    // else{
    //     console.log("I want to create a histogram")
    //     createHistogram()
    //     chartType = 0
    // }

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
d3.select('h1').style('color', 'red')
.attr('class', 'heading')
.text('Updated h1 via D3');

d3.select('body').append('p').text('First Paragraph');
d3.select('body').append('p').text('Second Paragraph');
d3.select('body').append('p').text('Third Paragraph');

d3.selectAll('p').style('color', 'blue');

var dataset = [1,2,3,4,5];

d3.select('body')
    .selectAll('p')
    .data(dataset)
    .enter()
    .append('p')
    //.text('D3 append');
    .text(function(d) {return d; });

var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);

var svg = d3.select('svg')
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
//select svg element
var svg = d3.select('svg')

svg.append('rect')
  .attr('x', 50)
  .attr('y', 50)
  .attr('width', 200)
  .attr('height', 100)
  .attr('fill', 'green')

var data = [80, 120, 60, 150, 200];

var barHeight = 20;

var bar = d3.select('#barchart')
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('width', function (d) { return d; })
  .attr('height', barHeight - 1)
  .attr('transform', function (d, i) {
    return "translate(0," + i * barHeight + ")";
  });
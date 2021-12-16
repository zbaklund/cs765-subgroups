var datasets = ['ATUS','Used Cars'];
d3.select('#dataset-select').selectAll("option")
.data(datasets)
.enter()
.append("option")
    .attr("value", function(d,){return d;})
    .text(function(d) { return d; });




var dimensions = ["Age Group", "Region", "Gender", "Race"];

d3.select("#dimension-checkboxes").selectAll("p")
.data(dimensions)
.enter()
.append("div")
.append("label")
.append("input")
    .attr("type", "checkbox")
    .attr("id", function(d,i) { return 'dimension'+i; })
    .attr("onClick", "magic(this)") //DO SOMETHING WITH THIS CHANGE FUNCTION
    .attr("for", function(d,i) { return i; })
    .attr("value", function(d,){return d;})

d3.selectAll("label")
.data(dimensions)
.append("text")
.text(function(d) { return d; });

function magic(dimension){
    // console.log(dimension.id,dimension.checked, dimension.value)
    if(dimension.checked){
        d3.select("#dimensions-selected")
        .append('p')
        .attr("id",dimension.value.replace(/ /g, ""))
        .text('We clicked on ' + dimension.value)    
    }
    else{
        // console.log("I want to remove the text")
        var id = dimension.value.replace(/ /g, "")
        d3.select('#'+id).remove()
    }

}

function switchDimensions(value){
    console.log(value);
    var all_dimensions = [["Age Group", "Region", "Gender", "Race"],["Transmission", "Condition", "Engine"]];
d3.select("#dimension-checkboxes").selectAll('div').remove()

d3.select("#dimension-checkboxes").selectAll("p")
.data(all_dimensions[value])
.enter()
.append("div")
.append("label")
.append("input")
    .attr("type", "checkbox")
    .attr("id", function(d,i) { return 'dimension'+i; })
    .attr("onClick", "magic(this)") //DO SOMETHING WITH THIS CHANGE FUNCTION
    .attr("for", function(d,i) { return i; })
    .attr("value", function(d,){return d;})

d3.selectAll("label")
    .data(all_dimensions[value])
    .append("text")
    .text(function(d) { return d; });
}

partition_data = data => {
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value)
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root)
};
    

function updateColor(threshold_val) {
    // console.log("Event triggered");
    // console.log(threshold_val);

    d3.json("https://zbaklund.github.io/cs765-subgroups/datasets/flare-2.json").then(function(data){
    // console.log(data)

    color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

    format = d3.format(",d");

    width = 932;

    radius = width / 6;

    arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

    // chart {
    const root = partition_data(data)

    root.each(d => d.current = d);

    if(d3.select("#sunburst_chart").size() != 0){
        d3.select("#sunburst_chart").remove();
    }
    const svg = d3.select("#sunburst")
            .append("svg")
            .attr("id", "sunburst_chart")
            .attr("viewBox", [0, 0, width, width])
            .style("font", "10px sans-serif");

    const g = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${width / 2})`);

    // var q_val = d3.select("#threshold").node().value;

    const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
    .attr("fill", d => { while (d.depth > 1) d = d.parent; return d.value > threshold_val ? color(d.data.name) : "FF0000"; })
    .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
    .attr("d", d => arc(d.current));

    path.filter(d => d.children)
    .style("cursor", "pointer")
    .on("click", clicked);

    path.append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

    const label = g.append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
    .attr("dy", "0.35em")
    .attr("fill-opacity", d => +labelVisible(d.current))
    .attr("transform", d => labelTransform(d.current))
    .text(d => d.data.name);

    const parent = g.append("circle")
    .datum(root)
    .attr("r", radius)
    .attr("fill", "none")
    .attr("pointer-events", "all")
    .on("click", clicked);

    function clicked(event, p) {
        console.log(event)
        console.log(p.data.name)

        d3.select("#trail")
            .append("li")
            .text(p.data.name)

        parent.datum(p.parent || root);

        root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
    });

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
    .tween("data", d => {
        const i = d3.interpolate(d.current, d.target);
        return t => d.current = i(t);
    })
    .filter(function(d) {
    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
    })
    .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
    .attrTween("d", d => () => arc(d.current));

    label.filter(function(d) {
    return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t)
    .attr("fill-opacity", d => +labelVisible(d.target))
    .attrTween("transform", d => () => labelTransform(d.current));
    }

    function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
}
});
}
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
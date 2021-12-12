var dimensions = ["Age Group", "Region", "Gender", "Race"];

d3.select("#dimension-checkboxes").selectAll("p")
.data(dimensions)
.enter()
.append("div")
.append("label")
.append("input")
    .attr("type", "checkbox")
    .attr("id", function(d,i) { return 'a'+i; })
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
        .attr("id",dimension.value)
        .text('We clicked on ' + dimension.value)    
    }
    else{
        // console.log("I want to remove the text")
        var id = dimension.value
        d3.select('#'+id).remove()
    }

}
window.onload = function(){
    var svgCanvas = d3.select("svg")
        .attr("width", 960)
        .attr("height", 540)
        .attr("class", "svgCanvas");
    
    d3.csv("third.csv", function(d){
        console.log(d); 
        
        var minValue = Infinity;
        var maxValue = -1;
        d.forEach(function(thisD){
            var thisValue = thisD["value"];
            minValue = Math.min(minValue, thisValue);
            maxValue = Math.max(maxValue, thisValue);
        });
        
        var value2range = d3.scaleLinear()
            .domain([minValue, maxValue])
            .range([0.5, 1]);
        var range2color = d3.interpolateBlues;
        
        svgCanvas.selectAll("circle")
            .data(d).enter() // create place hodlers if the data are new
            .append("circle") // create one circle for each
            .attr("cx", function(thisElement, index){ // calculate the centres of circles 
                return 150 + index * 150;
            })
            .attr("cy", 300)
            .attr("r", function(thisElement, index){ // use the value from data to create the radius 
                return thisElement["value"];
            })
            .attr("fill", function(thisElement, index){
                return range2color(value2range(thisElement["value"]))
            })
            .on("mouseover", function(thisElement, index){
                svgCanvas.selectAll("circle")
                    .attr("opacity", 0.5); // grey out all circles
                d3.select(this) // hightlight the on hovering on
                    .attr("opacity", 1);
            })
            .on("mouseout", function(thisElement, index){
                svgCanvas.selectAll("circle") // restore all circles to normal mode
                    .attr("opacity", 1);
            });
        
        svgCanvas.selectAll("text")
            .data(d).enter()
            .append("text")
            .attr("x", function(thisElement, index){
                return 150 + index * 150;
            })
            .attr("y", 300 - 35)
            .attr("text-anchor", "middle")
            .text(function(thisElement, index){
                return thisElement["title"] + ": " + thisElement["value"];
            });
        
    });
}
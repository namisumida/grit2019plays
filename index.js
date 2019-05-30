function init() {
  var svg = d3.select("#graphic-svg");
  var width = document.getElementById("graphic-svg").getBoundingClientRect().width;
  var height = document.getElementById("graphic-svg").getBoundingClientRect().height;
  var margin = { left: 20, right: 20, top: 20, bottom: 20};

  var dataset_offense = [0,1,2,3,4,5,6]; // handler 1, handler 2, handler 3, cutters...
  //////////////////////////////////////////////////////////////////
  // Building blocks
  // Field

  // Players
  svg.selectAll("offense")
     .data(dataset_offense)
     .enter()
     .append("circle")
     .attr("class", "offenseDots")
     .attr("r", 10);
  // Disc
  svg.append("circle")
     .attr("id", "disc")
     .attr("r", 10);
  // Force
  svg.append("line")
     .attr("id", "force");

//////////////////////////////////////////////////////////////////
  function reset() { // function that hides elements
    svg.selectAll(".offenseDots").style("display", "none");
    svg.selectAll("#disc").style("display", "none");
    svg.selectAll("#force").style("display", "none");
    d3.select("#button-animate").style("display", "none");
  }; // end reset
  function display() { // function that displays elements
    svg.selectAll(".offenseDots").style("display", "inline");
    svg.select("#disc").style("display", "inline");
    svg.select("#force").style("display", "inline");
  }; // end display

  function set_x() {
    // Players
    svg.selectAll(".offenseDots")
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width - 60; } // handler 3
         else if (i==3) { return width/3 + 10; }
         else if (i==4) { return width/2 + 30; }
         else { return width - 60; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 180; } // deep cut 1
         else if (i==4) { return margin.top + 180; } // deep cut 2
         else if (i==5) { return margin.top + 200; } // in stack
         else if (i==6) { return margin.top + 280; } // in stack
       })
    // Disc
    svg.select("#disc")
       .attr("cx", width/2)
       .attr("cy", margin.top + 50)
    // Force
    svg.select("#force")
       .attr("x1", width/2 - 3)
       .attr("x2", width/2+20)
       .attr("y1", margin.top + 70)
       .attr("y2", margin.top + 55)
    display();
  }; // end set_x
  function animate_x() {
    // under cut
    svg.selectAll(".offenseDots")
       .transition()
       .duration(2000)
       .attr("cx", function(d,i) {
         if (i==6) { return width/3 + 10; }
         else if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width - 60; } // handler 3
         else if (i==3) { return width/3 + 10; }
         else if (i==4) { return width/2 + 30; }
         else { return width - 60; }
       })
       .attr("cy", function(d,i) {
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return height - margin.top - margin.bottom; } // deep cut 1
         else if (i==4) { return height - margin.top - margin.bottom; } // deep cut 2
         else if (i==5) { return margin.top + 200; } // in stack
         else if (i==6) { return margin.top + 180; } // in stack
       });
    svg.select("#disc")
       .transition()
       .delay(2000)
       .duration(1000)
       .attr("cx", width/3 + 10)
       .attr("cy", margin.top + 180)

    // deep comes under
    svg.selectAll(".offenseDots")
       .transition()
       .delay(3000)
       .duration(1000)
       .attr("cx", function(d,i) {
         if (i==6) { return width/3 + 10; }
         else if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width - 60; } // handler 3
         else if (i==3) { return width/3; }
         else if (i==4) { return width/2 + 30; }
         else { return width - 60; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return height - margin.top - margin.bottom - 100; } // deep cut 1
         else if (i==4) { return height - margin.top - margin.bottom; } // deep cut 2
         else if (i==5) { return margin.top + 200; } // in stack
         else if (i==6) { return margin.top + 180; } // in stack
       })
    // disc thrown to deep cutter coming under
    svg.select("#disc")
       .transition()
       .delay(4000)
       .duration(1000)
       .attr("cx", width/3)
       .attr("cy", height - margin.top - margin.bottom - 100)

    // Disable animate
    d3.select("#button-animate").style("display", "none");
  }; // end animate_x
  function set_magician() {

  }; // end set_magician
  function set_zigzag() {

  }; // end set_zigzag
  function set_flood() {

  }; // end set_flood

  d3.select("#button-x").on("click", function() {
    reset();
    set_x();
    // button style
    d3.select(this).style("background-color", "navy");
    d3.select(this).style("color", "white");
    d3.select("#button-animate").style("display", "inline");
    d3.select("#button-animate").on("click", function() {
      animate_x();
    })
  })
};

init();

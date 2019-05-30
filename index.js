function init() {
  var width = document.getElementById("graphic-svg").getBoundingClientRect().width - 20;
  var height = document.getElementById("graphic-svg").getBoundingClientRect().height;
  var svg = d3.select("#graphic-svg");
  var margin = { left: 20, right: 20, top: 20, bottom: 20};

  var dataset_offense = [0,1,2,3,4,5,6]; // handler 1, handler 2, handler 3, cutters...
  //////////////////////////////////////////////////////////////////
  // Building blocks
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
    // default button
    d3.selectAll("button").style("background-color", "#DCDCDC").style("color", "navy");
    d3.select("#button-animate").style("background-color", "red").style("color", "white");
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
         else if (i==2) { return width*.9; } // handler 3
         else if (i==3) { return width/3 + 10; } // deep cutter 1
         else if (i==4) { return width/2 + 30; } // deep cutter 2
         else { return width*.9; } // stack
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
       .filter(function(d,i) { return i<6; })
       .transition()
       .duration(1500)
       .attr("cx", function(d,i) {
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width*.9; } // handler 3
         else if (i==3) { return width/3 + 10; }
         else if (i==4) { return width/2 + 30; }
         else { return width*.9; }
       })
       .attr("cy", function(d,i) {
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return height - margin.top - margin.bottom; } // deep cut 1
         else if (i==4) { return height - margin.top - margin.bottom; } // deep cut 2
         else { return margin.top + 200; } // in stack
       });
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==6; })
       .transition()
       .delay(800)
       .duration(1000)
       .attr("cx", width/3)
       .attr("cy", margin.top + 180)
    svg.select("#disc")
       .transition()
       .delay(1000)
       .duration(800)
       .attr("cx", width/3)
       .attr("cy", margin.top + 180)

    // deep comes under
    svg.selectAll(".offenseDots")
       .transition()
       .delay(2000)
       .duration(800)
       .attr("cx", function(d,i) {
         if (i==6) { return width/3; }
         else if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width*.9; } // handler 3
         else if (i==3) { return width/3; }
         else if (i==4) { return width/2 + 30; }
         else { return width*.9; }
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
       .delay(2000)
       .duration(800)
       .attr("cx", width/3)
       .attr("cy", height - margin.top - margin.bottom - 100)

    d3.select("#button-animate").style("display", "none"); // Disable animate
  }; // end animate_x
  function set_magician() {
    // Players
    svg.selectAll(".offenseDots")
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width*2/3 + 20; } // handler 2
         else { return width*.9; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top + 90; } // magician
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 190; } // cutter 1
         else if (i==4) { return margin.top + 260; } // cutter 2
         else if (i==5) { return margin.top + 330; } // cutter 3
         else if (i==6) { return margin.top + 400; } // cutter 4
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
  }; // end set_magician
  function animate_magician() {
    svg.selectAll(".offenseDots")
       .transition()
       .duration(1500)
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/2 - 50; } // magician
         else { return width*.9; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top + 250; } // magician
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 190; } // cutter 1
         else if (i==4) { return margin.top + 260; } // cutter 2
         else if (i==5) { return margin.top + 330; } // cutter 3
         else if (i==6) { return margin.top + 400; } // cutter 4
       });
    svg.select("#disc")
       .transition()
       .delay(800)
       .duration(800)
       .attr("cx", width/2 - 50)
       .attr("cy", margin.top + 250);
    svg.selectAll(".offenseDots")
       .transition()
       .delay(1800)
       .duration(1500)
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/2 - 50; } // magician
         else if (i==6) { return width/2; }
         else { return width*.9; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top + 250; } // magician
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 190; } // cutter 1
         else if (i==4) { return margin.top + 260; } // cutter 2
         else if (i==5) { return margin.top + 330; } // cutter 3
         else if (i==6) { return height*2; } // cutter 4
       });
     svg.select("#disc")
        .transition()
        .delay(2000)
        .duration(1500)
        .attr("cx", width/2 - 40)
        .attr("cy", height*2);
    d3.select("#button-animate").style("display", "none"); // Disable animate
  }; // end animate_magician
  function set_zigzag(force) {
    // Players
    svg.selectAll(".offenseDots")
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width*.9; } // handler 3
         else if (i==3) { return width/3 + 10; }
         else if (i==4) { return width/2 + 30; }
         else { return width*.9; }
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
    if (force=="backhand") {
      svg.select("#force")
         .attr("x1", width/2 - 20)
         .attr("x2", width/2 + 3)
         .attr("y1", margin.top + 55)
         .attr("y2", margin.top + 70)
    }
    else {
      svg.select("#force")
         .attr("x1", width/2 - 3)
         .attr("x2", width/2+20)
         .attr("y1", margin.top + 70)
         .attr("y2", margin.top + 55)
    }
    display();
  }; // end set_zigzag
  function animate_zigzag_forehand() {
    svg.selectAll(".offenseDots")
       .transition()
       .duration(1500)
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width*.9; } // handler 3
         else if (i==3) { return width/3 + 10; } // iso cutter
         else if (i==4) { return width/2 + 30; } // iso cutter
         else { return width*.9; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 300; } // iso cutter
         else if (i==4) { return margin.top + 300; } // iso cutter
         else if (i==5) { return margin.top + 200; } // in stack
         else if (i==6) { return margin.top + 280; } // in stack
       })
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==3; })
       .transition()
       .delay(1500)
       .duration(1000)
       .attr("cx", width/2 + 50)
       .attr("cy", margin.top + 200);
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==4; })
       .transition()
       .delay(1500)
       .duration(1500)
       .attr("cx", width/3 - 20)
       .attr("cy", margin.top + 200);
    svg.select("#disc")
       .transition()
       .delay(2500)
       .duration(500)
       .attr("cx", width/3 - 20)
       .attr("cy", margin.top + 200);
    d3.select("#button-animate").style("display", "none"); // Disable animate
  }; // end animate_zigzag
  function animate_zigzag_backhand() {
    svg.selectAll(".offenseDots")
       .transition()
       .duration(1500)
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else if (i==2) { return width*.9; } // handler 3
         else if (i==3) { return width/3 + 10; } // iso cutter
         else if (i==4) { return width/2 + 30; } // iso cutter
         else { return width*.9; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 260; } // top of stack
         else if (i==3) { return margin.top + 280; } // iso cutter
         else if (i==4) { return margin.top + 280; } // iso cutter
         else if (i==5) { return margin.top + 320; } // in stack
         else if (i==6) { return margin.top + 390; } // in stack
       })
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==3; })
       .transition()
       .delay(1500)
       .duration(1000)
       .attr("cx", width/2 + 50)
       .attr("cy", margin.top + 200);
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==4; })
       .transition()
       .delay(1500)
       .duration(1500)
       .attr("cx", width/3 - 20)
       .attr("cy", margin.top + 200);
    svg.select("#disc")
       .transition()
       .delay(2500)
       .duration(500)
       .attr("cx", width/2 + 50)
       .attr("cy", margin.top + 200);
    d3.select("#button-animate").style("display", "none"); // Disable animate
  }; // end animate_zigzag
  function set_flood() {
    // Players
    svg.selectAll(".offenseDots")
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else { return width*.9; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 190; } // deep cut 1
         else if (i==4) { return margin.top + 260; } // deep cut 2
         else if (i==5) { return margin.top + 330; } // in stack
         else if (i==6) { return margin.top + 400; } // in stack
       })
    // Disc
    svg.select("#disc")
       .attr("cx", width/2)
       .attr("cy", margin.top + 50)
    // Force
    svg.select("#force")
       .attr("x1", width/2-20)
       .attr("x2", width/2+3)
       .attr("y1", margin.top + 55)
       .attr("y2", margin.top + 70)
    display();
  }; // end set_flood
  function animate_flood() {
    // flood
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i<6; })
       .transition()
       .duration(1500)
       .attr("cx", function(d,i) {
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else { return width/3 - 50; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // handler 2
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 190; } // deep cut 1
         else if (i==4) { return margin.top + 260; } // deep cut 2
         else { return margin.top + 330; } // in stack
       })
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==6; })
       .transition()
       .delay(800)
       .duration(800)
       .attr("cx", width*.8)
       .attr("cy", margin.top + 200);
    svg.select("#disc")
       .transition()
       .delay(800)
       .duration(800)
       .attr("cx", width*.8)
       .attr("cy", margin.top + 200);
    d3.select("#button-animate").style("display", "none"); // Disable animate
  }; // end animate_flood
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
  });
  d3.select("#button-flood").on("click", function() {
    reset();
    set_flood();
    // button style
    d3.select(this).style("background-color", "navy");
    d3.select(this).style("color", "white");
    d3.select("#button-animate").style("display", "inline");
    d3.select("#button-animate").on("click", function() {
      animate_flood();
    })
  });
  d3.select("#button-magician").on("click", function() {
    reset();
    set_magician();
    // button style
    d3.select(this).style("background-color", "navy");
    d3.select(this).style("color", "white");
    d3.select("#button-animate").style("display", "inline");
    d3.select("#button-animate").on("click", function() {
      animate_magician();
    })
  });
  d3.select("#button-zigzag-f").on("click", function() {
    reset();
    set_zigzag("forehand");
    // button style
    d3.select(this).style("background-color", "navy");
    d3.select(this).style("color", "white");
    d3.select("#button-animate").style("display", "inline");
    d3.select("#button-animate").on("click", function() {
      animate_zigzag_forehand();
    })
  });
  d3.select("#button-zigzag-b").on("click", function() {
    reset();
    set_zigzag("backhand");
    // button style
    d3.select(this).style("background-color", "navy");
    d3.select(this).style("color", "white");
    d3.select("#button-animate").style("display", "inline");
    d3.select("#button-animate").on("click", function() {
      animate_zigzag_backhand();
    })
  });
};

init();

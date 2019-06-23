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
   // Force 2
   svg.append("line")
      .attr("id", "defense1");
  //////////////////////////////////////////////////////////////////
  function reset() { // function that hides elements
    // Hide elements
    svg.selectAll(".offenseDots").style("display", "none");
    svg.select("#disc").style("display", "none");
    svg.select("#force").style("display", "none");
    svg.select("#defense1").style("display", "none");
    // default button
    d3.selectAll("button").style("background-color", "#DCDCDC").style("color", "navy");
    d3.select("#button-animate").style("background-color", "red").style("color", "white").style("display", "inline");
    // Hide forehand and backhand
    d3.select("#button-forehand").style("display", "none");
    d3.select("#button-backhand").style("display", "none");
  }; // end reset
  function display(defense1) { // function that displays elements
    svg.selectAll(".offenseDots").style("display", "inline");
    svg.select("#disc").style("display", "inline");
    svg.select("#force").style("display", "inline");
    d3.select("#button2-container").style("display", "block");
    if (defense1==true) {
      svg.select("#defense1").style("display", "inline");
    }
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
    display(false);
  }; // end set_x
  function animate_x() {
    d3.select("#button-animate").style("display", "none"); // Disable animate
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

    d3.select("#button-animate")
      .transition()
      .delay(3300)
      .style("display", "inline");
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
    display(false);
  }; // end set_magician
  function animate_magician() {
    d3.select("#button-animate").style("display", "none"); // Disable animate
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
         else if (i==6) { return height*1.5; } // cutter 4
       });
     svg.select("#disc")
        .transition()
        .delay(2000)
        .duration(1500)
        .attr("cx", width/2 - 40)
        .attr("cy", height*1.5);
    d3.select("#button-animate")
      .transition()
      .delay(4000)
      .style("display", "inline");
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
    display(false);
  }; // end set_zigzag
  function animate_zigzag_forehand() {
    d3.select("#button-animate").style("display", "none"); // Disable animate
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
       .attr("cx", width/2 + 50)
       .attr("cy", margin.top + 200);
    d3.select("#button-animate")
      .transition()
      .delay(3500)
      .style("display", "inline");
  }; // end animate_zigzag
  function animate_zigzag_backhand() {
    d3.select("#button-animate").style("display", "none"); // Disable animate
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
    d3.select("#button-animate")
      .transition()
      .delay(3500)
      .style("display", "inline");
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
    display(false);
  }; // end set_flood
  function animate_flood() {
    d3.select("#button-animate").style("display", "none"); // Disable animate
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
   d3.select("#button-animate")
     .transition()
     .delay(2100)
     .style("display", "inline");
  }; // end animate_flood
  function set_grime1() {
    // Players
    svg.selectAll(".offenseDots")
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else { return width/2-30; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // reset 1
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 160; } // cutter 1
         else if (i==4) { return margin.top + 200; } // cutter 2
         else if (i==5) { return margin.top + 240; } // cutter 3
         else if (i==6) { return margin.top + 280; } // cutter 4
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
       .attr("y2", margin.top + 55);
    svg.select("#defense1")
       .attr("x1", width/2 - 50)
       .attr("x2", width/2 - 50)
       .attr("y1", margin.top + 110)
       .attr("y2", margin.top + 135);
    display(true);
  }; // end set_grime1
  function animate_grime1() {
    d3.select("#button-animate").style("display", "none"); // Disable animate
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==2; })
       .transition()
       .duration(1500)
       .attr("cx", width/2+20);
    svg.select("#disc")
       .transition()
       .duration(1500)
       .attr("cx", width/2+20)
       .attr("cy", margin.top + 120);
    svg.select("#defense1")
       .transition()
       .duration(3500)
       .attr("x1", width/2+15)
       .attr("x2", width/2+35)
       .attr("y1", margin.top + 145)
       .attr("y2", margin.top + 145);
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==6; })
       .transition()
       .delay(1500)
       .duration(1500)
       .attr("cx", width/2)
       .attr("cy", height*1.5);
    svg.select("#disc")
       .transition()
       .delay(1500)
       .duration(1500)
       .attr("cx", width/2)
       .attr("cy", height*1.5);
    d3.select("#button-animate")
      .transition()
      .delay(3500)
      .style("display", "inline");
  }; // end animate_grime1
  function set_grime2() {
    // Players
    svg.selectAll(".offenseDots")
       .attr("cx", function(d,i) { // set up
         if (i==0) { return width/2; } // handler 1
         else if (i==1) { return width/3; } // handler 2
         else { return width/2-30; }
       })
       .attr("cy", function(d,i) { // set up
         if (i==0) { return margin.top + 50; } // handler 1
         else if (i==1) { return margin.top; } // reset 1
         else if (i==2) { return margin.top + 120; } // top of stack
         else if (i==3) { return margin.top + 160; } // cutter 1
         else if (i==4) { return margin.top + 200; } // cutter 2
         else if (i==5) { return margin.top + 240; } // cutter 3
         else if (i==6) { return margin.top + 280; } // cutter 4
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
       .attr("y2", margin.top + 55);
    svg.select("#defense1")
       .attr("x1", width/2 - 45)
       .attr("x2", width/2 - 22)
       .attr("y1", margin.top + 105)
       .attr("y2", margin.top + 100);
    display(true);
  }; // end set_grime2
  function animate_grime2() {
    d3.select("#button-animate").style("display", "none"); // Disable animate
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==3; })
       .transition()
       .duration(1500)
       .attr("cx", width/2+20);
    svg.select("#disc")
       .transition()
       .duration(1500)
       .attr("cx", width/2+20)
       .attr("cy", margin.top + 160);
    svg.selectAll(".offenseDots")
       .filter(function(d,i) { return i==6; })
       .transition()
       .delay(1500)
       .duration(1500)
       .attr("cx", width/2)
       .attr("cy", height*1.5);
    svg.select("#disc")
       .transition()
       .delay(1500)
       .duration(1500)
       .attr("cx", width/2)
       .attr("cy", height*1.5);
    d3.select("#button-animate")
      .transition()
      .delay(3500)
      .style("display", "inline");
  }; // end animate_grime2
  function buttonClicked(button) {
    button.style("background-color", "navy");
    button.style("color", "white");
  }; // end buttonClicked
  function buttonUnclicked(button) {
    button.style("background-color", d3.color("#DCDCDC"));
    button.style("color", "navy");
  }; // end buttonUnclicked
  d3.select("#button-x").on("click", function() {
    reset();
    set_x();
    buttonClicked(d3.select(this));
    d3.select("#button-animate").on("click", function() {
      animate_x();
      set_x();
    })
  });
  d3.select("#button-flood").on("click", function() {
    reset();
    set_flood();
    buttonClicked(d3.select(this));
    d3.select("#button-animate").on("click", function() {
      animate_flood();
      set_flood();
    })
  });
  d3.select("#button-magician").on("click", function() {
    reset();
    set_magician();
    buttonClicked(d3.select(this));
    d3.select("#button-animate").on("click", function() {
      animate_magician();
      set_magician();
    })
  });
  d3.select("#button-zigzag-forehand").on("click", function() {
    reset();
    buttonClicked(d3.select(this));
    buttonClicked(d3.select("#button-zigzag"));
    buttonUnclicked(d3.select("#button-backhand"));
    set_zigzag("forehand");
    d3.select("#button-animate").on("click", function() {
      animate_zigzag_forehand();
      set_zigzag("forehand");
    })
  });
  d3.select("#button-zigzag-backhand").on("click", function() {
    reset();
    buttonClicked(d3.select(this));
    buttonClicked(d3.select("#button-zigzag"));
    buttonUnclicked(d3.select("#button-backhand"));
    set_zigzag("backhand");
    d3.select("#button-animate").on("click", function() {
      animate_zigzag_backhand();
      set_zigzag("backhand");
    })
  })
  d3.select("#button-grime1").on("click", function() {
    reset();
    set_grime1();
    buttonClicked(d3.select(this));
    buttonClicked(d3.select("#button-grime"));
    d3.select("#button-animate").on("click", function() {
      animate_grime1();
      set_grime1();
    })
  });
  d3.select("#button-grime2").on("click", function() {
    reset();
    set_grime2();
    buttonClicked(d3.select(this));
    buttonClicked(d3.select("#button-grime"));
    d3.select("#button-animate").on("click", function() {
      animate_grime2();
      set_grime2();
    })
  })
};

var numEntered = []; // array to hold numbers entered
d3.selectAll(".button-number").on("click", function() {
  d3.select("#incorrect-text").style("display", "none"); // remove incorrect text if displayed
  d3.selectAll(".button-number").classed("clicked", false);
  d3.select(this).classed("clicked", true);
  numEntered.push(d3.select(this).node().value);
})
d3.select("#button-enter").on("click", function() {
  d3.selectAll(".button-number").classed("clicked", false);
  // correct password
  if (numEntered.toString() == "1,3,9,7") {
    d3.select("#password").style("display", "none");
    d3.select("#main").style("display", "inline");
    init();
  }
  // incorrect password
  else {
    d3.select("#incorrect-text").style("display", "inline");
    numEntered = [];
  }
})

/*
// for testing
d3.select("#main").style("display", "inline");
init();
*/

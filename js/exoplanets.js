generateData();
hideAll();

function generateData() {
    generateNumStars();
    generateNumPlanets();
    generateStarType();
}

function generateNumStars() {
    // Load in data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // numStars ------------------------------------
    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 10, bottom: 60, left: 50 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#numStars")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 5000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.sy_snum; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        svg.append("text")
            .attr("x", width / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Systems with X Number of Stars");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Number of Stars");

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Systems");

        //Bars
        bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.sy_snum))
            .enter();

        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d[0]); })
            .attr("width", function (d) { return x(d[1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");

        bars.append("text")
            .text(function (d) {
                return d[1];
            })
            .attr("y", function (d) {
                return y(d[0]) + 40;
            })
            .attr("x", 35)
            .style("text-anchor", "middle")
            .style("font-family", "Verdana")
    });
}

function generateNumPlanets() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // numPlanets ----------------------------------
    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 10, bottom: 60, left: 50 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#numPlanets")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 3100])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.sy_pnum; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Systems with X Number of Planets");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Number of Planets");

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Systems");

        //Bars
        bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.sy_pnum))
            .enter();

        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d[0]); })
            .attr("width", function (d) { return x(d[1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");

        bars.append("text")
            .text(function (d) {
                return d[1];
            })
            .attr("y", function (d) {
                return y(d[0]) + 22;
            })
            .attr("x", 35)
            .style("text-anchor", "middle")
            .style("font-family", "Verdana")
    });
}

function generateStarType() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 10, bottom: 60, left: 50 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#starType")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 3100])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.st_spectype[0]; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Systems with X Number of Planets");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Number of Planets");

        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Systems");

        //Bars
        bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.st_spectype))
            .enter();

        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d[0]); })
            .attr("width", function (d) { return x(d[1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");

        bars.append("text")
            .text(function (d) {
                return d[1];
            })
            .attr("y", function (d) {
                return y(d[0]) + 22;
            })
            .attr("x", 35)
            .style("text-anchor", "middle")
            .style("font-family", "Verdana")
    });
}

function setActive(str) {
    switch (str) {
        case "allData":
            hideAll();
            document.getElementById("allDataContainer").hidden = false;
            return;
        case "numStars":
            hideAll();
            document.getElementById("numStarsContainer").hidden = false;
            return;
        case "numPlanets":
            hideAll();
            document.getElementById("numPlanetsContainer").hidden = false;
            return;
        case "starType":
            hideAll();
            document.getElementById("starTypeContainer").hidden = false;
            return;
        case "discoveryMethod":
            hideAll();
            document.getElementById("discoveryMethodContainer").hidden = false;
            return;
        case "habitablity":
            hideAll();
            document.getElementById("habitablityContainer").hidden = false;
            return;
        case "distance":
            hideAll();
            document.getElementById("distanceContainer").hidden = false;
            return;
        case "timeSinceDiscovery":
            hideAll();
            document.getElementById("timeSinceDiscoveryContainer").hidden = false;
            return;
        case "radvsmass":
            hideAll();
            document.getElementById("radvsmassContainer").hidden = false;
            return;
    }
}

function hideAll() {
    document.getElementById("allDataContainer").hidden = true;
    document.getElementById("numStarsContainer").hidden = true;
    document.getElementById("numPlanetsContainer").hidden = true;
    document.getElementById("starTypeContainer").hidden = true;
    document.getElementById("discoveryMethodContainer").hidden = true;
    document.getElementById("habitablityContainer").hidden = true;
    document.getElementById("distanceContainer").hidden = true;
    document.getElementById("timeSinceDiscoveryContainer").hidden = true;
    document.getElementById("radvsmassContainer").hidden = true;
    return;
}
// pl_name, sys_name, sys_snum, sys_pnum, st_spectype, discoverymethod, sy_dist, disc_year, pl_rade, pl_bmasse
// data = d3.csv("../data/exoplanets-1.csv", function (d) {
//     var columns = ['pl_name', 'sys_name', 'sys_snum', 'sys_pnum', 'st_spectype', 'discoverymethod', 'sy_dist', 'disc_year']
//     // return {
//     //     name: d.pl_name,
//     //     system: d.sys_name,
//     //     numStars: d.sy_snum,
//     //     numPlanets: d.sy_pnum,
//     //     discoveryMethod: d.discoverymethod,
//     //     distanceFromEarth: d.sy_dist,
//     //     discoveryYear: d.disc_year,
//     //     // radius: pl_rade,
//     //     // mass: pl_bmasse
//     // }
//     tabulate(d, columns)
// });
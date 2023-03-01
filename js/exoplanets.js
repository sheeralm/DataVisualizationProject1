/*
Program that utilizes d3 in order to generate visualizations for exoplanet data. Lots of code was inspired and based on similar examples found on W3Schools
Liam Sheerajin - sheeralm - M12810246
*/

/* Immediately generates data and hides all generated graphs */
generateData();
hideAll();

/* Fucntion used to generate data */
function generateData() {
    generateNumStars();
    generateNumPlanets();
    generateStarType();
    generateDiscoveryMethod();
    generateDistance();
    generateTimeSinceDiscovery();
    generateHabitability();
    generateRadiusVsMass();
}

/* Generates number of stars within a system graph */
function generateNumStars() {
    // Load in data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 10, bottom: 60, left: 50 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#numStars")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        let x = d3.scaleLinear()
            .domain([0, 5000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        let y = d3.scaleBand()
            .range([0, height])
            .domain([1, 2, 3, 4])
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Systems with X Number of Stars");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Number of Stars");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Systems");

        //Bars
        let bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.sy_snum))
            .enter();

        //Visual
        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d[0]); })
            .attr("width", function (d) { return x(d[1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");
        
        //Counts
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

/* Generates number of planets within a system graph */
function generateNumPlanets() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // numPlanets ----------------------------------
    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 10, bottom: 60, left: 50 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#numPlanets")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        let x = d3.scaleLinear()
            .domain([0, 3500])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        let y = d3.scaleBand()
            .range([0, height])
            .domain([1, 2, 3, 4, 5, 6, 7, 8])
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Systems with X Number of Planets");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Number of Planets");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Systems");

        //Bars
        let bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.sy_pnum))
            .enter();

        //Visual
        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d[0]); })
            .attr("width", function (d) { return x(d[1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");

        //Counts
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

/* Generates star type system graph */
function generateStarType() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 10, bottom: 60, left: 50 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#starType")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        let x = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        let y = d3.scaleBand()
            .range([0, height])
            .domain(["A", "F", "G", "K", "M"])
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Systems with X Number of Planets");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -30)
            .style("text-anchor", "middle")
            .text("Number of Planets");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Systems");

        //Bars
        let bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.st_spectype[0]))
            .enter();

        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) {
                let val = y(d[0]);
                if (val === undefined) {
                    return 100000;
                }
                else {
                    return val;
                }
            })
            .attr("width", function (d) { return x(d[1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");

        bars.append("text")
            .text(function (d) {
                return d[1];
            })
            .attr("y", function (d) {
                let val = y(d[0]) + 30;
                if (!isNaN(val)) {
                    return val;
                }
                else {
                    return 100000;
                }
            })
            .attr("x", 35)
            .style("text-anchor", "middle")
            .style("font-family", "Verdana")
    });
}

/* Generates discovery method graph */
function generateDiscoveryMethod() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 10, bottom: 60, left: 180 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#discovery")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        let x = d3.scaleLinear()
            .domain([0, 4000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        let y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.discoverymethod; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Discovery Methods Used to Find Planets");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -150)
            .style("text-anchor", "middle")
            .text("Discovery Method");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Number of Planets Found");

        //Bars
        let bars = svg.selectAll("myRect")
            .data(d3.rollups(data, g => g.length, d => d.discoverymethod))
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
                return y(d[0]) + 18;
            })
            .attr("x", 25)
            .style("text-anchor", "middle")
            .style("font-family", "Verdana");
    });
}

/* Generates distance from Earth graph */
function generateDistance() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 30, bottom: 60, left: 80 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#distance")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // X axis: scale and draw:
        let x = d3.scaleLinear()
            .domain([0, 9000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Y axis: initialization
        let y = d3.scaleLinear()
            .range([height, 0]);
        let yAxis = svg.append("g")

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Distance of Systems from Earth");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -50)
            .style("text-anchor", "middle")
            .text("Number of Planets");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Distance to System (parsecs)");

        // Histogram
        let histogram = d3.histogram()
            .value(function (d) { return d.sy_dist; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(x.ticks(20)); // then the numbers of bins

        // And apply this function to data to get the bins
        let bins = histogram(data);

        // Y axis: update now that we know the domain
        y.domain([0, d3.max(bins, function (d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        yAxis.transition()
            .duration(1000)
            .call(d3.axisLeft(y));

        // Join the rect with the bins data
        let u = svg.selectAll("rect")
            .data(bins)

        // Manage the existing bars and eventually the new ones:
        u.enter()
            .append("rect") // Add a new rect for each new elements
            .merge(u) // get the already existing elements as well
            .transition() // and apply changes to all of them
            .duration(1000)
            .attr("x", 1)
            .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function (d) { return height - y(d.length); })
            .style("fill", "#69b3a2")
    });
}

/* Applies test over .csv data to determine which planets are habitable or not. Returns a 2D array - first dimension for star type and second contains results for inhabitable and habitable */
function habitabilityTest(data) {
    let retArray = [];
    let tempVal = [0, 0];
    const starTypes = ["A", "F", "G", "K", "M"];
    const starMap = new Map();
    starMap.set('A-inner', 8.5);
    starMap.set('A-outer', 12.5);
    starMap.set('F-inner', 1.5);
    starMap.set('F-outer', 2.2);
    starMap.set('G-inner', 0.95);
    starMap.set('G-outer', 1.4);
    starMap.set('K-inner', 0.38);
    starMap.set('K-outer', 0.56);
    starMap.set('M-inner', 0.08);
    starMap.set('M-outer', 0.12);
    data.forEach(planet => {
        tempVal[0] = planet.st_spectype[0];
        if (starTypes.includes(tempVal[0])) {
            tempVal[1] = planet.pl_orbsmax;
            if (tempVal[1] > starMap.get(tempVal[0] + "-inner") && (tempVal[1] < starMap.get(tempVal[0] + "-outer"))) {
                retArray.push({ "starType": tempVal[0], "habitability": "Hab" });
            }
            else {
                retArray.push({ "starType": tempVal[0], "habitability": "Inhab" });
            }
        }
    });
    return retArray;
}

/* Generates graph for exoplanet habitability */
function generateHabitability() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 10, bottom: 60, left: 80 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#habitability")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // Add X axis
        let x = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

        // Y axis
        let y = d3.scaleBand()
            .range([0, height])
            .domain(["A-Hab", "A-Inhab", "F-Hab", "F-Inhab", "G-Hab", "G-Inhab", "K-Hab", "K-Inhab", "M-Hab", "M-Inhab"])
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Number of Habitable and Inhabitable Planets Within Each Type of Star System");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -60)
            .style("text-anchor", "middle")
            .text("Systems");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 45) + ")")
            .style("text-anchor", "middle")
            .text("Number of Planets");

        //Bars
        let bars = svg.selectAll("myRect")
            .data(d3.rollups(habitabilityTest(data), g => g.length, d => d.starType, d => d.habitability))
            .enter();
        bars.append("rect")
            .attr("x", x(0))
            .attr("y", function (d) {
                let inhab = d[1][0];
                let hab = d[1][1];
                // Nested bar append to generate habitable and inhabitable simultaniously
                bars.append("rect")
                    .attr("x", x(0))
                    .attr("y", y(d[0] + "-" + hab[0]))
                    .attr("width", function (d) { return x(hab[1]); })
                    .attr("height", y.bandwidth())
                    .attr("fill", "#69b3a2");
                return y(d[0] + "-" + inhab[0]);
            })
            .attr("width", function (d) { return x(d[1][0][1]); })
            .attr("height", y.bandwidth())
            .attr("fill", "#69b3a2");

        bars.append("text")
            .text(function (d) {
                return d[1][0][1];
            })
            .attr("y", function (d) {
                let inhab = d[1][0];
                let hab = d[1][1];
                let val = y(d[0] + "-" + inhab[0]);
                bars.append("text")
                    .text(function (d) {
                        return hab[1];
                    })
                    .attr("y", y(d[0] + "-" + hab[0]) + 18)
                    .attr("x", 35)
                    .style("text-anchor", "middle")
                    .style("font-family", "Verdana")
                return val + 18;
            })
            .attr("x", 35)
            .style("text-anchor", "middle")
            .style("font-family", "Verdana");
    });
}

/* Generates graph for time since exoplanet discovery */
function generateTimeSinceDiscovery() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 30, bottom: 60, left: 80 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#timeSinceDiscovery")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    // Parse the Data
    dataCsv.then(function (data) {
        data = d3.rollups(data, g => g.length, d => d.disc_year);
        data.sort(sortFunction);
        // Add X axis
        let x = d3.scaleLinear()
            .domain([1992, 2023])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
        var maxVal = 0;
        data.forEach((element) => {
            if (element[1] > maxVal) {
                maxVal = element[1];
            }
        });
        // Y axis
        let y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, maxVal])
        svg.append("g")
            .call(d3.axisLeft(y))

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Distance of Systems from Earth");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -50)
            .style("text-anchor", "middle")
            .text("Number of Planets");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Distance to System (parsecs)");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", d3.line()
                .x(function (d) { return x(d[0]) })
                .y(function (d) { return y(d[1]) })
            )
            .style("fill", "none")
            .style("stroke", "#CC0000")
            .style("stroke-width", "2");

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d[0]); })
            .attr("cy", function (d) { return y(d[1]); })
            .attr("r", 1.5)
            .style("fill", "#CC0000");

    });
}

/* Generates graph for exoplanet radius vs mass */
function generateRadiusVsMass() {
    // Load data
    dataCsv = d3.csv("../data/exoplanets-1.csv");

    // set the dimensions and margins of the graph
    let margin = { top: 50, right: 10, bottom: 60, left: 80 },
        width = 925 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    let svg = d3.select("#radVsMass")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    dataCsv.then(function (data) {

        // X axis
        const x = d3.scaleLinear()
            .domain([0, 47500])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, 40])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -5)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Exoplanet Radius vs Mass");

        // Y-Axis Title
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -40)
            .style("text-anchor", "middle")
            .text("Radius");

        // X-Axis Title
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + 50) + ")")
            .style("text-anchor", "middle")
            .text("Mass");

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .join("circle")
            .attr("cx", function (d) { return x(d.pl_bmasse); })
            .attr("cy", function (d) { return y(d.pl_rade); })
            .attr("r", 1.5)
            .style("fill", "#69b3a2");
    });
}

/* Reacts to buttons presses trying to change graphs, revealing the new and hiding the old */
function setActive(str) {
    switch (str) {
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
        case "habitability":
            hideAll();
            document.getElementById("habitabilityContainer").hidden = false;
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

/* Hides all graph containers */
function hideAll() {
    document.getElementById("numStarsContainer").hidden = true;
    document.getElementById("numPlanetsContainer").hidden = true;
    document.getElementById("starTypeContainer").hidden = true;
    document.getElementById("discoveryMethodContainer").hidden = true;
    document.getElementById("habitabilityContainer").hidden = true;
    document.getElementById("distanceContainer").hidden = true;
    document.getElementById("timeSinceDiscoveryContainer").hidden = true;
    document.getElementById("radvsmassContainer").hidden = true;
    return;
}
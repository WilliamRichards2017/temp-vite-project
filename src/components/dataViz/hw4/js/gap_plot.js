/** Data structure for the data associated with an individual country. */
class PlotData {
    /**
     *
     * @param country country name from the x data object
     * @param xVal value from the data object chosen for x at the active year
     * @param yVal value from the data object chosen for y at the active year
     * @param id country id
     * @param region country region
     * @param circleSize value for r from data object chosen for circleSizeIndicator
     */
    constructor(country, xVal, yVal, id, region, circleSize) {
        this.country = country;
        this.xVal = xVal;
        this.yVal = yVal;
        this.id = id;
        this.region = region;
        this.circleSize = circleSize;
    }
}

/** Class representing the scatter plot view. */
class GapPlot {
    /**
     * Creates an new GapPlot Object
     *
     * For part 2 of the homework, you only need to worry about the first parameter.
     * You will be updating the plot with the data in updatePlot,
     * but first you need to draw the plot structure that you will be updating.
     *
     * Set the data as a variable that will be accessible to you in updatePlot()
     * Call the drawplot() function after you set it up to draw the plot structure on GapPlot load
     *
     * We have provided the dimensions for you!
     *
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     * @param updateYear a callback function used to notify other parts of the program when a year was updated
     * @param activeYear the year for which the data should be drawn initially
     */
    constructor(data, updateCountry, updateYear, activeYear) {

        // ******* TODO: PART 2 *******
        this.margin = {top: 20, right: 20, bottom: 60, left: 80};
        this.width = 810 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;


        this.activeYear = activeYear;
        this.updateYear = updateYear;


        this.updateCountry = updateCountry;

        this.activeCountry = "null";
        // this.updateYear = updateYear;

        this.data = data;


        // ******* TODO: PART 3 *******
        /**
         For part 4 of the homework, you will be using the other 3 parameters.
         * assign the highlightUpdate function as a variable that will be accessible to you in updatePlot()
         * assign the dragUpdate function as a variable that will be accessible to you in updatePlot()
         */

        //YOUR CODE HERE

        this.drawPlot();


    }

    /**
     * Sets up the plot, axes, and slider,
     */

    drawPlot() {
        // ******* TODO: PART 2 *******
        /**
         You will be setting up the plot for the scatterplot.
         Here you will create axes for the x and y data that you will be selecting and calling in updatePlot
         (hint): class them.

         Main things you should set up here:
         1). Create the x and y axes
         2). Create the activeYear background text


         The dropdown menus have been created for you!

         */

        d3.select('#scatter-plot')
            .append('div').attr('id', 'chart-view');

        d3.select('#scatter-plot')
            .append('div').attr('id', 'activeYear-bar');

        d3.select('#chart-view')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);

        let chartView = d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr('id', "plotSvg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);


        //YOUR CODE HERE


        chartView
            .append('g')
            .attr("id", "x-axis")
            .attr("transform", "translate(0, 420)");


        chartView
            .append('g')
            .attr("id", "y-axis")
            .attr("transform", "translate(0, 0)");


        chartView.append('text')
            .attr("id", "activeYear")
            .attr("y", "100px")
            .attr("x", "50px")
            .attr("class", "activeYear-background");


        /* This is the setup for the dropdown menu- no need to change this */

        let dropdownWrap = d3.select('#chart-view').append('div').classed('dropdown-wrapper', true);

        let cWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        cWrap.append('div').classed('c-label', true)
            .append('text')
            .text('Circle Size');

        cWrap.append('div').attr('id', 'dropdown_c').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let xWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        xWrap.append('div').classed('x-label', true)
            .append('text')
            .text('X Axis Data');

        xWrap.append('div').attr('id', 'dropdown_x').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        let yWrap = dropdownWrap.append('div').classed('dropdown-panel', true);

        yWrap.append('div').classed('y-label', true)
            .append('text')
            .text('Y Axis Data');

        yWrap.append('div').attr('id', 'dropdown_y').classed('dropdown', true).append('div').classed('dropdown-content', true)
            .append('select');

        d3.select('#chart-view')
            .append('div')
            .classed('circle-legend', true)
            .append('svg')
            .append('g')
            .attr('transform', 'translate(10, 0)');


        this.updatePlot(this.activeYear, "fertility-rate", "gdp", "population");
        this.drawYearBar();


    }

    /**
     * Renders the plot for the parameters specified
     *
     * @param activeYear the year for which to render
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    updatePlot(activeYear, xIndicator, yIndicator, circleSizeIndicator) {


        this.drawDropDown(xIndicator, yIndicator, circleSizeIndicator);

        // ******* TODO: PART 2 *******

        /*
        You will be updating the scatterplot from the data. hint: use the #chart-view div
        *** Structuring your PlotData objects ***
        You need to start by mapping the data specified by the parameters to the PlotData Object
        Your PlotData object is specified at the top of the file
        You will need get the data specified by the x, y and circle size parameters from the data passed
        to the GapPlot constructor

        *** Setting the scales for your x, y, and circle data ***
        For x and y data, you should get the overall max of the whole data set for that data category,
        not just for the activeYear.




        ***draw circles***
        draw the circles with a scaled area from the circle data, with cx from your x data and cy from y data
        You need to size the circles from your circleSize data, we have provided a function for you to do this
        called circleSizer. Use this when you assign the 'r' attribute.
        ***Tooltip for the bubbles***
        You need to assign a tooltip to appear on mouse-over of a country bubble to show the name of the country.
        We have provided the mouse-over for you, but you have to set it up
        Hint: you will need to call the tooltipRender function for this.
        *** call the drawLegend() and drawDropDown()
        These will draw the legend and the drop down menus in your data
        Pay attention to the parameters needed in each of the functions

        */




        /**
         *  Function to determine the circle radius by circle size
         *  This is the function to size your circles, you don't need to do anything to this
         *  but you will call it and pass the circle data as the parameter.
         *
         * @param d the data value to encode
         * @returns {number} the radius
         */

            ///////////////////////////////////////////////////////////////////


        let x = this.data[xIndicator];
        let y = this.data[yIndicator];
        let c = this.data[circleSizeIndicator];

        //todo : map country name to


        let maxX = -1;
        let maxY = -1;
        let maxC = -1;

        let minC = Math.min();


        let dataT = [];

        let cMap = {};
        let xMap = {};
        let yMap = {};

        for (let i = 0; i < c.length; i++) {
            let key = c[i]["country"];
            cMap[key] = c[i];
        }

        for (let i = 0; i < x.length; i++) {
            let key = x[i]["country"];
            xMap[key] = x[i];
        }

        for (let i = 0; i < y.length; i++) {
            let key = y[i]["country"];
            yMap[key] = y[i];
        }


        for (let i = 0; i < x.length; i++) {
            for (let kv in x[i]) {
                //Check if key field is valid date
                if (parseInt(kv) > 1700 && parseInt(kv) < 2050) {
                    if (x[i][kv] > maxX) {
                        maxX = parseFloat(x[i][kv]);
                    }

                }
            }
        }

        for (let i = 0; i < y.length; i++) {
            for (let kv in y[i]) {
                // console.log("kv, typeof", kv, typeof kv);
                if (parseInt(kv) > 1700 && parseInt(kv) < 2050) {
                    if (y[i][kv] > maxY) {
                        maxY = parseFloat(y[i][kv]);
                        // console.log("max kv", kv);
                    }
                }
            }
        }


        for (let i = 0; i < c.length; i++) {
            for (let kv in c[i]) {
                // console.log("kv, typeof", kv, typeof kv);
                if (parseInt(kv) > 1700 && parseInt(kv) < 2050) {
                    if (c[i][kv] > maxC) {
                        maxC = parseFloat(c[i][kv]);
                        // console.log("max kv", kv);
                    }
                    if (parseInt(kv) > 1700 && parseInt(kv) < 2050) {

                        if (c[i][kv] < minC) {
                            minC = parseFloat(c[i][kv]);
                        }
                    }
                }
            }
        }


        this.drawLegend(minC, maxC);

        for (let key in cMap) {

            if (xMap.hasOwnProperty(key) && yMap.hasOwnProperty(key)) {

                let plotData = new PlotData(xMap[key]["country"], xMap[key][activeYear], yMap[key][activeYear], xMap[key]["geo"], cMap[key]["region"], cMap[key][activeYear]);
                dataT.push(plotData);
            }
        }


        let circleSizer = function (d) {

            let cScale = d3.scaleSqrt().range([3, 20]).domain([minC, maxC]);
            return d.circleSize ? cScale(d.circleSize) : 3;
        };


        // TODO FIRST - Loop through all years and get max x and y values
        var xScale = d3.scaleLinear()
            .domain([0, maxX])
            .range([0, this.width]);

        var yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([this.height, 0]);


        d3.select("#plotSvg")
            .selectAll("circle")
            .data(dataT).join("circle")
            .attr("cx", d => xScale(d.xVal))
            .attr("cy", d => yScale(d.yVal))
            .attr("r", d => circleSizer(d))
            .attr("fill", "red")
            .attr("class", d => d.region)
            .attr("id", d => d.id)
            .attr("transform", "translate(70, -50)")
            .on("click", d => this.updateCountry(d.id.toUpperCase()))
            .select("title")
            .text(d => d.xVal.toString() + ", " + d.yVal.toString());

        d3.select("#activeYear")
            .text(activeYear)
            .attr("transform", "translate(100, 50)");


        let xAxis = d3.select("#x-axis")
            .attr("transform", "translate(70, 370)");

        xAxis.append("text")
            .attr("class", "axis-label")
            .attr("id", "xlabel");


        d3.select("#xlabel")
            .attr("transform", "translate(300, 40)")
            .text(this.data[xIndicator][0]["indicator_name"]);

        xAxis
            .call(d3.axisBottom(xScale));


        let yAxis = d3.select("#y-axis")
            .attr("transform", "translate(70, -50)");

        yAxis.append("text")
            .attr("class", "axis-label")
            .attr("id", "ylabel")


        d3.select("#ylabel")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("x", -220)
            .text(this.data[yIndicator][0]["indicator_name"]);


        yAxis
            .call(d3.axisLeft(yScale));

    }


    /**
     * Setting up the drop-downs
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    drawDropDown(xIndicator, yIndicator, circleSizeIndicator) {

        let self = this;
        let dropDownWrapper = d3.select('.dropdown-wrapper');
        let dropData = [];

        for (let key in this.data) {
            dropData.push({
                indicator: key,
                indicator_name: this.data[key][0].indicator_name
            });
        }

        /* CIRCLE DROPDOWN */
        let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');

        let optionsC = dropC.selectAll('option')
            .data(dropData);


        optionsC.exit().remove();

        let optionsCEnter = optionsC.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsCEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsC = optionsCEnter.merge(optionsC);

        let selectedC = optionsC.filter(d => d.indicator === circleSizeIndicator)
            .attr('selected', true);

        dropC.on('change', function (d, i) {
            let cValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let yValue = dropY.node().value;
            self.updatePlot(self.activeYear, xValue, yValue, cValue);
        });

        /* X DROPDOWN */
        let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');

        let optionsX = dropX.selectAll('option')
            .data(dropData);

        optionsX.exit().remove();

        let optionsXEnter = optionsX.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsXEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsX = optionsXEnter.merge(optionsX);

        let selectedX = optionsX.filter(d => d.indicator === xIndicator)
            .attr('selected', true);

        dropX.on('change', function (d, i) {
            let xValue = this.options[this.selectedIndex].value;
            let yValue = dropY.node().value;
            let cValue = dropC.node().value;
            self.updatePlot(self.activeYear, xValue, yValue, cValue);
        });

        /* Y DROPDOWN */
        let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');

        let optionsY = dropY.selectAll('option')
            .data(dropData);

        optionsY.exit().remove();

        let optionsYEnter = optionsY.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator)
            .attr('value', (d, i) => d.indicator);

        optionsY = optionsYEnter.merge(optionsY);

        optionsYEnter.append('text')
            .text((d, i) => d.indicator_name);

        let selectedY = optionsY.filter(d => d.indicator === yIndicator)
            .attr('selected', true);

        dropY.on('change', function (d, i) {
            let yValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let cValue = dropC.node().value;
            self.updatePlot(self.activeYear, xValue, yValue, cValue);
        });

    }

    /**
     * Draws the year bar and hooks up the events of a year change
     */
    drawYearBar() {

        // ******* TODO: PART 2 *******
        //The drop-down boxes are set up for you, but you have to set the slider to updatePlot() on activeYear change

        // Create the x scale for the activeYear;
        // hint: the domain should be max and min of the years (1800 - 2020); it's OK to set it as numbers
        // the plot needs to update on move of the slider

        /* ******* TODO: PART 3 *******
        You will need to call the updateYear() function passed from script.js in your activeYear slider
        */


        let self = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 730]);

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1800)
            .attr('max', 2020)
            .attr('value', self.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(self.activeYear).attr("id", "slider-txt");


        sliderText.attr('x', yearScale(self.activeYear));
        sliderText.attr('y', 25);


        yearSlider.on('input', function () {

            self.updateYear(this.value);

        });


    }

    /**
     * Draws the legend for the circle sizes
     *
     * @param min minimum value for the sizeData
     * @param max maximum value for the sizeData
     */
    drawLegend(min, max) {
        // ******* TODO: PART 2*******
        //This has been done for you but you need to call it in updatePlot()!
        //Draws the circle legend to show size based on health data
        let scale = d3.scaleSqrt().range([3, 20]).domain([min, max]);

        let circleData = [min, max];

        let svg = d3.select('.circle-legend').select('svg').select('g');

        let circleGroup = svg.selectAll('g').data(circleData);
        circleGroup.exit().remove();

        let circleEnter = circleGroup.enter().append('g');
        circleEnter.append('circle').classed('neutral', true);
        circleEnter.append('text').classed('circle-size-text', true);

        circleGroup = circleEnter.merge(circleGroup);

        circleGroup.attr('transform', (d, i) => 'translate(' + ((i * (5 * scale(d))) + 20) + ', 25)');

        circleGroup.select('circle').attr('r', (d) => scale(d));
        circleGroup.select('circle').attr('cx', '0');
        circleGroup.select('circle').attr('cy', '0');
        let numText = circleGroup.select('text').text(d => new Intl.NumberFormat().format(d));

        numText.attr('transform', (d) => 'translate(' + ((scale(d)) + 10) + ', 0)');
    }

    /**
     * Reacts to a highlight/click event for a country; draws that country darker
     * and fades countries on other continents out
     * @param activeCountry
     */
    updateHighlightClick(activeCountry) {
        /* ******* TODO: PART 3*******
        //You need to assign selected class to the target country and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        // You will not be calling this directly in the gapPlot class,
        // you will need to call it from the updateHighlight function in script.js
        */
        //YOUR CODE HERE

        this.clearHighlight();

        d3.select("#" + activeCountry.toUpperCase())
            .classed("selected-country", true);

        d3.select("#" + activeCountry.toLowerCase())
            .classed("selected-country", true);

    }


    /**
     * Clears any highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //YOUR CODE HERE

        d3.selectAll("circle")
            .classed("selected-country", false);


    }

    /**
     * Returns html that can be used to render the tooltip.
     * @param data
     * @returns {string}
     */
    tooltipRender(data) {
        let text = "<h2>" + data['country'] + "</h2>";
        return text;
    }

}

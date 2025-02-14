<template>
    <div id="gapPlot">
        <div id="scatter-plot">
            <info-box
                    :active-country="activeCountry"
                    :active-year="activeYear"
                    :info-data="popData"></info-box>
        </div>
        <div id="plotControls"></div>
    </div>
</template>

<script>

    import PlotData from './../js/plotData.js'
    import infoBox from './infoBox.vue'

    export default {

        components: {
            infoBox
        },

        props: {
            popData: null,
            activeCountryProp: null,
        },

        data() {
            return {
                margin: {top: 20, right: 20, bottom: 60, left: 80},
                activeYear: '2020',
                activeCountry: null,


            }
        },

        computed: {
            width: function () {
                return 600 - this.margin.left - this.margin.right;
            },
            height: function () {
                return 420 - this.margin.top - this.margin.bottom;
            }

        },
        methods: {
            drawPlot() {

                d3.select('#scatter-plot')
                    .append('div').attr('id', 'chart-view');

                d3.select('#scatter-plot')
                    .append('div').attr('id', 'activeYear-bar');

                d3.select('#chart-view')
                    .append('div')
                    .style("opacity", 0)

                let chartView = d3.select('#chart-view')
                    .append('svg').classed('plot-svg', true)
                    .attr('id', "plotSvg")
                    .attr("width", this.width + this.margin.left + this.margin.right)
                    .attr("height", this.height);

                chartView
                    .append('g')
                    .attr("id", "x-axis")

                chartView
                    .append('g')
                    .attr("id", "y-axis")
                    .attr("transform", "translate(0, 0)");

                chartView.append('text')
                    .attr("id", "activeYear")
                    .attr("y", "100px")
                    .attr("x", "50px")
                    .attr("class", "activeYear-background");

                let dropdownWrap = d3.select('#plotControls').append('div').classed('dropdown-wrapper', true);

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

                d3.select('#plotControls')
                    .append('div')
                    .classed('circle-legend', true)
                    .append('svg')
                    .attr("width", 225)
                    .attr("height", 50)
                    .append('g')
                    .attr('transform', 'translate(10, 0)');

                this.updatePlot(this.activeYear, "fertility-rate", "gdp", "population");
                this.drawYearBar();
            },

            updatePlot(activeYear, xIndicator, yIndicator, circleSizeIndicator) {
                this.drawDropDown(xIndicator, yIndicator, circleSizeIndicator);

                let x = this.popData[xIndicator];
                let y = this.popData[yIndicator];
                let c = this.popData[circleSizeIndicator];

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
                        if (parseInt(kv) > 1700 && parseInt(kv) < 2050) {
                            if (x[i][kv] > maxX) {
                                maxX = parseFloat(x[i][kv]);
                            }

                        }
                    }
                }
                for (let i = 0; i < y.length; i++) {
                    for (let kv in y[i]) {
                        if (parseInt(kv) > 1700 && parseInt(kv) < 2050) {
                            if (y[i][kv] > maxY) {
                                maxY = parseFloat(y[i][kv]);
                            }
                        }
                    }
                }

                for (let i = 0; i < c.length; i++) {
                    for (let kv in c[i]) {
                        if (parseInt(kv) > 1700 && parseInt(kv) < 2050) {
                            if (c[i][kv] > maxC) {
                                maxC = parseFloat(c[i][kv]);
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
                    .attr("transform", "translate(70, 290)");

                xAxis.append("text")
                    .attr("class", "axis-label")
                    .attr("id", "xlabel");

                d3.select("#xlabel")
                    .attr("transform", "translate(300, 40)")
                    .text(this.popData[xIndicator][0]["indicator_name"]);

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
                    .text(this.popData[yIndicator][0]["indicator_name"]);

                yAxis
                    .call(d3.axisLeft(yScale));

            },

            drawDropDown(xIndicator, yIndicator, circleSizeIndicator) {

                let self = this;
                let dropDownWrapper = d3.select('.dropdown-wrapper');
                let dropData = [];

                for (let key in this.popData) {
                    dropData.push({
                        indicator: key,
                        indicator_name: this.popData[key][0].indicator_name
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

                optionsX.filter(d => d.indicator === xIndicator)
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

            },

            drawYearBar() {
                let self = this;

                let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 520]);

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
            },

            updateYear(year) {

                let self = this;

                self.activeYear = year;


                let dropDownWrapper = d3.select('.dropdown-wrapper');

                let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');
                let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');
                let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');

                let yValue = dropY.node().value;
                let xValue = dropX.node().value;
                let cValue = dropC.node().value;

                this.updatePlot(year, xValue, yValue, cValue);


                let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 520]);
                let sliderText = d3.select("#slider-txt");


                sliderText.text(year.toString());
                sliderText.attr('x', yearScale(year));
                sliderText.attr('y', 25);

            },

            updateCountry(countryID) {

                this.updateHighlightClick(countryID);
                this.activeCountry = countryID;
                // infoBox.updateTextDescription(countryID, self.activeYear);

            },

            drawLegend(min, max) {
                let scale = d3.scaleSqrt().range([3, 20]).domain([min, max]);

                let circleData = [min, max];

                let svg = d3.select('.circle-legend').select('svg').select('g');

                let circleGroup = svg.selectAll('g').data(circleData);
                circleGroup.exit().remove();

                let circleEnter = circleGroup.enter().append('g');
                circleEnter.append('circle').classed('neutral', true);
                circleEnter.append('text').classed('circle-size-text', true);

                circleGroup = circleEnter.merge(circleGroup);

                circleGroup.attr('transform', (d, i) => 'translate(' + ((i * (5 * scale(d))) + 10) + ', 25)');

                circleGroup.select('circle').attr('r', (d) => scale(d));
                circleGroup.select('circle').attr('cx', '0');
                circleGroup.select('circle').attr('cy', '0');
                let numText = circleGroup.select('text').text(d => new Intl.NumberFormat().format(d));

                numText.attr('transform', (d) => 'translate(' + ((scale(d)) + 10) + ', 0)');
            },

            updateHighlightClick(activeCountry) {
                this.clearHighlight();

                d3.select("#" + activeCountry.toUpperCase())
                    .classed("selected-country", true);

                d3.select("#" + activeCountry.toLowerCase())
                    .classed("selected-country", true);

            },

            clearHighlight() {
                d3.selectAll("circle")
                    .classed("selected-country", false);

                d3.selectAll("path")
                    .classed("selected-country", false);


            },
            tooltipRender(data) {
                let text = "<h2>" + data['country'] + "</h2>";
                return text;
            }


        },

        mounted() {


        },

        watch: {
            popData: function () {
                this.drawPlot();
            },
            activeCountryProp: function () {
                this.activeCountry = this.activeCountryProp;
            }
        }

    }
</script>

<style scoped>
    * {
        font-family: 'Roboto', sans-serif;
    }


    /*Element Styling*/

    circle {
        fill: #d9d9d9;
        stroke: gray;
        opacity: .8;
    }

    circle.selected-region {
        stroke: #122f3d;
    }

    circle.selected-country {
        stroke-width: 3px;
        stroke: #000000;
        opacity: 1;
    }

    circle.hidden {
        opacity: .2;
    }

    path.hidden {
        opacity: .4;
    }


    /*ID Styling*/

    #country-detail {
        display: inline-block;
        width: 750px;
        height: 100px;
        margin: auto;
        position: relative;
        padding-left: 30px;
    }

    #country-detail .stat {
        display: block;
        width: 500px;
    }

    #country-detail .stats span {
        font-weight: bold;
    }

    #country-detail div.label {
        font-size: 26px;
        display: block;
        width: 100%;
        padding-top: 10px;
    }

    #country-detail div.label span {
        font-size: 22px;
        padding-bottom: 15px;
        font-weight: bold;
    }

    #map-chart {
        height: 450px;
    }


    #map-chart svg {
        width: 100%;
        height: 100%;
        margin: auto;
    }

    #map-chart svg {
        margin: auto;
    }


    /*class styling*/

    .boundary {
        fill: none;
        stroke: #fff;
        stroke-width: .8px;
    }

    .countries {
        fill: #d9d9d9;
    }

    .circle-legend {
        width: 200px;
        height: 65px;
        padding-right: 80px;
        margin: auto;
        display: inline-block;
        float: right;
    }


    .circle-legend text {
        font-size: 11px;
    }

    .circle-legend .label {
        font-size: 12px;
        font-weight: bold;
        text-anchor: middle;
    }

    .circle-legend .subLabel {
        font-size: 11px;
        font-weight: bold;
    }

    .stroke {
        fill: none;
        stroke: #000;
        stroke-width: 2px;
    }

    .fill {
        fill: #fff;
        pointer-events: none;
    }

    .graticule {
        fill: none;
        stroke: #777;
        stroke-width: .5px;
        stroke-opacity: .2;
        pointer-events: none;
    }


    .graticule.outline {
        stroke-width: 2px;
        stroke: #000;
    }

    .header {
        width: 600px;
        margin: auto;
        text-align: center;
    }

    .wrapper {
        width: 1600px;
        margin: auto;
    }

    .view {
        width: 750px;
        /*margin: auto;*/
        padding: 5px;
        float: left;
    }


    .axis path,
    .axis line {
        fill: none;
        stroke: #000;
        shape-rendering: crispEdges;
    }

    .axis-label {
        font-size: 14px;
        stroke: black;
        fill: black;
        color: black;
    }

    div.toggle-panel {
        display: block;
        width: 100%;
        height: 30px;
        padding: 2px;
    }

    div.dropdown-wrapper {
        display: inline-block;
        margin-left: 75px;
        width: 320px;
        height: 65px;
        padding: 2px;
    }

    .dropdown {
        float: right;
    }

    .y-label,
    .x-label,
    .c-label {
        display: inline-block;
        float: left;
        padding-right: 5px;
    }


    #x-axis{
        margin: 20px;
    }

    #y-axis{

        margin: 20px;

    }

    /*dropdown menu*/

    .select-selected {
        background-color: DodgerBlue;
    }


    /*style the arrow inside the select element:*/

    .select-selected:after {
        position: absolute;
        content: "";
        top: 14px;
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #fff transparent transparent transparent;
    }


    /*point the arrow upwards when the select box is open (active):*/

    .select-selected.select-arrow-active:after {
        border-color: transparent transparent #fff transparent;
        top: 7px;
    }


    /*style the items (options), including the selected item:*/

    .select-items div,
    .select-selected {
        color: #ffffff;
        padding: 8px 16px;
        border: 1px solid transparent;
        border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
        cursor: pointer;
    }


    /*style items (options):*/

    .select-items {
        position: absolute;
        background-color: DodgerBlue;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 99;
    }


    /*hide the items when the select box is closed:*/

    .select-hide {
        display: none;
    }

    .select-items div:hover,
    .same-as-selected {
        background-color: rgba(0, 0, 0, 0.1);
    }


    /* slider styling */

    .slider {
        -webkit-appearance: none;
        width: 525px;
        height: 15px;
        border-radius: 5px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        margin-left: 20px
    }

    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #4CAF50;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: #D4E157;
        cursor: pointer;
    }

    .slider:hover {
        opacity: 1;
    }

    .slider-label svg {
        height: 35px;
    }

    .slider-label svg text {
        text-anchor: middle;
    }

    .slider-wrap {
        display: inline-block;
        float: left;
        width: 450px;
        margin-left: 50px;
    }


    /*tooltip */

    div.tooltip {
        position: absolute;
        text-align: center;
        min-width: 60px;
        height: 28px;
        padding: 2px;
        background: white;
        stroke: gray;
        border-radius: 8px;
        pointer-events: none;
    }

    .tooltip h2 {
        margin: auto;
        font: 14px sans-serif;
    }


    /* Styling for Counties */

    .africa {
        fill: #FFCA28;

        /*  stroke-width: 1px;*/
    }

    path.africa{
        stroke: white;
        stroke-width: 1px;
    }
    path.europe{
        stroke: white;
        stroke-width: 1px;
    }
    path.americas{
        stroke: white;
        stroke-width: 1px;
    }
    path.asia{
        stroke: white;
        stroke-width: 1px;
    }
    path.africa.selected-country,
    circle.africa.selected-country {
        fill: #cc9a04;
        /* stroke: #000000;*/
    }

    text.africa {
        color: #FFCA28;
    }

    i.africa {
        color: #FFCA28;
    }

    .asia {
        fill: #85C1E9;
        stroke: #85C1E9;
    }

    path.asia.selected-country,
    circle.asia.selected-country {
        fill: #2d7aad;
        /*  stroke-width: 1px;*/
        /* stroke: #000000;*/
    }

    i.asia {
        color: #2d7aad;
    }

    text.asia {
        color: #2d7aad;
    }

    .americas {
        fill: #D4E157;
    }


    i.nf {
        color: grey;
    }

    .nf {
        fill: grey;

    }

    #activeYear {
        stroke-width: 1px;
        stroke: #000000;
        padding: 25px;
    }

    path.americas.selected-country,
    circle.americas.selected-country {
        fill: #aaba18;
        /*  stroke-width: 1px;*/
        /* stroke: #000000;*/
    }

    i.americas {
        color: #D4E157;
    }


    text.americas {
        color: #D4E157;
    }

    .europe {
        fill: #AD1457;
        color: #AD1457;

    }

    path.europe.selected-country,
    circle.europe.selected-country {
        fill: #7c0238;
        stroke-width: 1px;
        stroke: #000000;
    }

    i.europe {
        color: #AD1457;
    }

    text.europe {
        color: #AD1457;
    }

    .activeYear-background {
        font-size: 80px;
        opacity: .4;
    }


    #plotControls{
        display: inline-flex;
    }
</style>



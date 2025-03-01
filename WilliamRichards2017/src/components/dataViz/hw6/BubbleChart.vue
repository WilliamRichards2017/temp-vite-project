<template>
    <div id="bubbleChart">
        <div id="tooltip"></div>
        <pre class="h4">Democratic leaning &#9 &#9 &#9 &#9 &#9 &#9 &#9 &#9 Republican leaning</pre>
        <svg width="800" id="bubbleSvg"></svg>
    </div>
</template>

<script>

    import * as d3 from 'd3';
    export default {
        name: 'BubbleChart',
        props: {
            words: null,
            brushedWords: null,
            separate: null,
        },

        data() {
            return {
                margin: {top: 40, right: 40, bottom: 40, left: 40},

                minTotal: null,
                maxTotal: null,
                radiusScale: null,
                colorDict: {
                    "education": "#28a745",
                    "economy/fiscal issues": "#d73a49",
                    "crime/justice": "#ffd33d",
                    "mental health/substance abuse": "#6f42c1",
                    "health care": "#0366d6",
                    "energy/environment": "#f66a0a"
                    ,
                },
                colorArray: ["economy/fiscal issues", "energy/environment", "crime/justice", "education", "health care", "mental health/substance abuse"],
            }
        },

        methods: {
            categoryToColor(category) {
                if (this.colorDict.hasOwnProperty(category)) {
                    return this.colorDict[category];
                }
                return "grey";
            },

            initScales() {
                let self = this;

                self.minTotal = d3.max(self.words, function (d) {
                    return +d.total;
                });
                self.maxTotal = d3.max(self.words, function (d) {
                    return -d.total;
                });
                self.radiusScale = d3.scaleLinear()
                    .domain([self.minTotal, self.maxTotal])
                    .range([1, 12]);
            },


            buildBubbleChart() {
                let self = this;

                d3.select("#bubbleSvg").remove();

                let data = this.words;

                let maxTotal = d3.max(data, function (d) {
                    return +d.total;
                });
                let minTotal = d3.max(data, function (d) {
                    return -d.total;
                });
                let ticks = ["50", "40", "30", "20", "10", "0", "10", "20", "30", "40", "50"];

                let percentScale = d3.scaleLinear()
                    .range([0, 750]);

                let percentAxis = d3.axisTop(percentScale).ticks(11).tickFormat(function (d, i) {
                    return ticks[i];
                });

                let percentHeader = d3.select('#bubbleChart').append("svg")
                    .attr("id", "bubbleSvg")
                    .attr("width", 800)
                    .attr("height", 400)
                    .append("svg")
                    .attr("width", 790)

                    .attr("height", 50)
                    .attr("margin", "5px");

                d3.select("#bubbleSvg").style("opacity", 0);

                percentHeader.append("g")
                    .attr("x", 15)
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(25, 25)")
                    .call(percentAxis);

                let radiusScale = d3.scaleLinear()
                    .domain([minTotal, maxTotal])
                    .range([1, 12]);

                var tooltip = d3.select("#tooltip")
                    .style("position", "absolute")
                    .style("z-index", "3000")
                    .style("visibility", "hidden")
                    .style("background", "#000")
                    .style("width", "100px")
                    .style("height", "100px");

                d3.select('#bubbleChart > svg')
                    .selectAll('.headerText')
                    .data(self.colorArray)
                    .join('text')
                    .attr("x", 20)
                    .attr("y", (d, i) => 50 + i * 133)
                    .text(d => d)
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .attr("class", "headerText")
                    .attr("fill", "black")
                    .attr("opacity", 0);

                d3.select('#bubbleChart > svg')
                    .selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('r', d => radiusScale(d.total))
                    .style("fill", d => self.colorDict[d.category])
                    .style("stroke", "black")
                    .style("z-axis", 0.01)
                    .on("mousemove", function () {
                        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                    })
                    .on("mouseout", function () {
                        return tooltip.style("visibility", "hidden");
                    })
                    .attr('cx', function (d) {
                        return d.sourceX;
                    })
                    .attr('cy', function (d) {
                        return d.sourceY + 100;
                    });
                d3.select("#bubbleSvg").transition().duration(100).style("opacity", 1);
            },

            separateBubbleChart() {
                let self = this;

                d3.select("#bubbleSvg").attr("height", 761);

                d3.select('#bubbleSvg')
                    .selectAll('circle')
                    .transition().duration(300)
                    .attr('cx', function (d) {
                        return d.moveX;
                    })
                    .attr('cy', function (d) {
                        return d.moveY + 100;
                    })
                    .style("fill", d => self.categoryToColor(d.category));

                d3.select('#bubbleSvg')
                    .selectAll(".headerText")
                    .transition().duration(300)
                    .attr("opacity", 1);

            },

            unseparateBubbleChart() {
                let self = this;

                d3.select("#bubbleSvg").attr("height", 400);

                d3.select('#bubbleSvg')
                    .selectAll('circle')
                    .transition().duration(300)
                    .attr('cx', function (d) {
                        return d.sourceX;
                    })
                    .attr('cy', function (d) {
                        return d.sourceY + 100;
                    })
                    .style("fill", d => self.categoryToColor(d.category));

                d3.select('#bubbleChart > svg')
                    .selectAll(".headerText")
                    .transition().duration(300)
                    .attr("opacity", 0);
            },

            highlightBrushedNodes() {
                let self = this;

                let nodes = d3.select("#bubbleChart").selectAll("circle");

                let brushedPhrases = [];

                for (let i = 0; i < this.brushedWords.length; i++) {
                    brushedPhrases.push(this.brushedWords[i].phrase);
                }
                let nonBrushed = nodes.filter((d) => {
                    return !brushedPhrases.includes(d.phrase);
                });
                let brushed = nodes.filter((d) => {
                    return brushedPhrases.includes(d.phrase);
                });
                nonBrushed.style("fill", "grey");

                brushed.style("fill", d => self.categoryToColor(d.category));
            },

        },

        mounted() {
            this.initScales();
            this.buildBubbleChart();
        },

        watch: {
            separate: function () {
                if (this.separate) {
                    this.separateBubbleChart();
                } else {
                    this.unseparateBubbleChart();
                }
            },
            brushedWords: function () {
                this.highlightBrushedNodes();
            },
        }
    }
</script>

<style scoped>

    .nb {

        fill: grey !important;
    }

    #tooltip {
        opacity: 0.5;
    }

    #bubbleChart {
        overflow-y: scroll;
        overflow-x: hidden;
        height: 65vh;

    }

    #fg {
        top: 0;
        bottom: 0;
        width: 500px;
        height: 500px;
        position: absolute;
    }

    .h4 {
        display: block;
        font-size: 1em;
        margin-top: 1.33em;
        margin-bottom: 1.33em;
        margin-left: 0;
        margin-right: 0;
        font-weight: bold;
    }
</style>


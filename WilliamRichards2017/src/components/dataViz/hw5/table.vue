<template>

</template>

<script>

    import teamData from './data/fifa-matches-2018.js'
    import * as d3 from 'd3';


    export default {

        data() {
            return {
                teamData: teamData

            }
        },
        methods: {
            createTable() {
                let maxGoal = Math.max.apply(Math, this.teamData.map(d => d["value"]["Goals Made"]));

                let gsWidth = 200;
                let gsHeight = 35;

                console.log("maxGoal", maxGoal);

                let goalScale = d3.scaleLinear()
                    .domain([0, maxGoal])
                    .range([10, gsWidth - 10]);


                let axis = d3.axisTop(goalScale);

                d3.selectAll("#goalHeader > svg").remove();

                let goalHeader = d3.select("#goalHeader").append("svg")
                    .attr("width", gsWidth)
                    .attr("height", gsHeight)


                goalHeader.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0, 25)")
                    .call(axis);

                d3.select("#goalHeader")
                    .on("click", (d, i) => this.sortByCol(i));


                let team = d3.select("#matchTable > thead > tr").selectAll("th")
                    .on("click", (d, i) => this.sortByCol(5));

                let headers = d3.select("#matchTable thead > tr").selectAll("td")
                    .on("click", (d, i) => this.sortByCol(i));

                this.tableElements = this.teamData;
            },

            updateTable() {
                // ******* TODO: PART III *******
                //Create table rows

    let svgs = d3.select("#matchTable  tbody").selectAll("td").selectAll("svg").remove();


                let tr = d3.select("#matchTable  tbody").selectAll("tr")
                    .data(this.tableElements).join("tr");
                // EXIT
                // Remove old elements as needed.

                let th = tr.selectAll("th").data(d => {
                    return [d];
                })
                    .join("th")
                    // .text((d, i) =>  {if(d["value"] === "aggregate"){return d["key"] } else{
                    //     return "game"
                    // }})
                    .on("click", (d, i) => this.updateList(d["key"]));

                th.text(d => {
                    if (d.value.type === "aggregate") {
                        return d["key"];
                    } else {
                        return "  vs. " + d["key"];
                    }
                })
                    .style("color", d => {
                        if (d.value.type === "game") {
                            return "gray";
                        }
                    });

                let gsWidth = 200;
                let maxGoal = 16;

                console.log("maxGoal", maxGoal);

                let goalScale = d3.scaleLinear()
                    .domain([0, maxGoal])
                    .range([0, gsWidth]);


                let td = tr.selectAll("td").data(d => this.cellArray(d)).join("td");


                let goals = td.filter((d) => {
                    return d.vis === "goals"
                });

                let bars = td.filter((d) => {
                    return d.vis === "bar";
                });

                let rounds = td.filter((d) => {
                    return d.vis === 'text'
                });


                let games = td.filter(d => {
                    return d.type === "game"
                });


                rounds.join("text")
                    .text(d => d["val"]);


                //Todo:scale using td cellwidth and height values
                let barSvgs = bars.append("svg")
                    .attr("class", "chart")
                    .attr("width", 35)
                    .attr("height", 25);


                let barHeight = 20;

                barSvgs
                    .append("rect")
                    .attr("width", d => d["val"] * 5)
                    .attr("height", barHeight)
                    .attr("y", 5)
                    .attr("fill", "red")
                    .attr("opacity", d => d["val"] / 7)
                    .style("text-align", "center");


                barSvgs
                    .append("text")
                    .style("fill", "black")
                    .attr("x", 3)
                    .attr("y", barHeight / 2 +3)
                    .attr("dy", "6px")
                    .text(d => d["val"]);


                let goalSvgs = goals.append("svg")
                    .attr("width", 210)
                    .attr("height", 25)


                goalSvgs.append("rect")
                    .attr("width", d => Math.abs(goalScale(d["val"]["GoalsConceded"] - d["val"]["GoalsMade"])))
                    .attr("height", 10)
                    .attr("x", d => Math.min(goalScale(d["val"]["GoalsConceded"]), goalScale(d["val"]["GoalsMade"]))+5)
                    .attr("y", 8)
                    .style("fill", d => {
                        if (d.type === "aggregate") {
                            if (d.val.GoalsMade - d.val.GoalsConceded > 0) {
                                return "blue";
                            } else if (d.val.GoalsMade - d.val.GoalsConceded < 0) {
                                return "red";
                            } else {
                            }
                        } else {
                            return "none";
                        }
                    })
                    .attr("opacity", 0.5);

                //Todo, translate circles to goal scale exactly
                goalSvgs.append("circle")
                    .attr("r", 5)
                    .attr("cy", barHeight / 2 +3)
                    .attr("cx", d => goalScale(d["val"]["GoalsMade"])+5)
                    .style("fill", d => {
                        if (d.val.GoalsConceded === d.val.GoalsMade) {
                            return "gray";
                        } else if (d.type === "aggregate") {
                            return "blue";
                        } else {
                            return "white";
                        }

                    })
                    .style("stroke", d => {

                        if (d.type === "game") {
                            if (d.val.GoalsConceded === d.val.GoalsMade) {
                                return "gray";
                            }
                            return "blue";
                        }
                    })
                    .style("opacity", 1);


                goalSvgs.append("circle")
                    .attr("r", 5)
                    .attr("cy", barHeight / 2 + 3)
                    .attr("cx", d => goalScale(d["val"]["GoalsConceded"])+5)
                    .style("fill", d => {
                        if (d.type === "aggregate") {
                            return "red"
                        } else {
                            return "white";
                        }

                    })
                    .style("stroke", d => {
                        if (d.type === "game") {
                            if (d.val.GoalsConceded === d.val.GoalsMade) {
                                return "gray";
                            }
                            return "red";
                        }

                    })
                    .style("opacity", 1);
            },


            makeCell(type, vis, val) {

                return {"type": type, "vis": vis, "val": val};

            },
            cellArray(d) {
                // console.log("d inside cell array", d);

                let value = d["value"];

                let type = value["type"];

                let gc = this.makeCell(type, "goals", {
                    "GoalsMade": value["Goals Made"],
                    "GoalsConceded": value["Goals Conceded"]
                });

                let rc = this.makeCell(type, "text", value["Result"]["label"]);

                let wc = this.makeCell(type, "bar", value["Wins"]);

                let lc = this.makeCell(type, "bar", value["Losses"]);

                let tc = this.makeCell(type, "bar", value["TotalGames"]);


                return [gc, rc, wc, lc, tc];
            },


            sortByCol(i) {

                this.collapseList();

                let tr = d3.select("#matchTable > tbody").selectAll("tr");



                if (i === 0) {
                    this.sortByGoalDiff();
                } else if (i === 1) {
                    this.sortByRound();
                } else if (i === 2) {
                    this.sortByWins();
                } else if (i === 3) {
                    this.sortByLosses();
                } else if (i === 4) {
                    this.sortByTotalGames()
                } else if (i === 5) {
                    this.sortByTeamName();
                }

                this.updateTable();

            },

            sortByGoalDiff() {
                let preSort = this.tableElements.slice(0);

                this.tableElements.sort(function (a, b) {
                    if (a.value["Goals Made"] - a.value["Goals Conceded"] < b.value["Goals Made"] - b.value["Goals Conceded"]) {
                        return 1;
                    }
                    if (a.value["Goals Made"] - a.value["Goals Conceded"] > b.value["Goals Made"] - b.value["Goals Conceded"]) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });

                // console.log("presort, tableElements", preSort, this.tableElements);

                let arrEq = function arraysEqual(a1, a2) {
                    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
                    return JSON.stringify(a1) == JSON.stringify(a2);
                };


                if (arrEq(preSort, this.tableElements)) {
                    this.tableElements.reverse();
                }
            },

            sortByRound() {
                let preSort = this.tableElements.slice(0);

                this.tableElements.sort(function (a, b) {

                    let aPoint = a.value.Result.ranking;
                    let bPoint = b.value.Result.ranking;


                    if (aPoint < bPoint) {
                        return 1;
                    }
                    if (bPoint < aPoint) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });


                let arrEq = function arraysEqual(a1, a2) {
                    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
                    return JSON.stringify(a1) == JSON.stringify(a2);
                };


                if (arrEq(preSort, this.tableElements)) {
                    this.tableElements.reverse();
                }
            },

            sortByWins() {
                let preSort = this.tableElements.slice(0);

                this.tableElements.sort(function (a, b) {

                    let aPoint = a.value.Wins;
                    let bPoint = b.value.Wins;


                    if (aPoint < bPoint) {
                        return 1;
                    }
                    if (bPoint < aPoint) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });

                let arrEq = function arraysEqual(a1, a2) {
                    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
                    return JSON.stringify(a1) == JSON.stringify(a2);
                };


                if (arrEq(preSort, this.tableElements)) {
                    this.tableElements.reverse();
                }
            },

            sortByLosses() {

                let preSort = this.tableElements.slice(0);

                this.tableElements.sort(function (a, b) {

                    let aPoint = a.value.Losses;
                    let bPoint = b.value.Losses;


                    if (aPoint < bPoint) {
                        return 1;
                    }
                    if (bPoint < aPoint) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });

                let arrEq = function arraysEqual(a1, a2) {
                    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
                    return JSON.stringify(a1) == JSON.stringify(a2);
                };


                if (arrEq(preSort, this.tableElements)) {
                    this.tableElements.reverse();
                }

            },

            sortByTotalGames() {
                let preSort = this.tableElements.slice(0);

                this.tableElements.sort(function (a, b) {

                    let aPoint = a.value["Total Games"];
                    let bPoint = b.value["Total Games"];


                    if (aPoint < bPoint) {
                        return 1;
                    }
                    if (bPoint < aPoint) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                });

                let arrEq = function arraysEqual(a1, a2) {
                    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
                    return JSON.stringify(a1) == JSON.stringify(a2);
                };


                if (arrEq(preSort, this.tableElements)) {
                    this.tableElements.reverse();
                }

            },

            sortByTeamName() {

                let preSort = this.tableElements.slice(0);

                this.tableElements.sort(function (a, b) {


                    let aPoint = a.key;
                    let bPoint = b.key;


                    return aPoint.localeCompare(bPoint);
                });


                let arrEq = function arraysEqual(a1, a2) {
                    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
                    return JSON.stringify(a1) == JSON.stringify(a2);
                };


                if (arrEq(preSort, this.tableElements)) {
                    this.tableElements.reverse();
                }

            },

            /**
             * Updates the global tableElements variable, with a row for each row to be rendered in the table.
             *
             */
            updateList(country) {

                //todo: fix last element edge case

                let i = this.getIndexFromList(country);

                let type = this.tableElements[i].value.type;

                if ("type" === "game") {
                    return;
                }

                let games = this.tableElements[i]["value"]["games"];


                if (typeof this.tableElements[i + 1] === "undefined") {
                    for (let g = 0; g < games.length; g++) {
                        this.tableElements.splice(i + g + 1, 0, games[g]);
                    }
                    this.updateTable();
                    return;
                }

                let typeOfNext = this.tableElements[i + 1].value.type;


                if (type === "aggregate" && typeOfNext === "aggregate") {

                    for (let g = 0; g < games.length; g++) {
                        this.tableElements.splice(i + g + 1, 0, games[g]);
                    }
                } else if (type === "aggregate" && typeOfNext === "game") {

                    this.tableElements = this.collapseTeam(i);
                }
                this.updateTable();
            },

            getIndexFromList(country) {
                return this.tableElements.findIndex(p => p.key === country);
            },

            collapseTeam(i) {
                let te = this.tableElements[i + 1];

                while (te.value.type === "game") {
                    this.tableElements.splice(i + 1, 1);
                    te = this.tableElements[i + 1];
                    if (typeof te === "undefined") {
                        return this.tableElements;
                    }
                }
                return this.tableElements;
            },

            collapseList() {
                let te = [];

                for (let i = 0; i < this.tableElements.length; i++) {
                    if (this.tableElements[i].value.type === "aggregate") {
                        te.push(this.tableElements[i]);
                    }
                }
                this.tableElements = te;
            },

            updateTree(d) {



                d3.select("#tree").selectAll('line.link').filter((dl) => {
                    return dl.target.data.Team === d.key;
                }).style("stroke", "red");


                d3.select("#tree").selectAll("text").filter((dt) => {
                    return dt.data.Team === d.key;
                }).style("fill", "red");
            },

            clearTree() {
                d3.select("#tree").selectAll('line.link')
                    .style("stroke", "black");

                d3.select("#tree").selectAll("text")
                    .style("fill", "black");
            },
            isEven(value) {
        if (value%2 == 0)
            return true;
        else
            return false;
    }
        },
        mounted() {
            let self = this;
            this.createTable();
            this.updateTable();
            this.clearTree();

            d3.select("#matchTable > tbody").selectAll("tr")
                .on("mouseover", function(d,i){
                    self.updateTree(d);
                    d3.select(this).style("background-color", "#feebe2")})
                .on("mouseout", function(d,i){
                    self.clearTree(d);
                    d3.select(this).style("background-color", function(){
                        if(self.isEven(i)){
                            return "white";
                        }
                        else{
                            return "#d7d7d7";
                        }
                    })

            })
                .style("background-color", function(d, i){
                    if(self.isEven(i)){
                        return "white";
                    }
                    else{
                        return "#d7d7d7";
                    }
                });



        },

    }
</script>

<style scoped>

    th:before {
        content: url(https://visualpharm.com/assets/165/Sort-595b40b85ba036ed117dbb04.svg)
    }

    tbody tr:hover {
        color: #feebe2;
    }
    tbody tr .game {
        background-color: #f0f0f0;
    }

    .aggregate {
        color: #af161e;
        font-weight: bold;
    }

    .game {
        color: #b1b1b1;
    }


    #flex{
        display: inline-flex;
    }



    .label {
        fill: #ffffff;
        font: 14px sans-serif;

    }


    header {
        padding: 0.5em;
        text-align: center;
        height: 100px;
    }

    #logo {
        float: right;
        height: 100px;
    }

    .goalBar {
        opacity: 0.6;
    }

    .goalCircle {
        stroke-width: 3px;
        r: 5px;
    }

    .node circle {
        fill: #be2714;;
    }

    .node text {
        font: 14px sans-serif;
    }

    .winner circle {
        fill: #364e74;
    }

    .loser text {
        text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
    }

    .link {
        fill: none;
        stroke: rgb(36, 33, 33);
        stroke-opacity: 0.5;
        stroke-width: 3px;
    }

    .selected {
        stroke: #e20e0e;
        stroke-width: 6px;
    }

    .selectedLabel {
        fill: #e20e0e;
        font-weight: 300;
    }


    .barText {
        fill: black;
    }

    .chart .barText {
        text-anchor: start;
        mix-blend-mode: difference;
    }


</style>

<template>
    <div id="treeWrapper">
        <svg width="600" height="500">
            <g id="tree"></g>
        </svg>
    </div>

</template>

<script>
    import treeData from './data/fifa-tree-2018.js'

    export default {

        props: {},

        data() {
            return {}
        },
        methods: {
            createTree() {
                let width = 500;
                let height = 500;

                treeData.forEach((d, i) => {
                    d.id = d.Team + d.Opponent + i;
                });

                var treeLayout = d3.tree();

                let root = d3.stratify()
                    .id((d, i) => {
                        return i
                    })
                    .parentId(d => {
                        return d.ParentGame
                    })
                    (treeData);

                let treeSvg = d3.select("#tree");

                treeLayout(root);

                var wScale = d3.scaleLinear()
                    .domain([0, 1])
                    .range([0, width]);

                let hScale = d3.scaleLinear()
                    .domain([0, 1])
                    .range([0, height]);


                treeSvg.selectAll('circle.node')
                    .data(root.descendants())
                    .enter()
                    .append('circle')
                    .attr('cx', function (d) {
                        return wScale(d.y) + 15;
                    })
                    .attr('cy', function (d) {
                        return hScale(d.x);
                    })
                    .attr('r', 4)
                    .attr("fill", d => {
                        if (d.data.Wins === 0) {
                            return "red"
                        } else {
                            return "blue"
                        }
                    });

                treeSvg.selectAll("text.node")
                    .data(root.descendants())
                    .enter()
                    .append('text')
                    .text(d => d.data.Team)
                    .attr("x", function (d) {
                        return wScale(d.y) + 15;
                    })
                    .attr("y", function (d) {
                        return hScale(d.x) - 5;
                    });

                treeSvg
                    .selectAll('line.link')
                    .data(root.links())
                    .enter()
                    .append('line')
                    .classed('link', true)
                    .attr('x1', function (d) {
                        return wScale(d.source.y) + 15;
                    })
                    .attr('y1', function (d) {
                        return hScale(d.source.x);
                    })
                    .attr('x2', function (d) {
                        return wScale(d.target.y) + 15;
                    })
                    .attr('y2', function (d) {
                        return hScale(d.target.x);
                    })
            },


        },
        mounted() {
            this.createTree();
        },

        watch: {

        }
    }
</script>

<style scoped>

    #treeWrapper{
        height: 60vh;
        overflow-y: visible;
    }

    h1 {
        margin-top: 0;
        font-family: 'font2';
        color: #af161e;
    }

    h2 {
        font-family: 'font2';
        color: #af161e;
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

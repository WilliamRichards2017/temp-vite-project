<template>
    <div id="hw6">
        <div class="hw6Title">
            <h1>Word choice frequencies based on politcal leanings</h1>
        </div>
        <div id="bg">
            <div id="hw6Header">
                <toggle-button :value="false"
                               v-model="separate"
                               :color="toggleColors">

                </toggle-button>
                <span id="toggleLabel" style="color: black; fill: black;">
                    {{separateText}}
                </span>

            </div>
                <div class="flexRow">
                    <BubbleChart :words="words" :brushedWords="brushedWords" :separate="separate"
                                 >
                    </BubbleChart>
                    <Table :words="brushedWords"></Table>
                </div>
            </div>
        <cite class="citation">Data sourced from: <a href="https://github.com/fivethirtyeight/data/blob/master/state-of-the-state/words.csv" target="_blank" style="font-size: 16px">github.com/fivethirtyeight</a></cite>

    </div>
</template>

<script>
    import BubbleChart from './BubbleChart.vue'
    import Table from './Table.vue'
    import Words from './data/words'

    import * as d3 from 'd3';

    export default {
        components: {
            BubbleChart,
            Table
        },

        data() {
            return {
                words: Words,
                brushedWords: Words,
                separate: false,
                separateText : 'Expand by category',
                colorDict: {
                    "education": "green",
                    "economy/fiscal issues": "red",
                    "crime/justice": "blue",
                    "mental health/substance abuse": "purple",
                    "health care": "orange",
                    "energy/environment": "magenta",
                },
            toggleColors: {checked: '#9068be', unchecked: '#4fc9c5', disabled: 'gray'}
            }
        },
        methods: {


            initBrush() {
                let brush = d3.brush()
                    .extent([[0, 0], [800, 1000]])
                    .on("end", this.brushEnded)
                    .on("brush", this.brush)
                    .on("start", this.brushStart);

                d3.select("#bubbleSvg")
                    .attr("class", "brush")
                    .call(brush);
            },

            brushStart() {
                this.brushedWords = this.words;
            },

            brush() {
                let self = this;

                this.brushedWords = [];

                const clonedWords = self.words.slice();

                let s = d3.event.selection;

                let x1 = s[0][0];
                let y1 = s[0][1];

                let x2 = s[1][0];
                let y2 = s[1][1];

                let yOffset = 100;

                for (let i = 0; i < clonedWords.length; i++) {
                    let x = null;
                    let y = null;

                    if (!self.separate) {
                        x = clonedWords[i].sourceX;
                        y = clonedWords[i].sourceY + yOffset;
                    } else if (self.separate) {
                        x = clonedWords[i].moveX;
                        y = clonedWords[i].moveY + yOffset;
                    }
                    if (x > x1 && x < x2 && y > y1 && y < y2) {
                        this.brushedWords.push(clonedWords[i]);
                    }
                }
                if (this.brushedWords.length === 0) {
                    this.brushedWords = this.words;
                }
            },
        },

        watch: {
            separate: function () {
                if (this.separate){
                    this.separateText= "Collapse categories"
                }
                else{
                    this.separateText = "Expand by category"
                }
            }
        },
        mounted() {
            this.initBrush();
        },
    }
</script>

<style scoped>


    .hw6Title{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    h1{
        vertical-align:middle;
        position: absolute;

    }

    #hw6 {
        padding-top: 20px;
        padding-bottom: 10px;
        width: 100%;
        height: 70vh;
    }

    #bg {
        width: 100%;
        height: 100%;
    }

    .flexRow {
        display: flex;
    }

    #toggleLabel{
        padding-left: 10px;
    }

    .citation{
        position: fixed;
        left: calc(100% - 350px);
        bottom: 75px;
        width: 100%;
        font-size: 14px;
        z-index: 1;
    }

</style>



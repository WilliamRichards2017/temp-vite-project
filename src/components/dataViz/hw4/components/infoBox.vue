<template>
</template>

<script>

    import infoBoxData from './../js/infoBoxData.js';
    import json from './../data/world.json'


    export default {

        props: {
            infoData: null,
            activeCountry: null,
            activeYear: null,
            worldData: json,
        },

        data() {
            return {
            }
        },
        methods: {

            initInfoBox(){
                let self = this;
                let keys = Object.keys(self.infoData);


                Array.prototype.insert = function ( index, item ) {
                    this.splice( index, 0, item );
                };


                keys.insert(0, "Country");



                d3.select("#country-detail")
                    .append("text")
                    .text("Country: ")
                    .attr("id", "selectedCountry");


                d3.select("#country-detail")
                    .selectAll("text")
                    .data(keys).enter().append("div").append("text")
                    .text(d => d + ":  ")
                    .append("text")
                    .text("")
                    .attr("class", "details");

            },

            updateTextDescription(activeCountry, activeYear) {
                let self = this;
                let infoArr = [];

                let values = Object.values(self.infoData);

                let countryName = "";
                let regionName = "";


                Array.prototype.insert = function ( index, item ) {
                    this.splice( index, 0, item );
                };



                for(let i in values){
                    for(let key in values[i]) {

                        // console.log(values[i]);
                        if (values[i][key].hasOwnProperty("geo")) {

                            if (values[i][key]["geo"].toUpperCase() === activeCountry) {
                                countryName = values[i][key]["country"];
                                if(values[i][key].hasOwnProperty("region")) {
                                    regionName = values[i][key]["region"];
                                }
                                infoArr.push(values[i][key][activeYear]);
                            }
                        }
                    }
                }

                console.log("infoArr in updateTextDescription", infoArr);

                d3.select("#selectedCountry")
                    .text("Country: " + countryName)
                    .attr("class", regionName);

                d3.select("#country-detail").selectAll(".details")
                    .data(infoArr)
                    .text(d => d);

            }

        },


        mounted() {

        },



        watch: {
            infoData: function(){
                this.initInfoBox();
            },
            activeCountry: function(){
              this.updateTextDescription(this.activeCountry, this.activeYear);
            },

            activeYear: function(){
                this.updateTextDescription(this.activeCountry, this.activeYear);
            }
        }

    }
</script>

<style>
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
        display: inline-block;
        float: left;
    }

    .innerWrapper {
        width: 690px;
        display: inline-block;
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
</style>

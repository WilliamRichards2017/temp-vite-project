/** Data structure for the data associated with an individual country. */
class InfoBoxData {
    /**
     *
     * @param country name of the active country
     * @param region region of the active country
     * @param indicator_name the label name from the data category
     * @param value the number value from the active year
     */
    constructor(country, region, indicator_name, value) {
        this.country = country;
        this.region = region;
        this.indicator_name = indicator_name;
        this.value = value;
    }
}

/** Class representing the highlighting and selection interactivity. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {

        this.data = data;

        let keys = Object.keys(this.data);


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

    }



    /**
     * Renders the country description
     * @param activeCountry the IDs for the active country
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeCountry, activeYear) {
        // ******* TODO: PART 4 *******
        // Update the text elements in the infoBox to reflect:
        // Selected country, region, population and stats associated with the country.
        /*
         * You will need to get an array of the values for each category in your data object
         * hint: you can do this by using Object.values(this.data)
         * you will then need to filter just the activeCountry data from each array
         * you will then pass the data as paramters to make an InfoBoxData object for each category
         *
         */

        let self = this;

        let infoArr = [];

        let keys = Object.keys(self.infoata);

        let values = Object.values(self.data);

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

        d3.select("#selectedCountry")
            .text("Country: " + countryName)
            .attr("class", regionName);

        d3.select("#country-detail").selectAll(".details")
            .data(infoArr)
            .text(d => d);

    }

    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {

        //TODO - Your code goes here -
    }

}

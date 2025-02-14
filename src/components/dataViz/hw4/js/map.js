/**
 * Data structure for the data associated with an individual country.
 * the CountryData class will be used to keep the data for drawing your map.
 * You will use the region to assign a class to color the map!
 */
class CountryData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the country paths
     * @param region the country region
     */
    constructor(type, id, properties, geometry, region) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        this.region = region;


    }
}

/** Class representing the map view. */
class Map {

    /**
     * Creates a Map Object
     *
     * @param data the full dataset
     * @param updateCountry a callback function used to notify other parts of the program when the selected
     * country was updated (clicked)
     */
    constructor(data, updateCountry) {
        // ******* TODO: PART I *******
        this.projection = d3.geoWinkel3().scale(140).translate([365, 225]);
        this.nameArray = data.population.map(d => d.geo.toUpperCase());
        this.populationData = data.population;
        this.updateCountry = updateCountry;
    }

    /**
     * Renders the map
     * @param world the topojson data with the shape of all countries and a string for the activeYear
     */
    drawMap(world) {
        //note that projection is global!

        // ******* TODO: PART I *******

        //world is a topojson file. you will have to convert this to geojson (hint: you should have learned this in class!)

        // Draw the background (country outlines; hint: use #map-chart)
        // Make sure to add a graticule (gridlines) and an outline to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

        // You need to match the country with the region. This can be done using .map()
        // We have provided a class structure for the data called CountryData that you should assign the paramters to in your mapping

        //TODO - Your code goes here -


        let geojson = topojson.feature(world, world.objects.countries);


        //TODO - finsih countrydata
        let countryData = geojson.features.map(country => {

            let index = this.nameArray.indexOf(country.id);
            let region = 'countries';

            if (index > -1) {
                region = this.populationData[index].region;
                return new CountryData(country.type, country.id, country.properties, country.geometry, region);
            } else {
                return new CountryData(country.type, country.id, country.properties, country.geometry, "nf");


            }

        });


       let w = 700;
       let h = 350;

        var svg = d3
            .select("#map-chart")
            .append("svg")
            // set to the same size as the "map-holder" div
            .attr("width", w)
            .attr("height", h);


        var projection = d3.geoWinkel3()
            .scale(w / 2 / Math.PI)
            //.scale(100)
            .translate([w / 2, h / 2]);
            // .center([0, 100]);

        var graticule = d3.geoGraticule();


        var path = d3.geoPath()
            .projection(projection);

        var mapLayer = svg.append('g')
            .attr("width", w)
            .attr("height", h)
            .classed('map-layer', true);

        // Draw each province as a path
        mapLayer.selectAll('path')
            .data(geojson.features)
            .enter().append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
            .on("click", d => this.updateCountry(d["id"]));


        mapLayer.selectAll('path')
            .data(countryData)
            .attr("class", d => d.region.toString())
            .attr("id", d => d.id.toString());




        mapLayer.append("path")
            .datum(graticule)
            .attr("class", "graticule")
            .attr("d", path);
        mapLayer.append("path")
            .datum(graticule.outline)
            .attr("class", "graticule outline")
            .attr("d", path)
            .attr("stoke-width", "4px");
    }

    /**
     * Highlights the selected conutry and region on mouse click
     * @param activeCountry the country ID of the country to be rendered as selected/highlighted
     */
    updateHighlightClick(activeCountry) {
        // ******* TODO: PART 3*******
        // Assign selected class to the target country and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        //

        this.clearHighlight();

        //TODO - Your code goes here -

     d3.select("#" + activeCountry.toUpperCase())
            .classed("selected-country", true);

        d3.select("#" + activeCountry.toLowerCase())
            .classed("selected-country", true);

    }

    /**
     * Clears all highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //TODO - Your code goes here -

        d3.selectAll("path")
            .classed("selected-country", false);

    }
}

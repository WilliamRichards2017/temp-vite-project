loadData().then(data => {

    // no country selected by default
    this.activeCountry = null;
    // deafultActiveYear is 2000
    this.activeYear = '2000';



    // ******* TODO: PART 3 *******
    /**
     * Calls the functions of the views that need to react to a newly selected/highlighted country
     *
     * @param countryID the ID object for the newly selected country
     */

    function updateCountry(countryID) {

        this.updateHighlightClick(countryID);
        infoBox.updateTextDescription(countryID, self.activeYear);

    }

    // ******* TODO: PART 3 *******

    /**
     *  Takes the specified activeYear from the range slider in the GapPlot view.
     *  It takes the value for the activeYear as the parameter. When the range slider is dragged, we have to update the
     *  gap plot and the info box.
     *  @param year the new year we need to set to the other views
     */
    function updateYear(year) {

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


        let yearScale = d3.scaleLinear().domain([1800, 2020]).range([30, 730]);
        let sliderText = d3.select("#slider-txt");


        sliderText.text(year.toString());
        sliderText.attr('x', yearScale(year));
        sliderText.attr('y', 25);

    }

    // Creates the view objects
    const infoBox = new InfoBox(data);
    const worldMap = new Map(data, updateCountry);
    const gapPlot = new GapPlot(data, updateCountry, updateYear, this.activeYear);


    // Initialize the plots; pick reasonable default values

    // here we load the map data
    d3.json('data/world.json').then(mapData => {

        // ******* TODO: PART I *******

        // You need to pass the world topo data to the drawMap() function as a parameter

        worldMap.drawMap(mapData);

    });

    // This clears a selection by listening for a click
    document.addEventListener("click", function(e) {
        //TODO - Your code goes here -
		// call clear highight methods
        worldMap.clearHighlight();
        gapPlot.clearHighlight();
    }, true);
});

// ******* DATA LOADING *******
// We took care of that for you

/**
 * A file loading function or CSVs
 * @param file
 * @returns {Promise<T>}
 */
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    let pop = await loadFile('data/pop.csv');
    let gdp = await loadFile('data/gdppc.csv');
    let tfr = await loadFile('data/tfr.csv');
    let cmu = await loadFile('data/cmu5.csv');
    let life = await loadFile('data/life_expect.csv');

    //return [pop, gdp, tfr, cmu, life];
    return {
        'population': pop,
        'gdp': gdp,
        'child-mortality': cmu,
        'life-expectancy': life,
        'fertility-rate': tfr
    };
}

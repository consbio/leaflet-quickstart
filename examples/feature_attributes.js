/*
Depends on:
* leaflet-omnivore
* d3
* lodash
* /static/utils.js
*/

var pageLoadStart = new Date().getTime();  // used for tracking load times of layers and data files

var features, data;
var pipeDelimFields = [];  // set list of pipe-delimited fields

// these two indices provide relationship between features and attributes; both are indexed by id.
var index = d3.map();
var featureIndex = d3.map();


omnivore.topojson('../static/features.json')
    .on('ready', function(){
        this.getLayers().forEach(function(feature){
            var style = {
                // set style
            };
            feature.setStyle(style);
            feature.on('click', function (e) {
                // handle click
            });
            featureIndex.set(feature.feature.id, feature);
        });
        this.addTo(map);
        features = this;

        onLoad();
        console.log('loaded boundary by',new Date().getTime() - pageLoadStart, 'ms');
    });


d3.csv('../static/attributes.csv',
    function(row){
        try {
            // cast string inputs to appropriate data types.  Second, optional argument is list of fields to exclude
            castFields(row);

            pipeDelimFields.forEach(function (f) {
                row[f] = decodeDictField(row[f]);
            });

            index.set(row.id, row);
        }
        catch (ex){
            console.error(ex);
        }

        return row;
    },
    function(rows){
        data = rows;

        onLoad();
        console.log('loaded csv by',new Date().getTime() - pageLoadStart, 'ms');
    }
);

// Use lodash to call load function after 2 prior async requests are complete
var onLoad = _.after(2, load);
function load() {
    // do the stuff that requires features and attributes in scope

}

/******* Map Configuration *********/
var basemaps = {
    'ESRI Ocean': L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13
    }),
    'ESRI Topo': L.tileLayer('//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        subdomains: ['server', 'services']
    }),
    'ESRI Gray': L.tileLayer('//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
        subdomains: ['server', 'services']
    }),
    'ESRI Imagery': L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    })
};

map = L.map('Map', {
    layers: [basemaps['ESRI Ocean']],
    zoom: 6,
    center: [44.07, -118.78]
});
map.zoomControl.setPosition('topright');
map.addControl(L.control.zoomBox({modal: true, position:'topright'}));
map.addControl(L.control.geonames({username: 'cbi.test', position:'topright'}));

// Legend is setup as a control to coordinate layout within Leaflet
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) { return L.DomUtil.get('Legend') };
legend.addTo(map);

map.addControl(L.control.layers(basemaps, null, {position: 'bottomright'}));
d3.select('.leaflet-control-layers-toggle').html('<i class="fa fa-globe"></i> basemaps');




/* DOM interactions powered by D3 */
/******* Tabs *********/

d3.selectAll('.tabs li').on('click', function() {
    selectTab(d3.select(this));
});
function selectTab(node){
    var id = node.attr('data-tab');
    d3.select(node.node().parentNode).selectAll('li.active').classed('active', false);
    node.classed('active', true);
    d3.select(node.node().parentNode.parentNode).selectAll('.tab').classed('hidden', function(d){
        return d3.select(this).attr('id') != id;
    });
}

/******* Open / Close buttons *********/
d3.selectAll('.button-open').on('click', function() {
    d3.select('#' + d3.select(this).attr('data-target')).classed('hidden', false);
});
d3.selectAll('.button-close').on('click', function() {
    d3.select('#' + d3.select(this).attr('data-target')).classed('hidden', true);
});
// Microsoft dropped IE < 11 so we should too
if (L.Browser.ielt9 || (L.Browser.ie && ((/MSIE 9/i).test(navigator.userAgent) || (/MSIE 10/i).test(navigator.userAgent)))){
    d3.select('#IEAlert').classed('hidden', false);
    throw 'UnsupportedBrowser';
}


/******* Map Configuration *********/
// Have to tell Leaflet where the marker images are
L.Icon.Default.imagePath = 'static/dist/images';


var basemaps = [
    L.tileLayer('//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        subdomains: ['server', 'services'],
        label: 'ESRI Topo'
    }),
    L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        label: 'ESRI Imagery'
    }),
    L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        label: 'ESRI Streets'
    }),
    L.tileLayer('//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
        subdomains: ['server', 'services'],
        label: 'ESRI Gray'
    })
];



map = L.map('Map', {
    zoom: 6,
    center: [44.07, -118.78]
});
map.zoomControl.setPosition('topright');
map.addControl(L.control.zoomBox({modal: false, position:'topright'}));
map.addControl(L.control.geonames({username: 'cbi.test', position:'topright'}));

// Legend is setup as a control to coordinate layout within Leaflet
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) { return L.DomUtil.get('Legend') };
legend.addTo(map);

map.addControl(L.control.basemaps({basemaps: basemaps}));

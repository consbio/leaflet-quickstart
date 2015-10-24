# Mapping Application Style Guide

## Visual Design

Basically, less is more.  Keep visual UI clean, simple, and remember that only one thing can be important at a time.

### Header:
* client logo
* page title

### Footer:
* cross-links to appropriate sites (gateway, client homepage, etc)
* cross-links to data in Data Basin (gallery, guide & case study)
* credits link and CBI logo

### Map Controls
* zoom in / out buttons should be upper right
* zoom to box should be just below that
* geonames search should be below that

### Basemaps:
* should include the basemap chooser with a few reasonable choices (can vary viewer to viewer)
* chooser should be in bottom right 
* choose a sensible default based on the nature of the project and data


### Legend:
* should generally include a legend if there are data layers that use meaningful colors
* legend should generally be located in bottom right of page, below basemaps chooser

### Scale Bar:
* don't include unless absolutely necessary (we don't have one built yet for Leaflet)


## Data

### Layers:

Feature layers should be encoded as `topojson`, most likely using [mapshaper](http://www.mapshaper.org/).
Generally, these should be < 1.5 MB compressed.  Smaller is better.

All feature layers must be in WGS84 geographic coordinate system (`ESPG:4326`).

Unless features and associated properties are very small, include only feature IDs in the topojson, and relate features
to associated properties in CSV files (see [`/examples/feature_attributes.js`](https://github.com/consbio/leaflet-quickstart/blob/master/examples/feature_attributes.js)).  

We assume that feature IDs are set on each geometry object, rather than contained within properties on each geometry 
(this creates smaller, less ambiguous files).  

See [`/tools/set_topojson_ids.py`](https://github.com/consbio/leaflet-quickstart/blob/master/tools/set_topojson_ids.py) for a Python script that does this.


If much larger features layers are required, a different approach is necessary.  
* [geojson-vt](https://github.com/mapbox/geojson-vt)
* [Leaflet.UTFGrid](https://github.com/consbio/Leaflet.UTFGrid)

Pre-rendering to tiles using `mapnik`, and hosting on AWS S3 is also an option where interaction is not required and
styling is not updated dynamically.



### Attributes / Properties:

Attributes are usually stored in a CSV file, and loaded dynamically with D3.

Generally, we use either `arcpy` or `Fiona` to process spatial data and attributes, and create the input CSVs. 

We use a variety of encodings to deal with one-to-many relationships (usually pipe-delimited dictionary fields) and 
large blocks of repeated text (look back encoding) or bitsets (encodes presence / absence within a series of attributes).  

TODO: Some of these need to be cleaned up, generalized, and pulled into this project.


## JavaScript

### Dependencies:
Place minified files in `/deps`  (make sure to note version number someplace).

If installing via npm or bower, just move the minified version here and get rid of folder structure created by those tools. 

Good ones to include, depending on need:
* [crossfilter](http://square.github.io/crossfilter/)
* [dcjs](http://dc-js.github.io/dc.js/)
* [lodash](https://lodash.com/)
* [nvd3](http://nvd3.org/)

### Documentation
For generally applicable functionality, we are trying to use [JSDoc](http://usejsdoc.org/).  See [`/static/utils.js`](https://github.com/consbio/leaflet-quickstart/blob/master/static/utils.js) for
examples.


## CSS

Use hyphens where necessary, with modifier / adjective part last.  E.g., `button-red`

Group related classes / subclasses together, from most general to most specific.  No lines between these.

Separate independent things by one line.

Add comments for logical groups of properties, based on application (e.g., `/* Leaflet overrides */`)


## Deployment

Always minify JS and CSS before deploying production versions.  Existing small projects use Jake.
TODO: add example Jake file here.

All static resources that can be compressed via `gzip` should be compressed.

See [`/tools/create_version.py`](https://github.com/consbio/leaflet-quickstart/blob/master/tools/create_version.py) for a Python tool that pulls out static resources and pushes them into a version ready for
deployment.  (TODO: this needs to be completely overhauled and likely rolled into the following).

See [`/tools/deploy`](https://github.com/consbio/leaflet-quickstart/blob/master/tools/deploy.py) for a Python command-line tool that pushes a defined version to AWS S3.  It requires a `deploy_settings.py` file
with the following global variables:

```
S3_ACCESS_KEY = '<key>'
S3_SECRET_KEY = '<secret key>'
S3_BUCKET_NAME = '<the bucket name>'
ROOT_DIR = '<root directory within bucket, e.g., application name>'
```


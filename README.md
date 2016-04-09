# Leaflet - Quickstart
This project is intended to make it easier to start up a new mapping application
using Leaflet.

See the [style guide](https://github.com/consbio/leaflet-quickstart/blob/master/docs/style_guide.md) to use for developing these applications.


## Intended audience
Software developers with the Conservation Biology Institute, developing client-facing 
mapping applications.


## Work in progress!
Pretty much anything is subject to change at this point.

## Setup

Run `npm install` to pull down required dependencies after you checkout this project.



## Build process

This project uses Gulp to minify and concatenate CSS and JS files.

Run `gulp build` to run the build, which produces artifacts in `static/dist`.

Run `gulp` to run gulp watch and update built files after you change the sources.



## Core Dependencies
* Leaflet (1.0b2)
* Leaflet Omnivore
* D3
* Lodash
* Font Awesome
* [Leaflet.ZoomBox](https://github.com/consbio/Leaflet.ZoomBox)
* [Leaflet.Geonames](https://github.com/consbio/Leaflet.Geonames)
* [Leaflet.Basemaps](https://github.com/consbio/Leaflet.Basemaps)

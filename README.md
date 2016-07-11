# CCS Tool
### CartoDB Color Scales Tool

Cook here your color scales, playing with different color ramps, quantification methods, etc.

Just choose one of your CartoDB maps as test bed, and play. This tool lets you check how your color scale performs with your real data and generates the desired \*\*\*\*\*CSS, so you can copy&paste it to CartoDB editor and generate the desired **choropleth**.

![img](http://storage8.static.itmages.com/i/16/0408/h_1460147194_2770683_744e85779a.png)

Test it at

### http://cartodb.github.io/labs-colorscales/



## NOTES

* Colors not supported as of today:
 * [Octarine](http://wiki.lspace.org/mediawiki/Octarine)
 * [Infra-black](http://wiki.lspace.org/mediawiki/Infra-black)
* The preloaded dataset is the **Spain Census 2011** and [this](http://www.ine.es/censos2011_datos/indicadores_seccen_rejilla.xls) is the list of the available fields there and their description. V.g.: `t1_1` is the population per census tract.
* Only numeric fields!!

## CHANGELOG

#### v 0.19
* Readded Jenks

#### v 0.18
* Updated Cartocolors to v 2.0.2

#### v 0.17
* Fixed [issue #27](https://github.com/CartoDB/labs-colorscales/issues/27)
* Added shareable URL!!! [issue #26](https://github.com/CartoDB/labs-colorscales/issues/26). Available parameters:
  * scalename: CartoColor scale name
  * viz: url to the viz.json, escaped
  * layername: name of the layer to study
  * fieldname: field to study
  * fieldtype: geometry type to style
  * flip: true to flip the scale
  * scale: hex color list, escaped (ignored if the scalename is set)
  * steps: num of buckets
  * bezier: true to enable
  * luminfix: true to enable
  * ramp: index of the selected ramp (0:original, 1:interpolated, 2:log-start, 3:log-end, 4:log-center, 5:log-poi, 6:n-tiles, 7:jenks, 9:stddev)


#### v 0.16
* Added autocomplete for layers and fields
* Fixed layers with spaces in their names
* Fixed the "double map" issue
* Evil things
* Minor fixes

#### v 0.15
* Updated DI & CartoColor libs
* Check field type

#### v 0.14
* Updated DI & CartoColor libs
* Fixed some issues with maps that already have widgets
* Improved performance

#### v 0.13
* Removed orphan dependencies
* Updated CartoColor #20
* Improved CartoColor selector

#### v 0.12
* Added tweaked styling for markers #18

#### v 0.11
* Added "Flip" scale function #14
* Added tweaked styling for polygons #16
* Minor fixes


#### v 0.10
* Added CartoColor by [@makella](https://github.com/makella)
* Removed **Ckmeans.1d.dp** due to really low performance on large datasets. Its result was pretty close to Jenks, anyway.

#### v 0.9
* Fixed some styling

#### v 0.8
* New quantification method: [Ckmeans.1d.dp](https://journal.r-project.org/archive/2011-2/RJournal_2011-2_Wang+Song.pdf)

#### v 0.7
* **Rewrote from scratch**: code cleaning and optimization to allow future improvements and new features
* Histogram of the selected data field
* Lightness correction crashed everything in some cases
* Add support to bezier interpolation for original scales larger than 5 colors
* Huge performance improvement
* Lots of styling tweaks
* Minor fixes

#### v 0.6
* minor fixes

#### v 0.5
* Use color ramp as variables in cartocss
* Color tooltips
* Display interpolated scale values
* Display layer query
* Minor fixes

#### v 0.4.1
* Minor fixes

#### v 0.4
* New scales:
    * n-tiles
    * Jenks
    * StdDevs
* loaders
* Minor fixes

#### v 0.3
* Params guessing:
    * layer owner
    * min, max and POI (Point Of Interest, distribution mode by default) from the layer query
    * geometry type
* Syntax hightlighted CartoCSS
* Minor fixes

## TO-DOs

* Add different color spaces as options
* Add Turbo\*\*\*\*\*css support
* Add categories support
* Have a beer

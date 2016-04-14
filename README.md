# CCS Tool
### CartoDB Color Scales Tool

Cook here your color scales, playing with different color ramps, quantification methods, etc.

Just choose one of your CartoDB maps as test bed, and play. This tool lets you check how your color scale performs with your real data and generates the desired \*\*\*\*\*CSS, so you can copy&paste it to CartoDB editor.

![img](http://storage8.static.itmages.com/i/16/0408/h_1460147194_2770683_744e85779a.png)

Test it at

### http://cartodb.github.io/labs-colorscales/



## NOTES

* Colors not supported as of today:
 * [Octarine](http://wiki.lspace.org/mediawiki/Octarine)
 * [Infra-black](http://wiki.lspace.org/mediawiki/Infra-black)
* The preloaded dataset is the **Spain Census 2011** and [this](http://www.ine.es/censos2011_datos/indicadores_seccen_rejilla.xls) is the list of the available fields there and their description. V.g.: `t1_1` is the population per census tract.

## CHANGELOG

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
* Have a beer

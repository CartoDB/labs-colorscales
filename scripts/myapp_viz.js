// viz url
// 'https://team.cartodb.com/u/abel/api/v2/viz/777fd3f2-98d6-11e5-838e-0e3ff518bd15/viz.json';

(function () {

    window.toyota = window.toyota || {};
    window.toyota.viz =
        {
            "id": "7db785d2-9a96-11e5-a2fd-04013fc66a01",
            "version": "0.1.0",
            "likes": 0,
            "scrollwheel": true,
            "legends": true,
            "url": null,
            "map_provider": "leaflet",
            "bounds": [[22.755920681486405, -127.79296875], [49.809631563563094, -66.6650390625]],
            "center": "[37.49229399862877, -97.22900390625]",
            "zoom": 5,
            "updated_at": "2015-12-07T16:18:02+00:00",
            "layers": [
                {
                    "options": {
                        "type": "Plain",
                        "base_type": "plain",
                        "className": "plain",
                        "color": "#f5f5f5",
                        "image": "",
                        "urlTemplate": "",
                        "maxZoom": 32,
                        "id": "4644c0fb-47c8-400b-a80c-38c6987cb0a9",
                        "order": 0
                    },
                    "infowindow": null,
                    "tooltip": null,
                    "id": "c246f17e-e309-4a75-90f7-d3a784676292",
                    "order": 0,
                    "type": "background"
                },
                {
                    "type": "layergroup",
                    "options":
                    {
                        "user_name": "solutions-ded02",
                        "maps_api_template": "https://{user}.cartodb-staging.com:443",
                        "layer_definition": {
                            "stat_tag": "7db785d2-9a96-11e5-a2fd-04013fc66a01",
                            "version": "1.0.1",
                            "layers": [
                                { // states
                                    "id": "0ccffce1-7046-4e1f-b83a-532c68908145",
                                    "type": "CartoDB",
                                    "infowindow": {
                                        "fields": [],
                                        "template_name": "table/views/infowindow_light",
                                        "template": "<div class=\"cartodb-popup v2\">\n  <a href=\"#close\" class=\"cartodb-popup-close-button close\">x</a>\n  <div class=\"cartodb-popup-content-wrapper\">\n    <div class=\"cartodb-popup-content\">\n      {{#content.fields}}\n        {{#title}}<h4>{{title}}</h4>{{/title}}\n        {{#value}}\n          <p {{#type}}class=\"{{ type }}\"{{/type}}>{{{ value }}}</p>\n        {{/value}}\n        {{^value}}\n          <p class=\"empty\">null</p>\n        {{/value}}\n      {{/content.fields}}\n    </div>\n  </div>\n  <div class=\"cartodb-popup-tip-container\"></div>\n</div>\n",
                                        "alternative_names": {},
                                        "width": 226,
                                        "maxHeight": 180
                                    },
                                    "tooltip": {
                                        "fields": [],
                                        "template_name": "tooltip_light",
                                        "template": "<div class=\"cartodb-tooltip-content-wrapper\">\n  <div class=\"cartodb-tooltip-content\">\n  {{#fields}}\n    {{#title}}\n    <h4>{{title}}</h4>\n    {{/title}}\n    <p>{{{ value }}}</p>\n  {{/fields}}\n  </div>\n</div>",
                                        "alternative_names": {},
                                        "maxHeight": 180
                                    },
                                    "legend": {
                                        "type": "none",
                                        "show_title": false,
                                        "title": "",
                                        "template": "",
                                        "visible": true
                                    },
                                    "order": 0,
                                    "visible": true,
                                    "options": {
                                        "sql": "select * from ne_50m_admin_1_states",
                                        "layer_name": "ne_50m_admin_1_states",
                                        "cartocss": "/** simple visualization */#ne_50m_admin_1_states{ polygon-fill: #FFFFFF; polygon-opacity: 1; line-color: #cccccc; line-width: 1; line-opacity: 0.6;}",
                                        "cartocss_version": "2.1.1",
                                        "interactivity": "cartodb_id",
                                        "table_name": "\"\"."
                                    }
                                    }, // 0 states
                                { // ZIP zones
                                    "id": "653d5ee0-3e17-4a24-9015-d079bf5dc6be",
                                    "type": "CartoDB",
                                    "interactivity": "cartodb_id",
                                    "infowindow": {
                                        "fields": [],
                                        "template_name": "table/views/infowindow_light",
                                        "template": "<div class=\"cartodb-popup v2\">\n  <a href=\"#close\" class=\"cartodb-popup-close-button close\">x</a>\n  <div class=\"cartodb-popup-content-wrapper\">\n    <div class=\"cartodb-popup-content\">\n      {{#content.fields}}\n        {{#title}}<h4>{{title}}</h4>{{/title}}\n        {{#value}}\n          <p {{#type}}class=\"{{ type }}\"{{/type}}>{{{ value }}}</p>\n        {{/value}}\n        {{^value}}\n          <p class=\"empty\">null</p>\n        {{/value}}\n      {{/content.fields}}\n    </div>\n  </div>\n  <div class=\"cartodb-popup-tip-container\"></div>\n</div>\n",
                                        "alternative_names": {
                                            "zcta5ce10": "ZIP code"
                                        },
                                        "width": 226,
                                        "maxHeight": 180
                                    },
                                    "tooltip": {
                                        "fields": [],
                                        "template_name": "tooltip_light",
                                        "template": "<div class=\"cartodb-tooltip-content-wrapper\">\n  <div class=\"cartodb-tooltip-content\">\n  {{#fields}}\n    {{#title}}\n    <h4>{{title}}</h4>\n    {{/title}}\n    <p>{{{ value }}}</p>\n  {{/fields}}\n  </div>\n</div>",
                                        "alternative_names": {},
                                        "maxHeight": 180
                                    },
                                    "leyend": {
                                        "type": "custom",
                                        "show_title": false,
                                        "title": "",
                                        "template": "<div class='cartodb-legend choropleth'>\t\n<div class=\"legend-title\">Leads per zip code</div>\n<ul>\n\t<li class=\"min\">\n\t\t3.00\n\t</li>\n\t<li class=\"max\">\n\t\t40.00\n\t</li>\n\t<li class=\"graph count_441\">\n\t<div class=\"colors\">\n\t<div class=\"quartile\" style=\"background-color:#0C2C84\"></div>\n\t<div class=\"quartile\" style=\"background-color:#225EA8\"></div>\n\t<div class=\"quartile\" style=\"background-color:#1D91C0\"></div>\n\t<div class=\"quartile\" style=\"background-color:#41B6C4\"></div>\n\t<div class=\"quartile\" style=\"background-color:#7FCDBB\"></div>\n\t<div class=\"quartile\" style=\"background-color:#C7E9B4\"></div>\n\t<div class=\"quartile\" style=\"background-color:#FFFFCC\"></div>\n\t</div>\n\t</li>\n</ul>\n</div>",
                                        "visible": true,
                                        "items": [{
                                            "name": "Untitled",
                                            "visible": true,
                                            "value": "#cccccc",
                                            "sync": true
                                    }]
                                    },
                                    "order": 1,
                                    "visible": true,
                                    "options": {
                                        "sql": "SELECT * FROM toyota_zips",
                                        "layer_name": "ZIP Codes",
                                        "cartocss": "/** choropleth visualization */#untitled_table{ polygon-fill: #F7F7F7; polygon-opacity: 0; line-color: #bdbdbd; line-width: 0.25; line-opacity: 0.15;}#untitled_table [zoom >= 6]{ polygon-opacity: 0.7; line-opacity: .3; [ leads <= 40] { polygon-fill: #4a90e2; } [ leads <= 33] { polygon-fill: lighten(#4a90e2, 10); } [ leads <= 24] { polygon-fill: lighten(#4a90e2, 15); } [ leads <= 18] { polygon-fill: lighten(#4a90e2, 20); } [ leads <= 11] { polygon-fill: lighten(#4a90e2, 25); } [ leads <= 8] { polygon-fill: lighten(#4a90e2, 30); } [ leads <= 4] { polygon-fill: lighten(#4a90e2, 35); } [ leads = 0] { polygon-opacity: 0; }}[zoom >= 8]{line-width: 1;}",
                                        "cartocss_version": "2.1.1",
                                        "table_name": "\"\"."
                                    }
                                        }, // 1 ZIP zones
                                { //Trade areas
                                    "id": "7c4c465a-d2f9-4c89-b33c-82f0b21f6067",
                                    "type": "CartoDB",
                                    "interactivity": "cartodb_id",
                                    "infowindow": {
                                        "fields": [],
                                        "template_name": "table/views/infowindow_light",
                                        "template": "<div class=\"cartodb-popup v2\">\n  <a href=\"#close\" class=\"cartodb-popup-close-button close\">x</a>\n  <div class=\"cartodb-popup-content-wrapper\">\n    <div class=\"cartodb-popup-content\">\n      {{#content.fields}}\n        {{#title}}<h4>{{title}}</h4>{{/title}}\n        {{#value}}\n          <p {{#type}}class=\"{{ type }}\"{{/type}}>{{{ value }}}</p>\n        {{/value}}\n        {{^value}}\n          <p class=\"empty\">null</p>\n        {{/value}}\n      {{/content.fields}}\n    </div>\n  </div>\n  <div class=\"cartodb-popup-tip-container\"></div>\n</div>\n",
                                        "alternative_names": {},
                                        "width": 226,
                                        "maxHeight": 180
                                    },
                                    "tooltip": {
                                        "fields": [],
                                        "template_name": "tooltip_light",
                                        "template": "<div class=\"cartodb-tooltip-content-wrapper\">\n  <div class=\"cartodb-tooltip-content\">\n  {{#fields}}\n    {{#title}}\n    <h4>{{title}}</h4>\n    {{/title}}\n    <p>{{{ value }}}</p>\n  {{/fields}}\n  </div>\n</div>",
                                        "alternative_names": {},
                                        "maxHeight": 180
                                    },
                                    "leyend": {
                                        "type": "custom",
                                        "show_title": false,
                                        "title": "",
                                        "template": "<div class='cartodb-legend choropleth'>\t\n<div class=\"legend-title\">Dealer gravity</div>\n\n\n\n<ul>\n\t\n\t\n\t\n\t<li class=\"min\">\n\n\n\n\t0\n\t\n\t\n\t\n\t</li>\n\t\n\t\n\t\n\t<li class=\"max\">\n\n\n\n\t\t100\n\t\n\t\n\t\n\t</li>\n\t\n\t\n\t\n\t<li class=\"graph count_441\">\n\n\n\n\t<div class=\"colors\">\n<div class=\"quartile\" style=\"background-color:#0F3B82\"></div>    \n\t<div class=\"quartile\" style=\"background-color:#0080ff\"></div>\n\t<div class=\"quartile\" style=\"background-color:#40a0ff\"></div>\n\t<div class=\"quartile\" style=\"background-color:#7fbfff\"></div>\n\t<div class=\"quartile\" style=\"background-color:#fff2cc\"></div>\n\t<div class=\"quartile\" style=\"background-color:#ffa6a6\"></div>\n\t<div class=\"quartile\" style=\"background-color:#ff7a7a\"></div>\n\t<div class=\"quartile\" style=\"background-color:#ff4d4d\"></div>\n\t</div>\n\t\n\t\n\t\n\t</li>\n\n\n\n</ul>\n\n\n\n</div>",
                                        "visible": true,
                                        "items": [{
                                            "name": "Untitled",
                                            "visible": true,
                                            "value": "#cccccc",
                                            "sync": true
                                    }]
                                    },
                                    "order": 2,
                                    "visible": true,
                                    "options": {
                                        "sql": "SELECT * FROM toyota_tradeareas",
                                        "layer_name": "Trade areas",
                                        "cartocss": "/** choropleth visualization */@1: #2b2d42;@2: #555768;@3: #6a6c7a;@4: #80818e;@5: #9596a0;@6: #aaabb3;@7: #bfc0c6;#toyota_voro_zip{ polygon-fill: #2b2d42; polygon-opacity: .2; line-color: #cccccc; line-width: 1; line-opacity: 0.3;}#toyota_voro_zip [ deals <= 0] { polygon-opacity: 0;}#toyota_voro_zip [ gravity <= 100] { polygon-fill: @1;}#toyota_voro_zip [ gravity <= 86.36363636363636] { polygon-fill: @2;}#toyota_voro_zip [ gravity <= 71.42857142857143] { polygon-fill: @3;}#toyota_voro_zip [ gravity <= 61.111111111111114] { polygon-fill: @4;}#toyota_voro_zip [ gravity <= 46.51162790697674] { polygon-fill: @5;}#toyota_voro_zip [ gravity <= 32.142857142857146] { polygon-fill: @6;}#toyota_voro_zip [ gravity <= 17.24137931034483] { polygon-fill: @7; [deals = null]{ polygon-fill: #fff; polygon-opacity:1; }}",
                                        "cartocss_version": "2.1.1",
                                        "table_name": "\"\"."
                                    }
                                        }, // 2 Trade areas
                                { // Deals per ZIP code
                                    "id": "d450ff5e-f98d-4047-989f-676539bc6a2f",
                                    "type": "CartoDB",
                                    "interactivity": "cartodb_id,aleads,cleads,dealer,leadpercent,postalcode",
                                    "infowindow": {
                                        "fields": [],
                                        "template_name": "table/views/infowindow_light",
                                        "template": "<div class=\"cartodb-popup v2\">\n  <a href=\"#close\" class=\"cartodb-popup-close-button close\">x</a>\n  <div class=\"cartodb-popup-content-wrapper\">\n    <div class=\"cartodb-popup-content\">\n      {{#content.fields}}\n        {{#title}}<h4>{{title}}</h4>{{/title}}\n        {{#value}}\n          <p {{#type}}class=\"{{ type }}\"{{/type}}>{{{ value }}}</p>\n        {{/value}}\n        {{^value}}\n          <p class=\"empty\">null</p>\n        {{/value}}\n      {{/content.fields}}\n    </div>\n  </div>\n  <div class=\"cartodb-popup-tip-container\"></div>\n</div>\n",
                                        "alternative_names": {},
                                        "width": 226,
                                        "maxHeight": 180
                                    },
                                    "tooltip": {
                                        "fields": [{
                                            "position": 0,
                                            "name": "aleads",
                                            "title": true
                                    }, {
                                            "position": 1,
                                            "name": "cleads",
                                            "title": true
                                    }, {
                                            "position": 2,
                                            "name": "dealer",
                                            "title": true
                                    }, {
                                            "position": 3,
                                            "name": "leadpercent",
                                            "title": true
                                    }, {
                                            "position": 4,
                                            "name": "postalcode",
                                            "title": true
                                    }],
                                        "template_name": "",
                                        "template": "<div class=\"cartodb-tooltip-content-wrapper\">\n  <div class=\"cartodb-tooltip-content\">\n    <p><b>{{cleads}}</b> leads out of <b>{{aleads}}</b> ({{leadpercent}}%)<br>go from ZIP code<b> {{postalcode}}</b><br>to dealer <b>{{dealer}}</b></p>\n  </div>\n</div>",
                                        "alternative_names": {},
                                        "maxHeight": 180
                                    },
                                    "legend": {
                                        "type": "custom",
                                        "show_title": false,
                                        "title": "",
                                        "template": "<div class='cartodb-legend choropleth'>\t\n<div class=\"legend-title\">Leads distribution</div>\n<ul>\n\t<li class=\"min\">\n\t\t14.00\n\t</li>\n\t<li class=\"max\">\n\t\t100.00\n\t</li>\n\t<li class=\"graph count_441\">\n\t<div class=\"colors\">\n\t<div class=\"quartile\" style=\"background-color:#F1EEF6\"></div>\n\t<div class=\"quartile\" style=\"background-color:#D4B9DA\"></div>\n\t<div class=\"quartile\" style=\"background-color:#C994C7\"></div>\n\t<div class=\"quartile\" style=\"background-color:#DF65B0\"></div>\n\t<div class=\"quartile\" style=\"background-color:#E7298A\"></div>\n\t<div class=\"quartile\" style=\"background-color:#CE1256\"></div>\n\t<div class=\"quartile\" style=\"background-color:#91003F\"></div>\n\t</div>\n\t</li>\n</ul>\n</div>",
                                        "visible": true,
                                        "items": []
                                    },
                                    "order": 3,
                                    "visible": true,
                                    "options": {
                                        "sql": "SELECT * FROM toyota_dealsperzip",
                                        "layer_name": "Deals per ZIP code",
                                        "cartocss": "/** choropleth visualization */#untitled_table{ polygon-opacity: 0; line-color: #4a90e2; line-width: 0.5; line-opacity: 0.8; [leadpercent <= 100] { line-color:#4a90e2; line-width: 1.5; } [leadpercent <= 75] { line-color: lighten(#4a90e2, 10); line-width: 1.3; } [leadpercent <= 60] { line-color: lighten(#4a90e2, 15); line-width: 1.1; } [leadpercent <= 40] { line-color: lighten(#4a90e2, 20); line-width: .9; } [leadpercent <= 33] { line-color: lighten(#4a90e2, 25); line-width: .7; } [leadpercent <= 14] { line-color: lighten(#4a90e2, 30); line-width: .5; } }",
                                        "cartocss_version": "2.1.1",
                                        "table_name": "\"\"."
                                    }
                                        }, // 3 Deals per ZIP code
                                { // Toyota dealers
                                    "id": "7ac9d31a-40bc-49ed-acc0-37f167b0fe3b",
                                    "type": "CartoDB",
                                    "interactivity": "cartodb_id,dealeraddr,dealercode,dealername,leads,regionname",
                                    "infowindow": {
                                        "fields": [],
                                        "template_name": "table/views/infowindow_light",
                                        "template": "<div class=\"cartodb-popup v2\">\n  <a href=\"#close\" class=\"cartodb-popup-close-button close\">x</a>\n  <div class=\"cartodb-popup-content-wrapper\">\n    <div class=\"cartodb-popup-content\">\n      {{#content.fields}}\n        {{#title}}<h4>{{title}}</h4>{{/title}}\n        {{#value}}\n          <p {{#type}}class=\"{{ type }}\"{{/type}}>{{{ value }}}</p>\n        {{/value}}\n        {{^value}}\n          <p class=\"empty\">null</p>\n        {{/value}}\n      {{/content.fields}}\n    </div>\n  </div>\n  <div class=\"cartodb-popup-tip-container\"></div>\n</div>\n",
                                        "alternative_names": {},
                                        "width": 226,
                                        "maxHeight": 180
                                    },
                                    "tooltip": {
                                        "fields": [{
                                            "position": 1.7976931348623157e+308,
                                            "name": "dealeraddr",
                                            "title": true
                                    }, {
                                            "position": 1.7976931348623157e+308,
                                            "name": "dealercode",
                                            "title": true
                                    }, {
                                            "position": 1.7976931348623157e+308,
                                            "name": "dealername",
                                            "title": true
                                    }, {
                                            "position": 1.7976931348623157e+308,
                                            "name": "leads",
                                            "title": true
                                    }, {
                                            "position": 1.7976931348623157e+308,
                                            "name": "regionname",
                                            "title": true
                                    }],
                                        "template_name": "",
                                        "template": "<div class=\"cartodb-tooltip-content-wrapper\">\n  <div class=\"cartodb-tooltip-content\">\n    <p><b>{{dealername}}</b></p>\n    <p>{{dealercode}} ({{regionname}})</p>    \n    <h4>Postal code</h4>\n    <p>{{dealeraddr}}</p>\n    <h4>Leads</h4>\n    <p>{{leads}}</p>\n  </div>\n</div>",
                                        "alternative_names": {},
                                        "maxHeight": 180
                                    },
                                    "legend": {
                                        "type": "custom",
                                        "show_title": false,
                                        "title": "",
                                        "template": "<div class='cartodb-legend choropleth'>\t\n<div class=\"legend-title\">Leads per dealer</div>\n<ul>\n\t<li class=\"min\">\n\t\t0\n\t</li>\n\t<li class=\"max\">\n\t\t113\n\t</li>\n\t<li class=\"graph count_441\">\n\t<div class=\"colors\">\n\t<div class=\"quartile\" style=\"background-color:#FFFFB2\"></div>\n\t<div class=\"quartile\" style=\"background-color:#FED976\"></div>\n\t<div class=\"quartile\" style=\"background-color:#FEB24C\"></div>\n\t<div class=\"quartile\" style=\"background-color:#FD8D3C\"></div>\n\t<div class=\"quartile\" style=\"background-color:#FC4E2A\"></div>\n\t<div class=\"quartile\" style=\"background-color:#E31A1C\"></div>\n\t<div class=\"quartile\" style=\"background-color:#B10026\"></div>\n\t</div>\n\t</li>\n</ul>\n</div>",
                                        "visible": true,
                                        "items": []
                                    },
                                    "order": 4,
                                    "visible": true,
                                    "options": {
                                        "sql": "SELECT * FROM toyota_dealers_full",
                                        "layer_name": "Toyota dealers",
                                        "cartocss": "/** choropleth visualization */@value: 3;#toyota_dealers{ marker-fill-opacity: .8; marker-line-color: darken(#f11810, 30); marker-line-width: .25; marker-line-opacity: 1; marker-width: @value; marker-fill: #F11810; marker-allow-overlap: true; [leads <= 113] { marker-width: @value+6; } [leads <= 50] { marker-width: @value+5; } [leads <= 40] { marker-width: @value+4; } [leads <= 31] { marker-width: @value+3; } [leads <= 23] { marker-width: @value+2; } [leads <= 15] { marker-width: @value+1; } [leads <= 7] { marker-width: @value; } [zoom >= 6]{ [leads <= 113] { marker-width: @value+8; } [leads <= 50] { marker-width: @value+7; } [leads <= 40] { marker-width: @value+6; } [leads <= 31] { marker-width: @value+5; } [leads <= 23] { marker-width: @value+4; } [leads <= 15] { marker-width: @value+3; } [leads <= 7] { marker-width: @value+2; } } [zoom >= 8]{ marker-line-width: .5; [leads <= 113] { marker-width: @value+10; } [leads <= 50] { marker-width: @value+9; } [leads <= 40] { marker-width: @value+8; } [leads <= 31] { marker-width: @value+7; } [leads <= 23] { marker-width: @value+6; } [leads <= 15] { marker-width: @value+5; } [leads <= 7] { marker-width: @value+4; } }}",
                                        "cartocss_version": "2.1.1",
                                        "table_name": "\"\"."
                                    }
                                        }, // 4 Toyota dealers

                              /* {
                                    "options": {
                                        "default": "true",
                                        "url": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                                        "subdomains": "abcd",
                                        "minZoom": "0",
                                        "maxZoom": "18",
                                        "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
                                        "urlTemplate": "http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
                                        "type": "Tiled",
                                        "name": "Positron Labels"
                                    },
                                    "infowindow": null,
                                    "tooltip": null,
                                    "id": "fd7bbbe2-83dd-49ad-a47f-c2325ae483d7",
                                    "order": 6,
                                    "type": "tiled",
                                    "visible": true,
                                } // 6 labels */

                                { // labels
                                    "id": "0ccffce1-7046-4e1f-b83a-532c68908149",
                                    "type": "CartoDB",
                                    "infowindow": {
                                        "fields": [],
                                        "template_name": "table/views/infowindow_light",
                                        "template": "<div class=\"cartodb-popup v2\">\n  <a href=\"#close\" class=\"cartodb-popup-close-button close\">x</a>\n  <div class=\"cartodb-popup-content-wrapper\">\n    <div class=\"cartodb-popup-content\">\n      {{#content.fields}}\n        {{#title}}<h4>{{title}}</h4>{{/title}}\n        {{#value}}\n          <p {{#type}}class=\"{{ type }}\"{{/type}}>{{{ value }}}</p>\n        {{/value}}\n        {{^value}}\n          <p class=\"empty\">null</p>\n        {{/value}}\n      {{/content.fields}}\n    </div>\n  </div>\n  <div class=\"cartodb-popup-tip-container\"></div>\n</div>\n",
                                        "alternative_names": {},
                                        "width": 226,
                                        "maxHeight": 180
                                    },
                                    "tooltip": {
                                        "fields": [],
                                        "template_name": "tooltip_light",
                                        "template": "<div class=\"cartodb-tooltip-content-wrapper\">\n  <div class=\"cartodb-tooltip-content\">\n  {{#fields}}\n    {{#title}}\n    <h4>{{title}}</h4>\n    {{/title}}\n    <p>{{{ value }}}</p>\n  {{/fields}}\n  </div>\n</div>",
                                        "alternative_names": {},
                                        "maxHeight": 180
                                    },
                                    "legend": {
                                        "type": "none",
                                        "show_title": false,
                                        "title": "",
                                        "template": "",
                                        "visible": true
                                    },
                                    "order": 5,
                                    "visible": true,
                                    "options": {
                                        "sql": "select * from ne_50m_admin_1_states",
                                        "layer_name": "labels",
                                        "cartocss": "#ne_50m_admin_1_states{ polygon-fill: #FF6600; polygon-opacity: 0; line-color: #FFF; line-width: 0; line-opacity: 1;}#ne_50m_admin_1_states::label{ text-name: [abbrev]; text-face-name: 'Lato Bold'; text-fill: #7F858E; text-size: 10; text-transform: uppercase; text-halo-fill: fadeout(#fff,70); text-halo-radius: 2; text-allow-overlap: true; [zoom = 6]{ text-fill: darken(#7F858E, 20); } [zoom >= 6][region!='Northeast'] { text-name: [name]; } [zoom >= 7] { text-size: 11; } [zoom >= 8] { text-size: 14; text-fill: darken(#7F858E, 40); }}",
                                        "cartocss_version": "2.1.1",
                                        "interactivity": "cartodb_id",
                                        "table_name": "\"\"."
                                    }
                                    } // 5 labels */

                                        ]
                        },
                        "attribution": 'abel'
                    }
                },
                { // torque leads
                    "id": "59e3e02b-50e6-4ef2-b15d-6498f3f54b17",
                    "type": "torque",
                    "stat_tag": "37ccdcfa-a4d4-11e5-bb49-04013fc66a01",
                    "sql_api_template": "http://{user}.cartodb-staging.com:80",
                    "tiler_protocol": "http",
                    "tiler_domain": "cartodb-staging.com",
                    "tiler_port": "80",
                    "sql_api_protocol": "http",
                    "sql_api_domain": "cartodb-staging.com",
                    "sql_api_endpoint": "/api/v2/sql",
                    "sql_api_port": 80,
                    "visible": true,
                    "user_name": "solutions-ded02",
                    "maps_api_template": "http://{user}.cartodb-staging.com:80",
                    "table_name": "toyota_leads",
                    "layer_name": "toyota_leads_t",
                    "order": 6,
                    "legend": {
                        "type": "category",
                        "show_title": false,
                        "title": "",
                        "template": "",
                        "visible": true,
                        "items": [{
                            "name": "4Runner",
                            "visible": true,
                            "value": "#A6CEE3"
}, {
                            "name": "Avalon",
                            "visible": true,
                            "value": "#1F78B4"
}, {
                            "name": "Camry",
                            "visible": true,
                            "value": "#B2DF8A"
}, {
                            "name": "Corolla",
                            "visible": true,
                            "value": "#33A02C"
}, {
                            "name": "Highlander",
                            "visible": true,
                            "value": "#FB9A99"
}, {
                            "name": "Prius",
                            "visible": true,
                            "value": "#850200"
}, {
                            "name": "RAV4",
                            "visible": true,
                            "value": "#FDBF6F"
}, {
                            "name": "Sienna",
                            "visible": true,
                            "value": "#FF7F00"
}, {
                            "name": "Tacoma",
                            "visible": true,
                            "value": "#CAB2D6"
}, {
                            "name": "Tundra",
                            "visible": true,
                            "value": "#6A3D9A"
}, {
                            "name": "Others",
                            "visible": true,
                            "value": "#cccccc"
}]
                    },
                    "options": {
                        "layer_name": "toyota_leads_t",
                        "table_name": "toyota_leads",
                        "cartocss": [
                            'Map {',
                                '-torque-frame-count:256;',
                                '-torque-animation-duration:30;',
                                '-torque-time-attribute:"moment";',
                                '-torque-aggregation-function:"CDB_Math_Mode(torque_category)";',
                                '-torque-resolution:1;',
                                '-torque-data-aggregation:linear;',
                            '}',
                            '#toyota_leads{ ',
                                'comp-op: xor;',
                                'marker-fill-opacity: 1;',
                                'marker-line-color: #FFF;',
                                'marker-line-width: 0;' ,
                                'marker-line-opacity: 1;',
                                'marker-type: ellipse;',
                                'marker-width: 4;' ,
                                'marker-fill: #0F3B82;',
                            '}',
                            '#toyota_leads[frame-offset=1] { marker-width:6; marker-fill-opacity:0.8; }',
                            '#toyota_leads[frame-offset=2] { marker-width:8; marker-fill-opacity:0.6; }',
                            '#toyota_leads[frame-offset=3] { marker-width:10; marker-fill-opacity:0.4; }',
                            '#toyota_leads[frame-offset=4] { marker-width:12; marker-fill-opacity:0.2; }',
                            '#toyota_leads[value=1] { marker-fill: #A6CEE3;}',
                            '#toyota_leads[value=2] { marker-fill: #1F78B4;}',
                            '#toyota_leads[value=3] { marker-fill: #B2DF8A;}',
                            '#toyota_leads[value=4] { marker-fill: #33A02C;}',
                            '#toyota_leads[value=5] { marker-fill: #FB9A99;}',
                            '#toyota_leads[value=6] { marker-fill: #E31A1C;}',
                            '#toyota_leads[value=7] { marker-fill: #FDBF6F;}',
                            '#toyota_leads[value=8] { marker-fill: #FF7F00;}',
                            '#toyota_leads[value=9] { marker-fill: #CAB2D6;}',
                            '#toyota_leads[value=10] { marker-fill: #6A3D9A;}',
                            '#toyota_leads { marker-fill: #cccccc;}'
                        ].join(''),
                        "cartocss_version": "2.1.1",
                        "force_cors": true,
                        "query": "select *, extract(epoch from eventdate) AS moment, (CASE WHEN \"vehiclemodel\" = '4Runner' THEN 1 WHEN \"vehiclemodel\" = 'Avalon' THEN 2 WHEN \"vehiclemodel\" = 'Camry' THEN 3 WHEN \"vehiclemodel\" = 'Corolla' THEN 4 WHEN \"vehiclemodel\" = 'Highlander' THEN 5 WHEN \"vehiclemodel\" = 'Prius' THEN 6 WHEN \"vehiclemodel\" = 'RAV4' THEN 7 WHEN \"vehiclemodel\" = 'Sienna' THEN 8 WHEN \"vehiclemodel\" = 'Tacoma' THEN 9 WHEN \"vehiclemodel\" = 'Tundra' THEN 10 ELSE 11 END) as torque_category FROM toyota_leads",
                        "sql": "select *, extract(epoch from eventdate) AS moment, (CASE WHEN \"vehiclemodel\" = '4Runner' THEN 1 WHEN \"vehiclemodel\" = 'Avalon' THEN 2 WHEN \"vehiclemodel\" = 'Camry' THEN 3 WHEN \"vehiclemodel\" = 'Corolla' THEN 4 WHEN \"vehiclemodel\" = 'Highlander' THEN 5 WHEN \"vehiclemodel\" = 'Prius' THEN 6 WHEN \"vehiclemodel\" = 'RAV4' THEN 7 WHEN \"vehiclemodel\" = 'Sienna' THEN 8 WHEN \"vehiclemodel\" = 'Tacoma' THEN 9 WHEN \"vehiclemodel\" = 'Tundra' THEN 10 ELSE 11 END) as torque_category FROM toyota_leads",
                        "interactivity": "cartodb_id, torque_category, moment",
                    }
                } // 5 torque leads */
            ],
            "overlays": [{
                    "type": "search",
                    "order": 3,
                    "options": {
                        "display": true,
                        "x": 60,
                        "y": 20
                    },
                    "template": ""
            }, {
                    "type": "zoom",
                    "order": 6,
                    "options": {
                        "display": true,
                        "x": 20,
                        "y": 20
                    },
                    "template": '<div class="CDB-Overlay">' +
                        '<button class="CDB-Zoom-action CDB-Zoom-action--out js-zoomOut"></button>' +
                        '<button class="CDB-Zoom-action CDB-Zoom-action--in js-zoomIn"></button>' +
                        '</div>' +
                        '<div class="CDB-Zoom-info js-zoomInfo">-</div>'
          },
                {
                    "type": "logo",
                    "order": 9,
                    "options": {
                        "display": true,
                        "x": 10,
                        "y": 40
                    },
                    "template": ""
            }],
            "prev": null,
            "next": null,
            "transition_options": {
                "time": 0
            }
        }

    ;


})();

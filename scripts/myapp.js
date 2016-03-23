'use strict';
(function () {

    window.myapp = window.myapp || {};

    var init = function () {
            window.myapp.fields = document.querySelector('.leftpanel').querySelectorAll('input');
            getScaleParams();
            calcLog();
            calcLin();
            buildScales();
            goMap();
            setEvents();
        },
        scaleindex = 0,
        getScaleParams = function () {
            try{
                window.myapp.params = {
                    scale: window.myapp.fields[3].value.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '').replace(/\s+/g, '').split(','),
                    steps: window.myapp.fields[4].value * 1,
                    min: window.myapp.fields[5].value * 1,
                    poi: window.myapp.fields[6].value * 1,
                    max: window.myapp.fields[7].value * 1,
                    bezier: window.myapp.fields[8].checked,
                    luminfix: window.myapp.fields[9].checked
                };
                return false;
            }catch(error){
                return true;
            }
        },
        calcLin = function () {
            var ramp = window.myapp.fields[4].value*1,
                step,
                steps = [];
            for (var b = 0; b < ramp; b++) {
                steps.push(b * 100 / (ramp - 1));
            }
            window.myapp.params.stepsLinear = steps;
        },
        calcLog = function () {
            var ramp = window.myapp.fields[4].value*1,
                step,
                steps = [];
            for (var b = 0; b < ramp; b++) {
                step = b * 100 / (ramp - 1);
                step = (step == 0) ? 0 : Math.log(step) * 100 / Math.log(100);
                steps.push(step);
            }
            window.myapp.params.stepsLog = steps;
        },
        buildScales = function(){
            // build scale
            // build luminance chart
        },
        setCSS = function () {
            // set layer css
            // format and write down css
        },
        goMap = function () {
            var viz = window.myapp.fields[0].value,
                layername = window.myapp.fields[1].value,
                fieldname = window.myapp.fields[2].value;
            cartodb.createVis('map', viz).done(function (vis, layers) {
                window.myapp.layer = layers.models.filter(function (a) {
                    return a.attributes.layer_name == layername;
                })[0];
                setCSS();
            });
        },
        setEvents = function () {
            // block 0
            window.myapp.fields[0].onkeyup = goMap;
            window.myapp.fields[1].onkeyup = goMap;
            window.myapp.fields[2].onkeyup = goMap;
            // block 1
            window.myapp.fields[3].onkeyup = function(){
                if (getScaleParams()) return;
                buildScales();
                setCSS();
            };
            window.myapp.fields[4].onchange = window.myapp.fields[4].onkeyup = function(){
                calcLin();
                calcLog();
                buildScales();
                setCSS();
            };
            // block 2
            indow.myapp.fields[5].onchange = window.myapp.fields[5].onkeyup = function(){
                if (getScaleParams()) return;
                buildScales();
                setCSS();
            };
            indow.myapp.fields[6].onchange = window.myapp.fields[6].onkeyup = function(){
                if (getScaleParams()) return;
                if (this.value<window.myapp.params.min || this.value> window.myapp.params.max){
                    alert('The POI value must be within the boundaries');
                    return;
                }
                buildScales();
                setCSS();
            };
            indow.myapp.fields[7].onchange = window.myapp.fields[7].onkeyup = function(){
                if (getScaleParams()) return;
                buildScales();
                setCSS();
            };
            // block 3
             cdb.$('input[type=checkbox]').on('change', function () {
                window.myap.params.bezier = document.querySelector('input[value=bezier]').checked;
                window.myap.params.luminfix = document.querySelector('input[value=luminfix]').checked;
                buildScales();
                setCSS()
             });
            // scales selection
            cdb.$('input[type=radio]').on('change', function () {
                scaleindex = document.querySelector('input[type=radio]:checked').value;
                setCSS();
            })
        };

    window.onload = init;

})();


/*

select ventas_08 as mode
from solutions.telepizza_locations_ventas_08_09_10
where ventas_08 is not null
group by 1
order by count(1) desc
limit 1

*/

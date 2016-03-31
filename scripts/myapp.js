'use strict';
(function () {

    window.myapp = window.myapp || {};

    var init = function () {
            window.myapp.fields = document.querySelector('.leftpanel').querySelectorAll('input');
            getScaleParams();
            getSQL();
            goMap(function () {
                getDataparams(function () {
                    getScaleParams();
                    buildScales();
                    setCSS(scaleindex);
                    setEvents();
                });
            });
        },
        scaleindex = 0,
        getScaleParams = function () {
            try {
                window.myapp.params = {
                    viz: window.myapp.fields[0].value,
                    layername: window.myapp.fields[1].value,
                    fieldname: window.myapp.fields[2].value,
                    fieldtype: document.querySelector('select').value,
                    scale: window.myapp.fields[3].value.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '').replace(/\s+/g, '').split(','),
                    steps: window.myapp.fields[4].value * 1,
                    min: window.myapp.fields[5].value * 1,
                    poi: window.myapp.fields[6].value * 1,
                    max: window.myapp.fields[7].value * 1,
                    bezier: window.myapp.fields[8].checked,
                    luminfix: window.myapp.fields[9].checked
                };
                logscale();
                return false;
            } catch (error) {
                return true;
            }
        },
        getSQL = function () {
            var viz = window.myapp.params.viz,
                i0 = (viz.indexOf('/u/') > 0) ? viz.indexOf('/u/') + 3 : viz.indexOf('://') + 3,
                i1 = (viz.indexOf('/u/') > 0) ? viz.indexOf('/', i0 + 3) : viz.indexOf('.cartodb.com/', i0);
            window.myapp.params.sql = new cartodb.SQL({
                user: viz.substring(i0, i1)
                    //user:'andrew'
            });
        },
        getDataparams = function (callback) {
            window.myapp.params.sql.execute('with b as(' + window.myapp.layer.attributes.sql + ') select GeometryType(the_geom_webmercator) as type from b limit 1').done(function (data) {
                var field = window.myapp.fields[2].value;
                document.querySelector('select').value = window.myapp.params.fieldtype;
                window.myapp.params.sql.execute('with a as(' + window.myapp.layer.attributes.sql + '), b as (select ' + field + '::integer as mo from a group by ' + field + '::integer order by count(*) desc limit 1), c as (select min(a.' + field + ') as mn, max(a.' + field + ') as mx from a) select * from b,c').done(function (data) {
                    window.myapp.fields[5].value = data.rows[0].mn;
                    window.myapp.fields[6].value = data.rows[0].mo;
                    window.myapp.fields[7].value = data.rows[0].mx;
                    callback();
                });
            })
        },
        calcLog = function (ramp) {
            var step,
                steps = [];
            for (var b = 0; b < ramp + 1; b++) {
                step = b * 100 / ramp;
                step = (step == 0) ? 0 : Math.log(step) * 100 / Math.log(100);
                steps.push(step);
            }
            return steps;
        },
        logscale = function () {
            window.myapp.params.stepsLog = calcLog(window.myapp.fields[4].value * 1);
        },
        buildScales = function () {
            try {
                var p = window.myapp.params,
                    layername = p.layername,
                    fieldname = p.fieldname,
                    fieldtype = p.fieldtype,
                    s = document.querySelectorAll('.scale'),
                    c = document.querySelectorAll('.chart'),
                    t,
                    d,
                    f,
                    tmp,
                    h0 = s[0].scrollHeight,
                    w0 = s[0].scrollWidth,
                    w,
                    colorscale = (p.bezier === true) ? chroma.bezier(p.scale).scale().mode('lab').correctLightness(p.luminfix) : chroma.scale(p.scale).mode('lab').correctLightness(p.luminfix),
                    colors = colorscale.colors(p.steps),
                    ramp0, ramp1, logscale, center,
                    cssheader = '#' + layername + '{\n	' + fieldtype + '-opacity: 1;';

                window.myapp.cartocss = [];
                //original:
                t = '';
                d = '';
                window.myapp.cartocss[0] = '/** Original scale */\n' + cssheader + '\n	' + fieldtype + '-fill: ' + p.scale[0] + ';';
                w = 100 / p.scale.length;
                f = 0;
                for (var i = 0; i < p.scale.length; i++) {
                    t += '<div style="height:' + h0 + 'px;width:' + w + '%;background:' + p.scale[i] + ';"></div>';
                    d += '<div class="chartblock" style="height:' + chroma(p.scale[i]).lab()[0] + 'px;width:' + w + '%;"></div>';
                    window.myapp.cartocss[0] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + p.scale[i] + ';\n       }';
                    f += w;
                }
                s[0].innerHTML = t;
                c[0].innerHTML = d;
                window.myapp.cartocss[0] += '\n}';

                //linear
                t = '';
                d = '';
                window.myapp.cartocss[1] = '/** Linear scale */\n' + cssheader + '\n        ' + fieldtype + '-fill: ' + colors[0] + ';';
                w = 100 / p.steps;
                f = 0;
                for (var i = 0; i < colors.length; i++) {
                    t += '<div style="height:' + h0 + 'px;width:' + w + '%;background:' + colors[i] + ';"></div>';
                    d += '<div class="chartblock" style="height:' + chroma(colors[i]).lab()[0] + 'px;width:' + w + '%;"></div>';
                    window.myapp.cartocss[1] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + colors[i] + ';\n        }';
                    f += w;
                }
                s[1].innerHTML = t;
                c[1].innerHTML = d;
                window.myapp.cartocss[1] += '\n}';

                //logstart
                t = '';
                d = '';
                f = 0;
                window.myapp.cartocss[2] = '/** Log start scale */\n' + cssheader + '\n        ' + fieldtype + '-fill: ' + colors[0] + ';';
                for (var i = 0; i < colors.length; i++) {
                    w = window.myapp.params.stepsLog[colors.length - i] - window.myapp.params.stepsLog[colors.length - i - 1];
                    t += '<div style="height:' + h0 + 'px;width:' + w + '%;background:' + colors[i] + ';"></div>';
                    d += '<div class="chartblock" style="height:' + chroma(colors[i]).lab()[0] + 'px;width:' + w + '%;"></div>';
                    window.myapp.cartocss[2] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + colors[i] + ';\n        }';
                    f += w;
                }
                s[2].innerHTML = t;
                c[2].innerHTML = d;
                window.myapp.cartocss[2] += '\n}';

                //logend
                t = '';
                d = '';
                f = 0;
                window.myapp.cartocss[3] = '/** Log end scale */\n' + cssheader + '\n         ' + fieldtype + '-fill: ' + colors[0] + ';';
                for (var i = 0; i < colors.length; i++) {
                    w = window.myapp.params.stepsLog[i + 1] - window.myapp.params.stepsLog[i];
                    t += '<div style="height:' + h0 + 'px;width:' + w + '%;background:' + colors[i] + ';"></div>';
                    d += '<div class="chartblock" style="height:' + chroma(colors[i]).lab()[0] + 'px;width:' + w + '%;"></div>';
                    window.myapp.cartocss[3] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + colors[i] + ';\n        }';
                    f += w;
                }
                s[3].innerHTML = t;
                c[3].innerHTML = d;
                window.myapp.cartocss[3] += '\n}';

                //log center
                t = '';
                d = '';
                f = 0;
                tmp = Math.floor(colors.length / 2);
                ramp0 = (colors.length % 2 == 0) ? colors.slice(0, tmp) : colors.slice(0, tmp + 1);
                ramp1 = colors.slice(tmp);
                logscale = calcLog(ramp0.length);
                window.myapp.cartocss[4] = '/** Log centered scale */\n' + cssheader + '\n	' + fieldtype + '-fill: ' + ramp0[0] + ';';
                for (var i = 0; i < ramp0.length; i++) {
                    w = logscale[i + 1] - logscale[i];
                    t += '<div style="height:' + h0 + 'px;width:' + w / 2 + '%;background:' + ramp0[i] + ';"></div>';
                    d += '<div class="chartblock" style="height:' + chroma(ramp0[i]).lab()[0] + 'px;width:' + w / 2 + '%;"></div>';
                    window.myapp.cartocss[4] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + ramp0[i] + ';\n         }';
                    f += w / 2;
                }
                for (var i = 0; i < ramp1.length; i++) {
                    w = logscale[ramp0.length - i] - logscale[ramp0.length - i - 1];
                    t += '<div style="height:' + h0 + 'px;width:' + w / 2 + '%;background:' + ramp1[i] + ';"></div>';
                        d += '<div class="chartblock" style="height:' + chroma(ramp1[i]).lab()[0] + 'px;width:' + w / 2 + '%;"></div>';
                        window.myapp.cartocss[4] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + ramp1[i] + ';\n         }';
                    f += w / 2;
                }
                s[4].innerHTML = t;
                c[4].innerHTML = d;
                window.myapp.cartocss[4] += '\n}';

                //log shifted
                t = '';
                d = '';
                f = 0;
                window.myapp.cartocss[5] = '/** Log shifted scale */\n' + cssheader + '\n	' + fieldtype + '-fill: ' + ramp0[0] + ';';
                center = (p.poi - p.min) / (p.max - p.min);
                for (var i = 0; i < ramp0.length; i++) {
                    w = logscale[i + 1] - logscale[i];
                    t += '<div style="height:' + h0 + 'px;width:' + w * center + '%;background:' + ramp0[i] + ';"></div>';
                    d += '<div class="chartblock" style="height:' + chroma(ramp0[i]).lab()[0] + 'px;width:' + w * center + '%;"></div>';
                    window.myapp.cartocss[5] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + ramp0[i] + ';\n         }';
                    f += w * center;
                }
                for (var i = 0; i < ramp1.length; i++) {
                    w = logscale[ramp0.length - i] - logscale[ramp0.length - i - 1];
                    t += '<div style="height:' + h0 + 'px;width:' + w * (1 - center) + '%;background:' + ramp1[i] + ';"></div>';
                    d += '<div class="chartblock" style="height:' + chroma(ramp1[i]).lab()[0] + 'px;width:' + w * (1 - center) + '%;"></div>';
                    window.myapp.cartocss[5] += '\n	[' + fieldname + '>' + (p.min + f * (p.max - p.min) / 100) + ']{\n		' + fieldtype + '-fill: ' + ramp1[i] + ';\n         }';
                    f += w * (1 - center);
                }
                s[5].innerHTML = t;
                c[5].innerHTML = d;
                window.myapp.cartocss[5] += '\n}';
                return false;
            } catch (error) {
                return true;
            }

        },
        setCSS = function (index) {
            var pre = cdb.L.DomUtil.create('pre','prettyprint lang-css'),
                escapeHtml = function (text) {
                var map = {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#039;'
                };
                return text.replace(/[&<>"']/g, function (m) {
                    return map[m];
                });
            }
            window.myapp.layer.set('cartocss', myapp.cartocss[index]);
            pre.id='cartocss';
            pre.innerHTML = escapeHtml(myapp.cartocss[index]);
            document.querySelector('.cartobox').innerHTML = '';
            document.querySelector('.cartobox').appendChild(pre);
            prettyPrint();
        },
        goMap = function (callback) {
            var p = window.myapp.params,
                viz = p.viz,
                layername = p.layername,
                fieldname = p.fieldname;
            cartodb.createVis('map', viz).done(function (vis, layers) {
                window.myapp.layer = layers.models.filter(function (a) {
                    return a.attributes.layer_name == layername;
                })[0];
                callback();
            });
        },
        changes = function () {
            if (getScaleParams()) return;
            if (buildScales()) return;
            setCSS(scaleindex);
        },
        setEvents = function () {
            // block 0
            window.myapp.fields[0].onkeyup = init;
            window.myapp.fields[1].onkeyup = init;
            window.myapp.fields[2].onkeyup = init;
            // block 1
            window.myapp.fields[3].onkeyup = changes;
            window.myapp.fields[4].onchange = window.myapp.fields[4].onkeyup = changes;
            // block 2
            window.myapp.fields[5].onchange = window.myapp.fields[5].onkeyup = changes;
            window.myapp.fields[6].onchange = window.myapp.fields[6].onkeyup = function () {
                if (getScaleParams()) return;
                if (this.value < window.myapp.params.min || this.value > window.myapp.params.max) {
                    alert('The POI value must be within the boundaries');
                    return;
                }
                if (buildScales()) return;
                setCSS(scaleindex);
            };
            window.myapp.fields[7].onchange = window.myapp.fields[7].onkeyup = changes;
            // block 3
            cdb.$('input[type=checkbox]').on('change', function () {
                window.myapp.params.bezier = document.querySelector('input[value=bezier]').checked;
                window.myapp.params.luminfix = document.querySelector('input[value=luminfix]').checked;
                if (buildScales()) return;
                setCSS(scaleindex);
            });
            // scales selection
            cdb.$('input[type=radio]').on('change', function () {
                scaleindex = document.querySelector('input[type=radio]:checked').value;
                setCSS(scaleindex);
            })
            cdb.$('select').on('change', changes);
        };

    window.onload = init;

})();

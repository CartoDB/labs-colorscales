/*


Si non confectus, non reficiat


*/
'use strict';
(function () {

    window.myapp = window.myapp || {};

    var getURLParameter = function (name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        },
        getInitParams = function () {
            var ff = window.myapp.fields,
                p = {
                    viz: decodeURIComponent(getURLParameter('viz')),
                    layername: getURLParameter('layername'),
                    fieldname: getURLParameter('fieldname'),
                    fieldtype: getURLParameter('fieldtype'),
                    flip: getURLParameter('flip'),
                    scale: decodeURIComponent(getURLParameter('scale')),
                    scalename: getURLParameter('scalename'),
                    steps: getURLParameter('steps'),
                    min: getURLParameter('min'),
                    poi: getURLParameter('poi'),
                    max: getURLParameter('max'),
                    bezier: getURLParameter('bezier'),
                    luminfix: getURLParameter('luminfix'),
                    ramp: getURLParameter('ramp')
                };

            window.myapp.params = {};

            if (p.viz != 'null') ff[0].value = p.viz;
            if (p.layername != void 0) ff[1].value = p.layername;
            if (p.fieldname != void 0) ff[2].value = p.fieldname;
            if (p.fieldtype != void 0) document.querySelector('select').value = p.fieldtype;
            if (p.flip != void 0) ff[3].checked = p.flip;
            if (p.scalename != void 0) {
                window.myapp.params.scalename = p.scalename;
            } else if (p.scale != void 0) {
                window.myapp.params.scale = p.scale;
                ff[4].value = p.scale;
            }
            if (p.steps != void 0) ff[5].value = p.steps;
            if (p.min != void 0) ff[6].value = p.min;
            if (p.poi != void 0) ff[7].value = p.poi;
            if (p.max != void 0) ff[8].value = p.max;
            if (p.bezier != void 0) ff[9].checked = p.bezier;
            if (p.luminfix != void 0) ff[10].checked = p.luminfix;
            if (p.ramp != void 0) {
                cdb.$('.u-iBlock').find('input[value=' + p.ramp + ']').get(0).checked = true;
                scaleindex = p.ramp;
            }
            ff[11].value = window.location.href;
        },
        setURL = function () {
            var valid = ["scalename", "viz", "layername", "fieldname", "fieldtype", "flip", "scale", "steps", "min", "poi", "max", "bezier", "luminfix", "ramp"],
                current = Object.keys(window.myapp.params),
                params = '',
                val;
            current = current.filter(function (a) {
                return valid.indexOf(a) > -1
            });
            for (var i = 0; i < current.length; i++) {
                val = window.myapp.params[current[i]];
                if (val == void 0 || val == '' || val == 'CUSTOM') continue;
                if (current[i] == 'viz' || current[i] == 'scale') val = encodeURIComponent(val);
                params += (params == '') ? '?' : '&';
                params += current[i] + '=' + val;
            }
            window.history.replaceState('Object', 'Title', params);
        },
        init = function () {
            cdb.$('.myloader').addClass('is-visible');
            window.myapp.fields = document.querySelector('.leftpanel').querySelectorAll('input');
            window.myapp.init = true;
            // fill the fields!
            getInitParams();
            cartoColors();
            getScaleParams();
            // document.querySelectorAll('.CDB-Box-Modal.scalebox')[12].style.display = 'none';
            goMap(function () {
                setQuery();
                getColors();
                getLayers();
                getFields();
                getDataparams(function () {
                    getScaleParams();
                    buildScales();
                    setCSS(scaleindex);
                    setEvents();
                    setURL();
                });
            });
        },
        createDropDown = function (id, callback) {
            var source = cdb.$("#" + id),
                selected = source.find("option[selected]").get(0), // || source.find("option").get(0),
                options = cdb.$("option", source),
                makescale = function (text, val) {
                    var colors = val.split(','),
                        w = 170/colors.length,
                        scale = document.createElement('span'),
                        item;
                    scale.setAttribute('style', "display:flex; justifyContent: center; height: 25px;");
                    scale.setAttribute('title', text);
                    for (var i = 0; i < colors.length; i++) {
                        item = document.createElement('div')
                        item.setAttribute('style', "background:" + colors[i] + "; borderRadius:4px; height: 25px; width:"+w+"px;");
                        scale.appendChild(item);
                    }
                    return scale.outerHTML;
                },
                val, txt;
            if (selected != void 0) {
                val = selected.value;
                txt = selected.innerText;
                window.myapp.params.scalename = txt;
            } else if (window.myapp.params.scale != void 0 && window.myapp.params.scale != "null"){
                val = window.myapp.params.scale;
                txt = 'CUSTOM';
            } else{
                selected = source.find("option").get(0);
                val = selected.value;
                txt = selected.innerText;
            }
            window.myapp.fields[4].value = val;
            cdb.$("body").append('<dl id="target" class="dropdown"></dl>')
            cdb.$("#target").append('<dt><a href="#">' + txt +
                '<span class="value">' + val +
                '</span></a></dt>')
            cdb.$("#target").append('<dd><ul></ul></dd>')
            options.each(function () {
                cdb.$("#target dd ul").append('<li><a href="#"  title="' + cdb.$(this).text() + '">' + makescale(cdb.$(this).text(), cdb.$(this).val()) + '<span class="value">' + cdb.$(this).val() + '</span></a></li>');
            });
            source.replaceWith(cdb.$("#target"));
            if (cdb.$("#target").find("a[title=" + txt + "]")[0] != void 0) {
                cdb.$(".dropdown dt a").html(cdb.$("#target").find("a[title=" + txt + "]")[0].innerHTML);
            }else{
                cdb.$(".dropdown dt a").html(txt);
            }

            cdb.$(".dropdown dt a").click(function () {
                cdb.$(".dropdown dd ul").toggle();
            });
            cdb.$(document).bind('click', function (e) {
                var $clicked = cdb.$(e.target);
                if (!$clicked.parents().hasClass("dropdown"))
                    cdb.$(".dropdown dd ul").hide();
            });
            cdb.$(".dropdown dd ul li a").click(function () {
                var text = cdb.$(this).html();
                cdb.$(".dropdown dt a").html(text);
                cdb.$(".dropdown dd ul").hide();
                var source = cdb.$("#target");
                source.val(cdb.$(this).find("span.value").html());
                window.myapp.params.scalename = cdb.$(this).find("span.value").get(0).getAttribute('title') || void 0;
                callback instanceof Function && callback(cdb.$(this).find("span.value").get(0).innerHTML);
            });
        },
        tog = function (e) {
            cdb.$('input, select').toggleClass('is-disabled', !e);
            cdb.$('input, select').attr('disabled', !e);
            cdb.$('.dropdown').css("pointer-events", (e) ? 'auto' : 'none');
        },
        scaleindex = 0,
        cartoColors = function () {
            var ff = window.myapp.fields,
                sel = document.querySelector('#cartoselect'),
                colors = Object.keys(colorbrewer),
                opt,
                change_colors = function () {
                    cdb.$('.myloader').addClass('is-visible');
                    cdb.$('.myloader:eq(0)').removeClass('is-visible');
                    if (getScaleParams()) return;
                    getColors();
                    getQuants(function () {
                        buildScales();
                        setCSS(scaleindex);
                    });
                };
/*
            colors.sort(function(a, b){
                return colorbrewer[b].tags[0].length - colorbrewer[a].tags[0].length;
            });
*/

            if (sel == void 0) return;
            for (var i = 0; i < colors.length; i++) {
                opt = document.createElement('option');
                opt.value = colorbrewer[colors[i]]['7'];
                opt.text = colors[i];
                if (window.myapp.params.scalename == opt.text) {
                    opt.selected = true;
                    opt.setAttribute("selected", "selected");
                }
                sel.appendChild(opt);
            }
            createDropDown('cartoselect', function () {
                var selection = cdb.$('#target').find("span.value").html();
                ff[4].value = (ff[3].checked) ? selection.split(',').reverse() : selection;
                change_colors();
                setURL();
            });
        },
        getScaleParams = function () {
            var getSQL = function () {
                    var viz = window.myapp.params.viz,
                        i0 = (viz.indexOf('/u/') > 0) ? viz.indexOf('/u/') + 3 : viz.indexOf('://') + 3,
                        i1 = (viz.indexOf('/u/') > 0) ? viz.indexOf('/', i0 + 3) : viz.indexOf('.cartodb.com/', i0);
                    return new cartodb.SQL({
                        user: viz.substring(i0, i1)
                    });
                },
                ff = window.myapp.fields;
            ff[0].value = ff[0].value.replace('api/v2/', 'api/v3/');
            try {
                window.myapp.params = cdb.$.extend(window.myapp.params, {
                    viz: ff[0].value,
                    layername: ff[1].value.replace(/\s+/g, '_'),
                    fieldname: ff[2].value,
                    fieldtype: document.querySelector('select').value,
                    flip: ff[3].checked,
                    scale: ff[4].value.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '').replace(/\s+/g, '').split(','),
                    steps: ff[5].value * 1,
                    min: ff[6].value * 1,
                    poi: ff[7].value * 1,
                    max: ff[8].value * 1,
                    bezier: ff[9].checked,
                    luminfix: ff[10].checked
                });
                if (window.myapp.params.viz == '') return true;
                window.myapp.params.sql = getSQL();
                return ff[0].value == '' || ff[1].value == '' || ff[2].value == '';
            } catch (error) {
                cdb.$('.myloader').removeClass('is-visible');
                debugger;
                tog(true);
                return true;
            }
        },
        getLayers = function () {
            var avalayers = window.myapp.layers.models.map(function (c) {
                return c.attributes.layer_name
            }).filter(function (c) {
                return c != void 0
            });
            if (document.querySelector('#layers') == void 0) {
                a = document.createElement('datalist')
            }
            var a = document.querySelector('#layers'),
                b = '';
            if (document.querySelector('#layers') == void 0) {
                a = document.createElement('datalist');
                a.setAttribute('id', 'layers');
                document.body.appendChild(a);
            } else {
                a.innerHTML = '';
            }
            for (var i = 0; i < avalayers.length; i++) {
                b += '<option value="' + avalayers[i] + '">';
            }
            a.innerHTML = b;
        },
        getFields = function () {
            window.myapp.params.sql.execute('with b as(' + window.myapp.params.query + ') select * from b limit 1').done(function (data) {
                if (document.querySelector('#columns') == void 0) {
                    a = document.createElement('datalist')
                }
                var a = document.querySelector('#columns'),
                    b = '';
                window.myapp.columns = Object.keys(data.rows[0]);
                if (document.querySelector('#columns') == void 0) {
                    a = document.createElement('datalist');
                    a.setAttribute('id', 'columns');
                    document.body.appendChild(a);
                } else {
                    a.innerHTML = '';
                }
                for (var i = 0; i < window.myapp.columns.length; i++) {
                    b += '<option value="' + window.myapp.columns[i] + '">';
                }
                a.innerHTML = b;
            });

        },
        getDataparams = function (callback) {

            if (window.myapp.params.query == '') return;

            window.myapp.params.sql.execute('with b as(' + window.myapp.params.query + ') select GeometryType(the_geom_webmercator) as type, pg_typeof(' + window.myapp.params.fieldname + ') as f from b limit 1').done(function (data) {

                if (data.rows.length == 0) return;
                if (['smallint', 'integer', 'bigint', 'decimal', 'numeric', 'real', 'double precision', 'smallserial', 'serial', 'bigserial'].some(function (a) {
                        return a == data.rows[0].f.toLowerCase()
                    }) == false) {
                    alert('Non numeric fields are not suported');
                    return;
                }

                var field = window.myapp.fields[2].value,
                    buckets = 50,
                    query = 'with a as(' + window.myapp.params.query + '), c as ( select min(a.' + field + ') as mn, max(a.' + field + ') as mx from a ), d as( select width_bucket(a.' + field + ', c.mn, c.mx, ' + (buckets - 1) + ') as bucket, count(*) as freq, min(a.' + field + ')+0.5*(max(a.' + field + ') - min(a.' + field + ')) as avg from a, c group by 1 order by 1 ), e as( select array_agg(avg) as avg, array_agg(d.bucket) as bucket, array_agg(d.freq) as freq from d ) select * from c,e';
                document.querySelector('select').value = data.rows[0].type.toLowerCase().replace('multi', '');
                window.myapp.params.sql.execute(query).done(function (data) {
                    var dr = data.rows[0];
                    window.myapp.fields[6].value = dr.mn;
                    window.myapp.fields[7].value = dr.avg[dr.freq.indexOf(Math.max.apply(null, dr.freq))];
                    window.myapp.fields[8].value = dr.mx;
                    setHisto(dr, buckets);
                    cdb.$('.myloader:eq(0)').removeClass('is-visible');
                    if (getScaleParams()) return;
                    getQuants(callback);
                }).error(function (errors) {
                    cdb.$('.myloader').removeClass('is-visible');
                });
            })
        },
        getColors = function () {
            try {
                var p = window.myapp.params,
                    colors0,
                    colorscale,
                    colors,
                    rr;
                colors0 = (p.scale.length > 5) ? chroma.scale(p.scale).mode('lab').correctLightness(p.luminfix).colors(5) : p.scale;
                colorscale = (p.bezier === true) ? chroma.bezier(colors0).scale().mode('lab').correctLightness(p.luminfix) : chroma.scale(p.scale).mode('lab').correctLightness(p.luminfix);
                colors = colorscale.colors(p.steps);
                window.myapp.colorscale = colorscale;
                rr = window.myapp.ramps = window.myapp.ramps || {};
                rr.original = window.myapp.params.scale;
                rr.interpolated = colors;
                rr.stddev = (window.myapp.quants != void 0) ? colorscale.colors(window.myapp.quants.stddev.length) : [];
                setScale(colors);
            } catch (errors) { /* do nothing */ }
        },
        getQuants = function (callback) {
            var p = window.myapp.params,
                r = window.myapp.ramps,
                f = Array.apply(null, new Array(99)).map(Number.prototype.valueOf, 0),
                count = 0,
                delta = function (f) {
                    return p.min + f * (p.max - p.min) / 100;
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
                log = calcLog(p.steps),
                log0,
                c = [],
                tmp,
                mq,
                tolerance = 100;
            mq = window.myapp.quants = window.myapp.quants || {};
            mq.original = [];
            for (var i = 0; i < r.original.length; i++) {
                mq.original[i] = delta(f[0]);
                f[0] += 100 / r.original.length;
            }
            mq.interpolated = [];
            mq.logstart = [];
            mq.logend = [];
            for (var i = 0; i < r.interpolated.length; i++) {
                mq.interpolated[i] = delta(f[1]);
                f[1] += 100 / r.interpolated.length;
                mq.logstart[i] = delta(f[2]);
                f[2] += log[r.interpolated.length - i] - log[r.interpolated.length - i - 1];
                mq.logend[i] = delta(f[3]);
                f[3] += log[i + 1] - log[i];
            }
            mq.logcenter = [];
            mq.logshifted = [];
            tmp = Math.floor(r.interpolated.length / 2);
            c[0] = (p.poi - p.min) / (p.max - p.min);
            c[1] = (r.interpolated.length % 2 == 0) ? r.interpolated.slice(0, tmp).length : r.interpolated.slice(0, tmp + 1).length;
            c[2] = r.interpolated.slice(tmp).length;
            log0 = calcLog(c[1]);
            for (var i = 0; i < c[1]; i++) {
                mq.logcenter[i] = delta(f[4]);
                f[4] += 0.5 * (log0[i + 1] - log0[i]);
                mq.logshifted[i] = delta(f[5]);
                f[5] += c[0] * (log0[i + 1] - log0[i]);
            }
            for (var i = 0; i < c[2]; i++) {
                mq.logcenter[i + c[1] - 1] = delta(f[4]);
                f[4] += 0.5 * (log0[c[1] - i] - log0[c[1] - i - 1]);
                mq.logshifted[i + c[1] - 1] = delta(f[5]);
                f[5] += (1 - c[0]) * (log0[c[1] - i] - log0[c[1] - i - 1]);
            }
            p.sql.execute('with b as(' + window.myapp.params.query + ') select CDB_QuantileBins(array_agg(' + p.fieldname + '::numeric), ' + p.steps + ') as ntile, CDB_JenksBins(array_agg(' + p.fieldname + '::numeric), ' + p.steps + ') as jenks from b').done(function (data) {
                mq.ntiles = data.rows[0].ntile;
                mq.jenks = data.rows[0].jenks.filter(function (a) {
                    return a != null
                });
                mq.ntiles.unshift(0);
                mq.jenks.unshift(0);
                count += 1;
                // v0.10
                if (count >= 2) callback();
            });
            p.sql.execute('with a as(' + window.myapp.params.query + '), b as( select ' + p.fieldname + ', TRUNC((AVG(' + p.fieldname + ') - AVG(AVG(' + p.fieldname + ')) OVER ()) / trunc((STDDEV(AVG(' + p.fieldname + ')) OVER ())::numeric, 5) ) AS Bucket from a group by ' + p.fieldname + ' ), c as( select max(' + p.fieldname + ') as mx from b group by bucket order by bucket ) select array_agg(mx) as stdev from c').done(function (data) {
                mq.stddev = data.rows[0].stdev.filter(function (a) {
                    return a != null
                });
                window.myapp.ramps.stddev = window.myapp.colorscale.colors(mq.stddev.length);
                count += 1;
                // v0.10
                if (count >= 2) callback();
            });
            // v0.10
            /*p.sql.execute('with b as(' + window.myapp.layer.attributes.sql + '), c as (select round(' + p.fieldname + '*' + tolerance + ')/' + tolerance + ' as v from b) select distinct(v) v from c where v is not null').done(function (data) {
                try {
                    tmp = data.rows.map(function (a) {
                        return a.v
                    });
                    mq.ckmeans = ss.ckmeans(tmp, p.steps).map(function (a) {
                        return a[0]
                    });
                } catch (errors) {
                    console.log(errors);
                    debugger;
                    mq.ckmeans = [];
                }
                count += 1;
                if (count >= 3) callback();
            }); */


        },
        buildScales = function () {
            var
                p = window.myapp.params,
                r = window.myapp.ramps,
                q = window.myapp.quants,
                s = document.querySelectorAll('.scale'),
                c = document.querySelectorAll('.chart'),
                h0 = s[0].scrollHeight,
                w0 = s[0].scrollWidth,
                f,
                t = [],
                d = [],
                names = ['Original scale', 'Interpolated scale', 'Log-start scale', 'Log-end scale', 'Log-center scale', 'Log shifted to POI scale', 'n-tile scale', 'Jenks scale', 'StdDev scale', 'Ckmeans.1d.dp'],
                tfun = function (ii, rr, ww) {
                    return '<div style="height:' + h0 + 'px;width:' + ww + '%;background:' + rr[ii] + ';" title="' + rr[ii] + '"></div>'
                },
                dfun = function (ii, rr, ww) {
                    return '<div class="chartblock" style="height:' + chroma(rr[ii]).lab()[0] + 'px;width:' + ww + '%;"></div>'
                },
                cfun = function (ii, qq) {
                    if (p.fieldtype == 'polygon') {
                        return '\n	[' + p.fieldname + '>' + qq[ii] + ']{\n		polygon-fill: @color' + ii + ';\n		line-color: lighten(@color' + ii + ',5);\n       }';
                    }
                    if (p.fieldtype == 'marker') {
                        return '\n	[' + p.fieldname + '>' + qq[ii] + ']{\n		marker-fill: @color' + ii + ';\n		marker-line-color: darken(@color' + ii + ',5);\n       }';
                    } else {
                        return '\n	[' + p.fieldname + '>' + qq[ii] + ']{\n		' + p.fieldtype + '-fill: @color' + ii + ';\n       }';
                    }
                },
                wfun = function (ii, qq) {
                    var h = qq[i + 1] || p.max;
                    return 100 * (h - qq[ii]) / (qq[qq.length - 1] - qq[0]);
                },
                fullfun = function (jj, ii, rr, qq, ww) {
                    var ww = ww || wfun(ii, qq);
                    t[jj] = t[jj] || '';
                    t[jj] += tfun(ii, rr, ww);
                    d[jj] = d[jj] || '';
                    d[jj] += dfun(ii, rr, ww);
                    window.myapp.cartocss[jj] += cfun(ii, qq);
                },
                initcss = function (jj, rr) {
                    var layername = p.layername.replace(/ /g, '_');
                    window.myapp.cartocss[jj] = '/** ' + names[jj] + ' */\n\n' + rr.map(function (a, b) {
                        return '@color' + b + ': ' + a + ';\n'
                    }).join('');
                    if (p.fieldtype == 'polygon') {
                        window.myapp.cartocss[jj] += '\n#' + layername + '{\npolygon-opacity: 0.9;\npolygon-fill: @color0;\nline-opacity: 1;\nline-width: 0.5;\nline-color: lighten(@color0,5);\n';
                    } else if (p.fieldtype == 'marker') {
                        window.myapp.cartocss[jj] += '\n#' + layername + '{\nmarker-fill:@color0;\nmarker-fill-opacity: 0.9;\nmarker-line-color: darken(@color0,5);\nmarker-line-width: 1;\nmarker-line-opacity: 0.9;\nmarker-width: 8;\nmarker-allow-overlap: true;\n';
                    } else {
                        window.myapp.cartocss[jj] += '\n#' + layername + '{\n	' + p.fieldtype + '-opacity: 1;\n	' + p.fieldtype + '-fill: @color0;';
                    }
                };
            window.myapp.cartocss = [];
            try {
                initcss(0, r.original);
                initcss(1, r.interpolated);
                initcss(2, r.interpolated);
                initcss(3, r.interpolated);
                initcss(4, r.interpolated);
                initcss(5, r.interpolated);
                initcss(6, r.interpolated);
                initcss(7, r.interpolated);
                // v0.10
                //initcss(8, r.interpolated);
                initcss(9, r.stddev);
                for (var i = 0; i < r.original.length; i++) {
                    fullfun(0, i, r.original, q.original, 100 / r.original.length);
                }
                for (var i = 0; i < r.interpolated.length; i++) {
                    fullfun(1, i, r.interpolated, q.interpolated, 100 / r.interpolated.length);
                    fullfun(2, i, r.interpolated, q.logstart);
                    fullfun(3, i, r.interpolated, q.logend);
                    fullfun(4, i, r.interpolated, q.logcenter);
                    fullfun(5, i, r.interpolated, q.logshifted);
                    fullfun(6, i, r.interpolated, q.ntiles);
                    fullfun(7, i, r.interpolated, q.jenks);
                    // v0.10
                    //fullfun(8, i, r.interpolated, q.ckmeans);
                }
                for (var i = 0; i < r.stddev.length; i++) {
                    fullfun(9, i, r.stddev, q.stddev);
                }
                window.myapp.cartocss = window.myapp.cartocss.map(function (a) {
                    return a += '\n}';
                });
                for (var i = 0; i < 10; i++) {
                    s[i].innerHTML = t[i];
                    c[i].innerHTML = d[i];
                    cdb.$('.myloader:eq(' + (i + 1) + ')').removeClass('is-visible');
                }
            } catch (errors) {
                cdb.$('.myloader').removeClass('is-visible');
                debugger;
            }
        },
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
        },
        setHisto = function (data, c /*b, f, c, max, min, poi*/ ) {
            var h = document.querySelector('.histo'),
                n = document.querySelector('#nulls'),
                l = document.querySelector('.hlegend'),
                t = document.querySelector('.hticks'),
                f = data.freq,
                b = data.bucket,
                solid = Array.apply(null, Array(c)).map(Number.prototype.valueOf, 0),
                max = Math.max.apply(null, f),
                mode = data.avg[data.freq.indexOf(Math.max.apply(null, data.freq))],
                mi,
                alt,
                margin,
                ihtml = '',
                fxn = function (a) {
                    return (a - Math.floor(a) > 0) ? a.toFixed(2) : a + '';
                };
            for (var i = 0; i < b.length; i++) {
                solid[b[i] - 1] = f[i];
            }
            mi = solid.indexOf(Math.max.apply(null, data.freq));
            margin = mi * h.scrollWidth / c;
            for (var i = 0; i < c; i++) {
                alt = 100 * solid[i] / max;
                ihtml += '<div class="histoblock" style="height:' + alt + '%;width:' + (100 / c) + '%;" title="avg: ' + fxn(data.avg[data.freq.indexOf(solid[i])]) + '  |  freq: ' + solid[i] + '"></div>'
            }
            h.innerHTML = ihtml;
            n.innerHTML = (solid[-1] == void 0) ? '0 null values' : solid[-1] + ' null values';
            t.innerHTML = '<span>|</span><span style="position:absolute;left:' + margin + 'px;">|</span><span style="float: right;">|</span>';
            l.innerHTML = '<span>' + fxn(data.mn) + '</span><span style="position:absolute;left:' + (margin - 5) + 'px;">' + fxn(mode) + '</span><span style="float: right;">' + fxn(data.mx) + '</span>';
        },
        setCSS = function (index) {
            tog(false);
            var pre = cdb.L.DomUtil.create('pre', 'prettyprint lang-css');
            window.myapp.layer.set('cartocss', myapp.cartocss[index]);
            pre.id = 'cartocss';
            pre.innerHTML = escapeHtml(myapp.cartocss[index]);
            document.querySelector('.mycss').innerHTML = '';
            document.querySelector('.mycss').appendChild(pre);
            prettyPrint();
            cdb.$('.myloader:eq(11)').removeClass('is-visible');
            tog(true);
        },
        setQuery = function () {
            var pre = cdb.L.DomUtil.create('pre', 'prettyprint lang-sql');
            pre.id = 'query';
            pre.innerHTML = escapeHtml(window.myapp.params.query);
            document.querySelector('.myquery').innerHTML = '';
            document.querySelector('.myquery').appendChild(pre);
            prettyPrint();
        },
        setScale = function (a) {
            var pre = cdb.L.DomUtil.create('pre', 'prettyprint lang-javascript');
            pre.id = 'query';
            pre.innerHTML = escapeHtml(JSON.stringify(a));
            document.querySelector('.myscale').innerHTML = '';
            document.querySelector('.myscale').appendChild(pre);
            prettyPrint();
        },
        goMap = function (callback) {
            tog(false);
            var p = window.myapp.params,
                viz = p.viz,
                layername = p.layername,
                fieldname = p.fieldname;
            if (window.myapp.vis != void 0) delete window.myapp.vis;
            document.querySelector('#map').innerHTML = '';
            window.myapp.vis = cartodb.createVis('map', viz);
            window.myapp.vis.done(function (vis, layers) {
                window.myapp.layers = layers;
                getLayers();
                window.myapp.layer = layers.models.filter(function (a) {
                    return a.attributes.layer_name == layername.replace(/ /g, '_');
                })[0];
                if (window.myapp.layer != void 0) {
                    window.myapp.params.query = (window.myapp.layer.attributes.sql != void 0) ? window.myapp.layer.attributes.sql : vis._analysisCollection.models.filter(function (a) {
                        return a.id == window.myapp.layer.attributes.source
                    })[0].attributes.query;
                } else {
                    window.myapp.params.query = '';
                };
                tog(true);
                if (callback != void 0) callback();
            });
        },
        setEvents = function () {
            var ff = window.myapp.fields,
                change_field = function () {
                    if (window.myapp.flag == true) return;
                    window.myapp.flag = true;
                    if (getScaleParams()) return;
                    cdb.$('.myloader').addClass('is-visible');
                    goMap(function () {
                        setQuery();
                        getColors();
                        getDataparams(function () {
                            getScaleParams();
                            buildScales();
                            setCSS(scaleindex);
                            window.myapp.flag = false;
                        });
                    });
                },
                change_colors = function () {
                    cdb.$('.myloader').addClass('is-visible');
                    cdb.$('.myloader:eq(0)').removeClass('is-visible');
                    if (getScaleParams()) return;
                    getColors();
                    getQuants(function () {
                        buildScales();
                        setCSS(scaleindex);
                    });
                },
                change_limits = function () {
                    cdb.$('.myloader').addClass('is-visible');
                    cdb.$('.myloader:eq(0)').removeClass('is-visible');
                    if (getScaleParams()) return;
                    getQuants(function () {
                        buildScales();
                        setCSS(scaleindex);
                    });
                },
                change_colorspars = function () {
                    cdb.$('.myloader').addClass('is-visible');
                    cdb.$('.myloader:eq(0)').removeClass('is-visible');
                    if (getScaleParams()) return;
                    getColors();
                    buildScales();
                    setCSS(scaleindex);
                },
                change_geom = function () {
                    cdb.$('.myloader').addClass('is-visible');
                    cdb.$('.myloader:eq(0)').removeClass('is-visible');
                    if (getScaleParams()) return;
                    buildScales();
                    setCSS(scaleindex);
                    setURL();
                },
                change_cartocolor = function () {
                    ff[4].value = (ff[3].checked) ? document.querySelector('#cartoselect').value.split(',').reverse() : document.querySelector('#cartoselect').value;
                    change_colors();
                },
                flipscale = function () {
                    ff[4].value = ff[4].value.split(',').reverse();
                    if (getScaleParams()) return;
                    getColors();
                    buildScales();
                    setCSS(scaleindex);
                };
            ff[0].onkeyup = ff[0].onchange = function () {
                ff[1].value = '';
                ff[2].value = '';
                getScaleParams();
                if (window.myapp.params.viz != '') goMap();
            }
            ff[0].onclick = ff[0].onfocus = function () {
                this.select()
            }
            ff[1].onkeyup = ff[1].onchange = ff[1].oninput = ff[1].onautocomplete = function () {
                ff[2].value = '';
                getScaleParams();
                window.myapp.layer = window.myapp.layers.models.filter(function (a) {
                    return a.attributes.layer_name == myapp.params.layername.replace(/ /g, '_');
                })[0];
                if (window.myapp.layer != void 0) {
                    window.myapp.params.query = (window.myapp.layer.attributes.sql != void 0) ? window.myapp.layer.attributes.sql : vis._analysisCollection.models.filter(function (a) {
                        return a.id == window.myapp.layer.attributes.source
                    })[0].attributes.query;
                    getFields();
                } else {
                    window.myapp.params.query = '';
                };
            };
            ff[2].onkeyup = ff[2].onchange = ff[2].oninput = ff[2].onautocomplete = function () {
                var val = window.myapp.columns.some(function (a) {
                    return a.toLowerCase() == ff[2].value.toLowerCase()
                })
                if (val) change_field();
            }
            ff[3].onchange = flipscale;
            ff[4].onkeyup = change_colors;
            ff[5].onchange = ff[5].onkeyup = change_colors;
            ff[6].onchange = ff[6].onkeyup = change_limits;
            ff[7].onchange = ff[7].onkeyup = function () {
                if (getScaleParams()) return;
                if (this.value < window.myapp.params.min || this.value > window.myapp.params.max) {
                    return;
                }
                change_limits();
            };
            ff[8].onchange = ff[8].onkeyup = change_limits;
            ff[9].onchange = ff[10].onchange = change_colorspars;
            //cdb.$('input[type=checkbox]').on('change', change_colorspars);
            cdb.$('input[type=radio]').on('change', function () {
                scaleindex = document.querySelector('input[type=radio]:checked').value;
                window.myapp.params.ramp = scaleindex;
                setCSS(scaleindex);
            })
            cdb.$('#geoselect').on('change', change_geom);
            cdb.$('#cartoselect').on('change', change_cartocolor);
            cdb.$('input').on('focus input autocomplete change keyup', setURL);
        };

    window.onload = init;

})();

/*


Si non confectus, non reficiat


*/
'use strict';
(function () {

    window.myapp = window.myapp || {};

    var init = function () {
            cdb.$('.myloader').addClass('is-visible');
            window.myapp.fields = document.querySelector('.leftpanel').querySelectorAll('input');
            getScaleParams();
            goMap(function () {
                setQuery();
                getColors();
                getDataparams(function () {
                    getScaleParams();
                    getQuants(function () {
                        buildScales();
                        setCSS(scaleindex);
                        setEvents();
                    });
                });
            });
        },
        scaleindex = 0,
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
                window.myapp.params = {
                    viz: ff[0].value,
                    layername: ff[1].value,
                    fieldname: ff[2].value,
                    fieldtype: document.querySelector('select').value,
                    scale: ff[3].value.replace('[', '').replace(']', '').replace(/\"/g, '').replace(/\'/g, '').replace(/\s+/g, '').split(','),
                    steps: ff[4].value * 1,
                    min: ff[5].value * 1,
                    poi: ff[6].value * 1,
                    max: ff[7].value * 1,
                    bezier: ff[8].checked,
                    luminfix: ff[9].checked
                };
                window.myapp.params.sql = getSQL();
                return false;
            } catch (error) {
                cdb.$('.myloader').removeClass('is-visible');
                debugger;
                return true;
            }
        },
        getDataparams = function (callback) {
            window.myapp.params.sql.execute('with b as(' + window.myapp.layer.attributes.sql + ') select GeometryType(the_geom_webmercator) as type from b limit 1').done(function (data) {
                var field = window.myapp.fields[2].value,
                    buckets = 50,
                    query = 'with a as(' + window.myapp.layer.attributes.sql + '), c as ( select min(a.' + field + ') as mn, max(a.' + field + ') as mx from a ), d as( select width_bucket(a.' + field + ', c.mn, c.mx, ' + (buckets - 1) + ') as bucket, count(*) as freq, min(a.' + field + ')+0.5*(max(a.' + field + ') - min(a.' + field + ')) as avg from a, c group by 1 order by 1 ), e as( select array_agg(avg) as avg, array_agg(d.bucket) as bucket, array_agg(d.freq) as freq from d ) select * from c,e';
                document.querySelector('select').value = data.rows[0].type.toLowerCase().replace('multi', '');
                window.myapp.params.sql.execute(query).done(function (data) {
                    var dr = data.rows[0];
                    window.myapp.fields[5].value = dr.mn;
                    window.myapp.fields[6].value = dr.avg[dr.freq.indexOf(Math.max.apply(null, dr.freq))];
                    window.myapp.fields[7].value = dr.mx;
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
                mq;
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
            p.sql.execute('with b as(' + window.myapp.layer.attributes.sql + ') select CDB_QuantileBins(array_agg(' + p.fieldname + '::numeric), ' + p.steps + ') as ntile, CDB_JenksBins(array_agg(' + p.fieldname + '::numeric), ' + p.steps + ') as jenks from b').done(function (data) {
                mq.ntiles = data.rows[0].ntile;
                mq.jenks = data.rows[0].jenks.filter(function (a) {
                    return a != null
                });
                mq.ntiles.unshift(0);
                mq.jenks.unshift(0);
                count += 1;
                if (count >= 2) callback();
            });
            p.sql.execute('with a as(' + window.myapp.layer.attributes.sql + '), b as( select ' + p.fieldname + ', TRUNC((AVG(' + p.fieldname + ') - AVG(AVG(' + p.fieldname + ')) OVER ()) / trunc((STDDEV(AVG(' + p.fieldname + ')) OVER ())::numeric, 5) ) AS Bucket from a group by ' + p.fieldname + ' ), c as( select max(' + p.fieldname + ') as mx from b group by bucket order by bucket ) select array_agg(mx) as stdev from c').done(function (data) {
                mq.stddev = data.rows[0].stdev.filter(function (a) {
                    return a != null
                });
                window.myapp.ramps.stddev = window.myapp.colorscale.colors(mq.stddev.length);
                count += 1;
                if (count >= 2) callback();
            })

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
                names = ['Original scale', 'Interpolated scale', 'Log-start scale', 'Log-end scale', 'Log-center scale', 'Log shifted to POI scale', 'n-tile scale', 'Jenks scale', 'StdDev scale'],
                tfun = function (ii, rr, ww) {
                    return '<div style="height:' + h0 + 'px;width:' + ww + '%;background:' + rr[ii] + ';" title="' + rr[ii] + '"></div>'
                },
                dfun = function (ii, rr, ww) {
                    return '<div class="chartblock" style="height:' + chroma(rr[ii]).lab()[0] + 'px;width:' + ww + '%;"></div>'
                },
                cfun = function (ii, qq) {
                    return '\n	[' + p.fieldname + '>' + qq[ii] + ']{\n		' + p.fieldtype + '-fill: @color' + ii + ';\n       }';
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
                    window.myapp.cartocss[jj] = '/** ' + names[jj] + ' */\n\n' + rr.map(function (a, b) {
                        return '@color' + b + ': ' + a + ';\n'
                    }).join('');
                    window.myapp.cartocss[jj] += '\n#' + p.layername + '{\n	' + p.fieldtype + '-opacity: 1;\n	' + p.fieldtype + '-fill: @color0;';
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
                initcss(8, r.stddev);
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
                }
                for (var i = 0; i < r.stddev.length; i++) {
                    fullfun(8, i, r.stddev, q.stddev);
                }
                window.myapp.cartocss = window.myapp.cartocss.map(function (a) {
                    return a += '\n}';
                });
                for (var i = 0; i < 9; i++) {
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
                ihtml += '<div class="histoblock" style="height:' + alt + '%;width:' + (100 / c) + '%;" title="avg: '+fxn(data.avg[data.freq.indexOf(solid[i])])+'  |  freq: '+solid[i]+'"></div>'
            }
            h.innerHTML = ihtml;
            n.innerHTML = (solid[-1] == void 0) ? '0 null values' : solid[-1] + ' null values';
            t.innerHTML = '<span>|</span><span style="position:absolute;left:' + margin + 'px;">|</span><span style="float: right;">|</span>';
            l.innerHTML = '<span>' + fxn(data.mn) + '</span><span style="position:absolute;left:' + (margin - 5) + 'px;">' + fxn(mode) + '</span><span style="float: right;">' + fxn(data.mx) + '</span>';
        },
        setCSS = function (index) {
            var pre = cdb.L.DomUtil.create('pre', 'prettyprint lang-css');
            window.myapp.layer.set('cartocss', myapp.cartocss[index]);
            pre.id = 'cartocss';
            pre.innerHTML = escapeHtml(myapp.cartocss[index]);
            document.querySelector('.mycss').innerHTML = '';
            document.querySelector('.mycss').appendChild(pre);
            prettyPrint();
            cdb.$('.myloader:eq(10)').removeClass('is-visible');
        },
        setQuery = function () {
            var pre = cdb.L.DomUtil.create('pre', 'prettyprint lang-sql');
            pre.id = 'query';
            pre.innerHTML = escapeHtml(window.myapp.layer.attributes.sql);
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
            var p = window.myapp.params,
                viz = p.viz,
                layername = p.layername,
                fieldname = p.fieldname;
            document.querySelector('#map').innerHTML = '';
            cartodb.createVis('map', viz).done(function (vis, layers) {
                window.myapp.layer = layers.models.filter(function (a) {
                    return a.attributes.layer_name == layername;
                })[0];
                callback();
            });
        },
        setEvents = function () {
            var ff = window.myapp.fields,
                change_field = function () {
                    cdb.$('.myloader').addClass('is-visible');
                    if (getScaleParams()) return;
                    getDataparams(function () {
                        buildScales();
                        setCSS(scaleindex);
                        setQuery();
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
                };
            ff[0].onkeyup = init;
            ff[1].onkeyup = change_field;
            ff[2].onkeyup = change_field;
            ff[3].onkeyup = change_colors;
            ff[4].onchange = ff[4].onkeyup = change_colors;
            ff[5].onchange = ff[5].onkeyup = change_limits;
            ff[6].onchange = ff[6].onkeyup = function () {
                if (getScaleParams()) return;
                if (this.value < window.myapp.params.min || this.value > window.myapp.params.max) {
                    return;
                }
                change_limits();
            };
            ff[7].onchange = ff[7].onkeyup = change_limits;
            cdb.$('input[type=checkbox]').on('change', change_colorspars);
            cdb.$('input[type=radio]').on('change', function () {
                scaleindex = document.querySelector('input[type=radio]:checked').value;
                setCSS(scaleindex);
            })
            cdb.$('select').on('change', change_geom);
        };

    window.onload = init;

})();

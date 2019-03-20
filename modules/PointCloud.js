define(function (require) {

  const d3 = require('d3');
  const Block = require('Block');
  const d33d = require('./d33d');
  const d3ScaleChromatic = require('d3-scale-chromatic');

  d33d(d3);

  return Block.extend({

    name: 'Point Cloud',

    didMount() {
      this._graph = this.getGraph();
      this._graph.getData().on('change', this.render.bind(this));

      this._width = this.$el.width();
      this._height = this.$el.width() * 0.6;

      this._points = [];
      d3.text(
        this.getWorkspace().url('files/SumatranTiger.csv'),
        (text) => {
          this._points = d3.csvParseRows(text).map((r) => r.map((c) => parseFloat(c)));
          this._data = this._normalize(this._points);
          this.render();
        });
    },

    render() {
      this.setContent('loading ...');

      if (this._points.length === 0) {
        return;
      }

      this._renderPointCloud();
    },

    _getAnchors() {
      let graphData = this._graph.getData().get('nodes');
      return graphData.map((n) => {
        return [n['x_mean'], n['y_mean'], n['z_mean']];
      });
    },

    _normalize(points) {
      let max = [-999999, -999999, -999999];
      let min = [999999, 999999, 999999];

      points.forEach((d) => {
        [0, 1, 2].forEach((i) => {
          if (max[i] < d[i]) {
            max[i] = d[i];
          }
          if (min[i] > d[i]) {
            min[i] = d[i];
          }
        })
      });

      let x_mid = (max[0] - min[0]) / 2 + min[0];
      let y_mid = (max[1] - min[1]) / 2 + min[1];
      let z_mid = (max[2] - min[2]) / 2 + min[2];

      let xyz = points.map((p) => {
        return {
          x: p[0] - x_mid,
          y: p[1] - y_mid,
          z: p[2] - z_mid,
          anchor: false,
        }
      });

      let maxDim = Math.max(...max);
      let scale = Math.min(this._width, this._height) / maxDim;

      return {
        scale: scale,
        x_mid: x_mid,
        y_mid: y_mid,
        z_mid: z_mid,
        x_domain: [min[0] - x_mid, max[0] - x_mid],
        y_domain: [min[1] - y_mid, max[1] - y_mid],
        z_domain: [min[2] - z_mid, max[2] - z_mid],
        xyz: xyz
      }
    },

    _renderPointCloud() {
      const anchorsData = this._getAnchors();
      const normalizedData = this._data;
      this.setContent($("<svg id='plot-3d'></svg>"));

      const pointsXYZ = normalizedData['xyz'];
      const anchorXYZ = anchorsData.map((d) => {
        return {
          x: d[0] - normalizedData['x_mid'],
          y: d[2] - normalizedData['y_mid'],
          z: d[1] - normalizedData['z_mid'],
          anchor: true,
        }
      });

      let data = anchorXYZ.concat(pointsXYZ);

      const z_domain = normalizedData['z_domain'];

      const svg = d3.select('#plot-3d');

      svg.attr('width', this._width)
        .attr('height', this._height);

      let origin = [this._width / 2, this._height / 2];
      let startAngle = Math.PI / 2;
      let beta = startAngle;

      svg.call(
        d3.drag()
          .on('drag', dragged)
          .on('start', dragStart)
          .on('end', dragEnd)).append('g');

      let zColor = d3.scaleSequential(d3ScaleChromatic['interpolateYlOrBr']);
      zColor.domain(z_domain);
      let mx, mouseX;

      let _3d = d3._3d()
        .scale(250)
        .origin(origin)
        .rotateX(startAngle)
        .rotateY(startAngle)
        .primitiveType('POINTS');

      let data3D = _3d(data);

      function dragStart() {
        mx = d3.event.x;
      }

      function dragged() {
        mouseX = mouseX || 0;
        beta = (d3.event.x - mx + mouseX) * Math.PI / 360 * (-1);
        processData(_3d.rotateY(beta + startAngle)(data));
      }

      function dragEnd() {
        mouseX = d3.event.x - mx + mouseX;
      }

      function processData(data) {

        let points = svg.selectAll('circle').data(data);

        points
          .enter()
          .append('circle')
          .merge(points)
          .attr('fill', function (d, i) {
            if (d['anchor']) {
              return 'green';
            }
            return zColor(d.z);
          })
          .attr('stroke', function (d, i) {
            if (d['anchor']) {
              return 'green';
            }
            return d3.color(zColor(d.z)).darker(0.5);
          })
          .sort(function (a, b) {
            return d3.descending(a.rotated.z, b.rotated.z);
          })
          .attr('fill-opacity', function (d) {
            if (d['anchor']) {
              return 1;
            }
            return 0.5;
          })
          .attr('cx', function (d) {
            return d.projected.x;
          })
          .attr('cy', function (d) {
            return d.projected.y;
          })
          .attr('r', function (d) {
            if (d['anchor']) {
              return 5;
            }
            return 1;
          });

        points.exit().remove();
      }

      processData(data3D);

    }

  });

});

define(function () {

  return function (t) {
    "use strict";

    function r(t, r, e, n) {
      var o = Math.cos(r), u = Math.sin(r), a = Math.cos(e), d = Math.sin(e), c = Math.cos(n), i = Math.sin(n),
        f = o * d * i - u * c, p = o * d * c + u * i, y = u * a, x = u * d * i + o * c, h = u * d * c - o * i, s = -d,
        z = a * i, j = a * c;
      return { x: o * a * t.x + f * -t.y + p * t.z, y: y * t.x + x * -t.y + h * t.z, z: s * t.x + z * -t.y + j * t.z }
    }

    function e(t, r, e, n, o) {
      return r === x.ortho ? { x: e[0] + n * t.x, y: e[1] + n * t.y } : r === x.persp ? {
        x: e[0] + n * t.x / (t.z + o),
        y: e[1] + n * t.y / (t.z + o)
      } : void 0
    }

    function n(t, n, o, u, a, d, c, i) {
      for (var f = t.length - 1; f >= 0; f--) {
        var p = t[f];
        p.rotated = r({ x: p.x, y: p.y, z: p.z }, o, u, a), p.projected = e(p.rotated, n, d, c, i)
      }
      return t
    }

    function o(t, n, o, u, a, d, c, i) {
      for (var f = t.length - 1; f >= 0; f--) {
        var p = t[f], y = p[0], x = p[1];
        y.rotated = r({ x: y.x, y: y.y, z: y.z }, o, u, a), x.rotated = r({
          x: x.x,
          y: x.y,
          z: x.z
        }, o, u, a), y.projected = e(y.rotated, n, d, c, i), x.projected = e(x.rotated, n, d, c, i), p.lng = Math.sqrt(Math.pow(x.rotated.x - y.rotated.x, 2) + Math.pow(x.rotated.y - y.rotated.y, 2) + Math.pow(x.rotated.z - y.rotated.z, 2)), p.midPoint = {
          x: (y.x + x.x) / 2,
          y: (y.y + x.y) / 2,
          z: (y.z + x.z) / 2
        }
      }
      return t
    }

    function u(t, r, e, n, o, u, a, d) {
      for (var c = t.length - 1; c >= 0; c--) ;
      return t
    }

    function a(t, r, e, n, o, u, a, d) {
      for (var c = t.length - 1; c >= 0; c--) ;
      return t
    }

    function d(t, n, o, u, a, d, c, i) {
      for (var f = t.length - 1; f >= 0; f--) {
        var p = t[f], y = p[0], x = p[1], h = p[2];
        y.rotated = r({ x: y.x, y: y.y, z: y.z }, o, u, a), x.rotated = r({
          x: x.x,
          y: x.y,
          z: x.z
        }, o, u, a), h.rotated = r({
          x: h.x,
          y: h.y,
          z: h.z
        }, o, u, a), y.projected = e(y.rotated, n, d, c, i), x.projected = e(x.rotated, n, d, c, i), h.projected = e(h.rotated, n, d, c, i), p.area = 1
      }
      return t
    }

    function c(t, r, e, n, o, u, a, d) {
      for (var c = t.length - 1; c >= 0; c--) ;
      return t
    }

    function i(t, r, e, n, o, u, a, d) {
      for (var c = t.length - 1; c >= 0; c--) ;
      return t
    }

    function f(t) {
      return "M" + t.projected.x + "," + t.projected.y + "m" + -t.radius + ",0a" + t.radius + "," + t.radius + ",0,1,1," + 2 * t.radius + ",0a" + t.radius + "," + t.radius + ",0,1,1,-" + 2 * t.radius + ",0"
    }

    function p(t) {
      return "M" + t[0].projected.x + "," + t[0].projected.y + "L" + t[1].projected.x + "," + t[1].projected.y
    }

    function y(t) {
      return "M" + t[0].projected.x + "," + t[0].projected.y + "L" + t[1].projected.x + "," + t[1].projected.y + "L" + t[2].projected.x + "," + t[2].projected.y
    }

    var x = { ortho: "ortho", persp: "persp" }, h = function () {
      function t(t) {
        return M[v](t, e, j, l, g, h, s, z)
      }

      var r = x.ortho, e = (x.persp, r), h = [0, 0], s = 1, z = 1, j = 0, l = 0, g = 0, v = "POINTS",
        M = { POINTS: n, LINES: o, LINES_LOOP: u, LINES_STRIP: a, TRIANGLES: d, TRIANGLES_STRIP: c, TRIANGLES_FAN: i },
        I = { POINTS: f, LINES: p, TRIANGLES: y };
      return t.projection = function (r) {
        return arguments.length ? (e = r, t) : e
      }, t.origin = function (r) {
        return arguments.length ? (h = r, t) : h
      }, t.scale = function (r) {
        return arguments.length ? (s = r, t) : s
      }, t.distance = function (r) {
        return arguments.length ? (z = r, t) : z
      }, t.rotateZ = function (r) {
        return arguments.length ? (j = r, t) : j
      }, t.rotateY = function (r) {
        return arguments.length ? (l = r, t) : l
      }, t.rotateX = function (r) {
        return arguments.length ? (g = r, t) : g
      }, t.primitiveType = function (r) {
        return arguments.length ? (v = r, t) : v
      }, t.draw = function (t) {
        return I[v](t)
      }, t
    };
    t._3d = h, Object.defineProperty(t, "__esModule", { value: !0 })
  };


  function x(exports) {
    'use strict';

    function ccw(polygon) {

      var _p = polygon.slice(0), sum = 0;

      _p.push(_p[0]);

      for (var i = 0; i <= polygon.length - 1; i++) {

        var j = i + 1;
        var p1 = _p[i].rotated;
        var p2 = _p[j].rotated;

        sum += (p2.x - p1.x) * (p2.y + p1.y);
      }
      // if the area is positive
      // the curve is counter-clockwise
      // because of the flipped y-Axis in the browser
      return sum > 0 ? true : false;
    }

    function centroid(polygon) {
      var _x = 0, _y = 0, _z = 0, _n = polygon.length;

      for (var i = _n - 1; i >= 0; i--) {
        _x += polygon[i].rotated.x;
        _y += polygon[i].rotated.y;
        _z += polygon[i].rotated.z;
      }
      return {
        x: _x / _n,
        y: _y / _n,
        z: _z / _n,
      };
    }

    function rotateRzRyRx(po, angles) {

      var rc = angles.rotateCenter;

      po.x -= rc[0];
      po.y -= rc[1];
      po.z -= rc[2];

      var rz = rotateZ(po, angles.z);
      var ry = rotateY(rz, angles.y);
      var rx = rotateX(ry, angles.x);

      rx.x += rc[0];
      rx.y += rc[1];
      rx.z += rc[2];

      return rx;
    }

    function rotateX(p, a) {
      var sa = Math.sin(a), ca = Math.cos(a);
      return {
        x: p.x,
        y: p.y * ca - p.z * sa,
        z: p.y * sa + p.z * ca
      };
    }

    function rotateY(p, a) {
      var sa = Math.sin(a), ca = Math.cos(a);
      return {
        x: p.z * sa + p.x * ca,
        y: p.y,
        z: p.z * ca - p.x * sa
      };
    }

    function rotateZ(p, a) {
      var sa = Math.sin(a), ca = Math.cos(a);
      return {
        x: p.x * ca - p.y * sa,
        y: p.x * sa + p.y * ca,
        z: p.z
      };
    }

    function point(points, options, point, angles) {

      for (var i = points.length - 1; i >= 0; i--) {

        var p = points[i];

        p.rotated = rotateRzRyRx({ x: point.x(p), y: point.y(p), z: point.z(p) }, angles);
        p.centroid = p.rotated;
        p.projected = options.project(p.rotated, options);
      }
      return points;
    }

    function cube(cubes, options, point$$1, angles) {
      for (var i = cubes.length - 1; i >= 0; i--) {

        var cube = cubes[i];

        var vertices = point([
          cube[0],
          cube[1],
          cube[2],
          cube[3],
          cube[4],
          cube[5],
          cube[6],
          cube[7]
        ], options, point$$1, angles);

        var v1 = vertices[0];
        var v2 = vertices[1];
        var v3 = vertices[2];
        var v4 = vertices[3];
        var v5 = vertices[4];
        var v6 = vertices[5];
        var v7 = vertices[6];
        var v8 = vertices[7];

        var front = [v1, v2, v3, v4];
        var back = [v8, v7, v6, v5];
        var left = [v5, v6, v2, v1];
        var right = [v4, v3, v7, v8];
        var top = [v5, v1, v4, v8];
        var bottom = [v2, v6, v7, v3];

        front.centroid = centroid(front);
        back.centroid = centroid(back);
        left.centroid = centroid(left);
        right.centroid = centroid(right);
        top.centroid = centroid(top);
        bottom.centroid = centroid(bottom);

        front.ccw = ccw(front);
        back.ccw = ccw(back);
        left.ccw = ccw(left);
        right.ccw = ccw(right);
        top.ccw = ccw(top);
        bottom.ccw = ccw(bottom);

        front.face = 'front';
        back.face = 'back';
        left.face = 'left';
        right.face = 'right';
        top.face = 'top';
        bottom.face = 'bottom';

        var faces = [front, back, left, right, top, bottom];

        cube.faces = faces;
        cube.centroid = {
          x: (left.centroid.x + right.centroid.x) / 2,
          y: (top.centroid.y + bottom.centroid.y) / 2,
          z: (front.centroid.z + back.centroid.z / 2)
        };
      }
      return cubes;
    }

    function gridPlane(grid, options, point$$1, angles) {

      var points = point(grid, options, point$$1, angles);
      var cnt = 0, planes = [];
      var numPts = options.row;
      var numRow = points.length / numPts;

      for (var i = numRow - 1; i > 0; i--) {
        for (var j = numPts - 1; j > 0; j--) {

          var p1 = j + i * numPts, p4 = p1 - 1, p2 = p4 - numPts + 1, p3 = p2 - 1;
          var pl = [points[p1], points[p2], points[p3], points[p4]];

          pl.plane = 'plane_' + cnt++;
          pl.ccw = ccw(pl);
          pl.centroid = centroid(pl);
          planes.push(pl);
        }
      }

      return planes;
    }

    function lineStrip(lineStrip, options, point, angles) {

      for (var i = lineStrip.length - 1; i >= 0; i--) {

        var l = lineStrip[i], m = l.length / 2, t = parseInt(m);

        for (var j = l.length - 1; j >= 0; j--) {
          var p = l[j];
          p.rotated = rotateRzRyRx({ x: point.x(p), y: point.y(p), z: point.z(p) }, angles);
          p.projected = options.project(p.rotated, options);
        }

        l.centroid = t === m ? centroid([l[m - 1], l[m]]) : { x: l[t].rotated.x, y: l[t].rotated.y, z: l[t].rotated.z };
      }
      return lineStrip;
    }

    function line(lines, options, point, angles) {

      for (var i = lines.length - 1; i >= 0; i--) {

        var line = lines[i];

        var p1 = line[0];
        var p2 = line[1];

        p1.rotated = rotateRzRyRx({ x: point.x(p1), y: point.y(p1), z: point.z(p1) }, angles);
        p2.rotated = rotateRzRyRx({ x: point.x(p2), y: point.y(p2), z: point.z(p2) }, angles);

        p1.projected = options.project(p1.rotated, options);
        p2.projected = options.project(p2.rotated, options);

        line.centroid = centroid(line);
      }
      return lines;
    }

    function plane(planes, options, point, angles) {

      for (var i = planes.length - 1; i >= 0; i--) {

        var plane = planes[i];

        var p1 = plane[0];
        var p2 = plane[1];
        var p3 = plane[2];
        var p4 = plane[3];

        p1.rotated = rotateRzRyRx({ x: point.x(p1), y: point.y(p1), z: point.z(p1) }, angles);
        p2.rotated = rotateRzRyRx({ x: point.x(p2), y: point.y(p2), z: point.z(p2) }, angles);
        p3.rotated = rotateRzRyRx({ x: point.x(p3), y: point.y(p3), z: point.z(p3) }, angles);
        p4.rotated = rotateRzRyRx({ x: point.x(p4), y: point.y(p4), z: point.z(p4) }, angles);

        p1.projected = options.project(p1.rotated, options);
        p2.projected = options.project(p2.rotated, options);
        p3.projected = options.project(p3.rotated, options);
        p4.projected = options.project(p4.rotated, options);

        plane.ccw = ccw(plane);
        plane.centroid = centroid(plane);
      }
      return planes;
    }

    function triangle(triangles, options, point, angles) {

      for (var i = triangles.length - 1; i >= 0; i--) {
        var tri = triangles[i];
        var p1 = tri[0];
        var p2 = tri[1];
        var p3 = tri[2];

        p1.rotated = rotateRzRyRx({ x: point.x(p1), y: point.y(p1), z: point.z(p1) }, angles);
        p2.rotated = rotateRzRyRx({ x: point.x(p2), y: point.y(p2), z: point.z(p2) }, angles);
        p3.rotated = rotateRzRyRx({ x: point.x(p3), y: point.y(p3), z: point.z(p3) }, angles);

        p1.projected = options.project(p1.rotated, options);
        p2.projected = options.project(p2.rotated, options);
        p3.projected = options.project(p3.rotated, options);

        tri.ccw = ccw(tri);
        tri.centroid = centroid(tri);
      }
      return triangles;
    }

    function drawLineStrip(lineStrip) {
      var lastPoint = lineStrip[lineStrip.length - 1];
      var path = 'M' + lastPoint.projected.x + ',' + lastPoint.projected.y;
      for (var i = lineStrip.length - 2; i >= 0; i--) {
        var p = lineStrip[i].projected;
        path += 'L' + p.x + ',' + p.y;
      }
      return path;
    }

    function drawPlane(d) {
      return 'M' + d[0].projected.x + ',' + d[0].projected.y + 'L' + d[1].projected.x + ',' + d[1].projected.y + 'L' + d[2].projected.x + ',' + d[2].projected.y + 'L' + d[3].projected.x + ',' + d[3].projected.y + 'Z';
    }

    function drawTriangle(d) {
      return 'M' + d[0].projected.x + ',' + d[0].projected.y + 'L' + d[1].projected.x + ',' + d[1].projected.y + 'L' + d[2].projected.x + ',' + d[2].projected.y + 'Z';
    }

    function orthographic(d, options) {
      return {
        x: options.origin[0] + options.scale * d.x,
        y: options.origin[1] + options.scale * d.y
      };
    }

    function x(p) {
      return p[0];
    }

    function y(p) {
      return p[1];
    }

    function z(p) {
      return p[2];
    }

    /**
     * @author Stefan Nieke / http://niekes.com/
     */

    var _3d = function () {

      var origin = [0, 0],
        scale = 1,
        projection = orthographic,
        angleX = 0,
        angleY = 0,
        angleZ = 0,
        rotateCenter = [0, 0, 0],
        x$$1 = x,
        y$$1 = y,
        z$$1 = z,
        row = undefined,
        shape = 'POINT',
        processData = {
          'CUBE': cube,
          'GRID': gridPlane,
          'LINE': line,
          'LINE_STRIP': lineStrip,
          'PLANE': plane,
          'POINT': point,
          'SURFACE': gridPlane,
          'TRIANGLE': triangle,
        },
        draw = {
          'CUBE': drawPlane,
          'GRID': drawPlane,
          'LINE_STRIP': drawLineStrip,
          'PLANE': drawPlane,
          'SURFACE': drawPlane,
          'TRIANGLE': drawTriangle,
        };

      function _3d(data) {
        return processData[shape](
          data,
          { scale: scale, origin: origin, project: projection, row: row },
          { x: x$$1, y: y$$1, z: z$$1 },
          { x: angleX, y: angleY, z: angleZ, rotateCenter: rotateCenter }
        );
      }

      _3d.origin = function (_) {
        return arguments.length ? (origin = _, _3d) : origin;
      };

      _3d.scale = function (_) {
        return arguments.length ? (scale = _, _3d) : scale;
      };

      _3d.rotateX = function (_) {
        return arguments.length ? (angleX = _, _3d) : angleX;
      };

      _3d.rotateY = function (_) {
        return arguments.length ? (angleY = _, _3d) : angleY;
      };

      _3d.rotateZ = function (_) {
        return arguments.length ? (angleZ = _, _3d) : angleZ;
      };

      _3d.shape = function (_, r) {
        return arguments.length ? (shape = _, row = r, _3d) : shape;
      };

      _3d.rotateCenter = function (_) {
        return arguments.length ? (rotateCenter = _, _3d) : rotateCenter;
      };

      _3d.x = function (_) {
        return arguments.length ? (x$$1 = typeof _ === 'function' ? _ : +_, _3d) : x$$1;
      };

      _3d.y = function (_) {
        return arguments.length ? (y$$1 = typeof _ === 'function' ? _ : +_, _3d) : y$$1;
      };

      _3d.z = function (_) {
        return arguments.length ? (z$$1 = typeof _ === 'function' ? _ : +_, _3d) : z$$1;
      };

      _3d.sort = function (a, b) {
        var _a = a.centroid.z, _b = b.centroid.z;
        return _a < _b ? -1 : _a > _b ? 1 : _a >= _b ? 0 : NaN;
      };

      _3d.draw = function (d) {
        if (!((shape === 'POINT') || (shape === 'LINE'))) {
          return draw[shape](d);
        }
      };

      return _3d;
    };

    exports._3d = _3d;

    Object.defineProperty(exports, '__esModule', { value: true });

  };

});

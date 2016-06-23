'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _utils = require('./../utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

var BarChart = (function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart(props) {
    _classCallCheck(this, BarChart);

    _get(Object.getPrototypeOf(BarChart.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  _createClass(BarChart, [{
    key: 'render',
    value: function render() {

      var css = '\n      ' + _utils2['default'].css + '\n    ';

      var _props = this.props;
      var data = _props.data;
      var width = _props.width;
      var height = _props.height;

      var padding = { top: 15, right: 0, bottom: 20, left: 0 };
      var options = (0, _lodash.merge)({
        axis: {
          x: {
            format: function format(d) {
              return d;
            }
          },
          y: {
            format: function format(d) {
              return d;
            }
          }
        }
      }, this.props.options);

      // chart container
      var chart = _d32['default'].select(_reactFauxDom2['default'].createElement('svg')).attr('class', 'figure-visualization').attr({
        width: width,
        height: height
      });

      // scales
      var x = _d32['default'].scale.ordinal().rangeBands([width - padding.left - padding.right, 0]);
      var y = _d32['default'].scale.linear().range([height - padding.top - padding.bottom, 0]);

      x.domain(data.values.map(function (o) {
        return o[data.x];
      }).reverse());

      var yMin = _utils2['default'].round(_d32['default'].min(data.values, function (o) {
        return o[data.y];
      }), 'inf');
      var yMax = _utils2['default'].round(_d32['default'].max(data.values, function (o) {
        return o[data.y];
      }), 'sup');
      if (options.axis.y.min && options.axis.y.min < yMin) {
        yMin = options.axis.y.min;
      } else if (yMin > 0) {
        yMin = 0;
      }
      if (options.axis.y.max && options.axis.y.max > yMax) {
        yMax = options.axis.y.max;
      }

      y.domain([yMin, yMax]);

      // x axis
      var xAxis = _d32['default'].svg.axis().scale(x).orient("bottom");

      chart.append("g").attr("class", "x axis").attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")").call(xAxis);

      // custom y axis
      var yAxis = chart.append("g").attr("class", "y axis").attr("transform", "translate(" + padding.left + "," + padding.top + ")");

      var y_axis_scale = _d32['default'].scale.linear();
      y_axis_scale.domain([0, 4]).range(y.domain());

      var first_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(0)) + ")");
      first_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(0))).attr("fill", _utils2['default'].colors.grey);
      first_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", _utils2['default'].colors.black);

      var second_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(1)) + ")");
      second_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(1))).attr("fill", _utils2['default'].colors.grey);
      second_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", _utils2['default'].colors.grey);

      var third_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(2)) + ")");
      third_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(2))).attr("fill", _utils2['default'].colors.grey);
      third_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", _utils2['default'].colors.grey);

      var fourth_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(3)) + ")");
      fourth_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(3))).attr("fill", _utils2['default'].colors.grey);
      fourth_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", _utils2['default'].colors.grey);

      var fith_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(4)) + ")");
      fith_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(4))).attr("fill", _utils2['default'].colors.grey);
      fith_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", _utils2['default'].colors.grey);

      // bars
      var barWidth = (width - padding.left - padding.right) / x.domain().length;

      var bar = chart.append("g").selectAll("g").data(data.values).enter().append("g").attr("transform", function (d, i) {
        return "translate(" + (padding.left + i * barWidth) + ",0)";
      });

      bar.append("rect").attr("y", function (d) {
        return y(d[data.y]) + padding.top;
      }).attr("height", function (d) {
        return height - padding.bottom - padding.top - y(d[data.y]);
      }).attr("width", barWidth - 1).attr("fill", _utils2['default'].colors.defaultColor);

      return _react2['default'].createElement(
        'div',
        null,
        chart.node().toReact(),
        _react2['default'].createElement(
          'style',
          null,
          css
        )
      );
    }
  }]);

  return BarChart;
})(_react2['default'].Component);

BarChart.propTypes = {
  data: _react2['default'].PropTypes.shape({
    x: _react2['default'].PropTypes.string.isRequired,
    y: _react2['default'].PropTypes.string.isRequired,
    values: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.object).isRequired
  }).isRequired,
  options: _react2['default'].PropTypes.shape({
    axis: _react2['default'].PropTypes.shape({
      x: _react2['default'].PropTypes.shape({
        format: _react2['default'].PropTypes.func
      }),
      y: _react2['default'].PropTypes.shape({
        format: _react2['default'].PropTypes.func,
        min: _react2['default'].PropTypes.number,
        max: _react2['default'].PropTypes.number
      })
    })
  }),
  width: _react2['default'].PropTypes.number.isRequired,
  height: _react2['default'].PropTypes.number.isRequired
};

exports['default'] = BarChart;
module.exports = exports['default'];
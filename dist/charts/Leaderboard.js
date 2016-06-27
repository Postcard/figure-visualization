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

var Leaderboard = (function (_React$Component) {
  _inherits(Leaderboard, _React$Component);

  function Leaderboard(props) {
    _classCallCheck(this, Leaderboard);

    _get(Object.getPrototypeOf(Leaderboard.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  _createClass(Leaderboard, [{
    key: 'render',
    value: function render() {

      var css = '\n      ' + _utils2['default'].css + '\n      .figure-visualization.leaderboard {\n        font-size: inherit;\n      }\n    ';

      var _props = this.props;
      var data = _props.data;
      var width = _props.width;
      var height = _props.height;

      var options = (0, _lodash.merge)({
        axis: {
          x: {
            format: function format(d) {
              return d;
            }
          }
        }
      }, this.props.options);

      // chart container
      var chart = _d32['default'].select(_reactFauxDom2['default'].createElement('div')).attr('class', 'figure-visualization leaderboard').style({
        width: width,
        height: 'auto'
      });

      // scale
      var x = _d32['default'].scale.linear().clamp(true).range([0, 100]);

      var xMin = _utils2['default'].round(_d32['default'].min(data.values, function (o) {
        return o[data.x];
      }), 'inf');
      var xMax = _utils2['default'].round(_d32['default'].max(data.values, function (o) {
        return o[data.x];
      }), 'sup');
      if (options.axis.x.min && options.axis.x.min < xMin) {
        xMin = options.axis.x.min;
      } else if (xMin > 0) {
        xMin = 0;
      }
      if (options.axis.x.max && options.axis.x.max > xMax) {
        xMax = options.axis.x.max;
      }

      x.domain([xMin, xMax]);

      var rows = chart.selectAll('div').data(data.values).enter().append('div').each(function (d, i) {

        var row = _d32['default'].select(this);
        var labels = row.append('div').style(i > 0 ? { 'margin-top': '0.25em' } : null);

        labels.append('span').text(function (d) {
          return d[data.y];
        });
        labels.append('span').text(function (d) {
          return options.axis.x.format(d[data.x]);
        }).style({ 'text-align': 'right', 'float': 'right' });

        var bar_container = row.append('div').style({ 'position': 'relative', 'height': '0.4em', 'width': '100%', 'background-color': _utils2['default'].colors.grey });
        var bar = bar_container.append('div').style({ 'position': 'absolute', 'top': '0px', 'left': '0px', 'height': '100%', 'width': x(d[data.x]) + '%', 'background-color': _utils2['default'].colors.defaultColor });
      });

      return _react2['default'].createElement(
        'div',
        { style: { width: width, height: height || 'auto', overflow: 'auto' } },
        chart.node().toReact(),
        _react2['default'].createElement(
          'style',
          null,
          css
        )
      );
    }
  }]);

  return Leaderboard;
})(_react2['default'].Component);

Leaderboard.propTypes = {
  data: _react2['default'].PropTypes.shape({
    y: _react2['default'].PropTypes.string.isRequired,
    x: _react2['default'].PropTypes.string.isRequired,
    values: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.object).isRequired
  }).isRequired,
  options: _react2['default'].PropTypes.shape({
    axis: _react2['default'].PropTypes.shape({
      x: _react2['default'].PropTypes.shape({
        format: _react2['default'].PropTypes.func,
        min: _react2['default'].PropTypes.number,
        max: _react2['default'].PropTypes.number
      })
    })
  }),
  width: _react2['default'].PropTypes.number.isRequired,
  height: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
};

exports['default'] = Leaderboard;
module.exports = exports['default'];
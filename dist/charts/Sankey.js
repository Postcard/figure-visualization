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

var _libSankey = require('./../lib/sankey');

var _libSankey2 = _interopRequireDefault(_libSankey);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactFauxDom = require('react-faux-dom');

var _reactFauxDom2 = _interopRequireDefault(_reactFauxDom);

var _utils = require('./../utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

var _sharedTooltip = require('./../shared/Tooltip');

var _sharedTooltip2 = _interopRequireDefault(_sharedTooltip);

var Sankey = (function (_React$Component) {
  _inherits(Sankey, _React$Component);

  function Sankey(props) {
    _classCallCheck(this, Sankey);

    _get(Object.getPrototypeOf(Sankey.prototype), 'constructor', this).call(this, props);
    this.state = {
      tooltip: {
        show: false,
        d: null
      }
    };
  }

  _createClass(Sankey, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var css = '\n      ' + _utils2['default'].css + '\n      .figure-visualization.sankey .node rect {\n        fill-opacity: .9;\n        shape-rendering: crispEdges;\n        stroke-width: 0;\n      }\n      .figure-visualization.sankey .node text {\n        text-shadow: 0 1px 0 #fff;\n      }\n      .figure-visualization.sankey .link {\n        fill: none;\n        stroke: ' + _utils2['default'].colors.defaultColor + ';\n        stroke-opacity: .2;\n      }\n    ';

      var _props = this.props;
      var data = _props.data;
      var width = _props.width;
      var height = _props.height;

      var size = [width, height];
      var options = (0, _lodash.merge)({
        nodeWidth: 20,
        nodePadding: 6,
        tooltip: {
          show: true,
          node: {
            x: {
              format: function format(d) {
                return d.value;
              }
            }
          },
          link: {
            x: {
              format: function format(d) {
                return d.value;
              }
            }
          }
        }
      }, this.props.options);

      // chart container
      var chart = _d32['default'].select(_reactFauxDom2['default'].createElement('svg')).attr('class', 'figure-visualization sankey').attr({
        width: width,
        height: height
      });

      var sankey = (0, _libSankey2['default'])().nodeWidth(options.nodeWidth).nodePadding(options.nodePadding).size(size);

      var path = sankey.link();

      sankey.nodes(data.nodes).links(data.links).layout(data.nodes.length);

      var container = chart.append('g');

      // LINKS
      var link = container.append("g").selectAll(".link").data(data.links).enter().append("path").attr("class", "link").attr("d", path).style("stroke-width", function (d) {
        return Math.max(1, d.dy);
      }).sort(function (a, b) {
        return b.dy - a.dy;
      });

      var linkTooltip = function linkTooltip(d) {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'span',
            null,
            d.source.name + " → " + d.target.name
          ),
          _react2['default'].createElement('br', null),
          _react2['default'].createElement(
            'span',
            null,
            options.tooltip.link.x.format(d)
          )
        );
      };

      link.on('mouseover', function (d, i) {
        if (options.tooltip.show && !_this.state.tooltip.show) return _this.setState({ tooltip: { show: true, content: linkTooltip(d) } });
      }).on('mouseout', function (d, i) {
        if (_this.state.tooltip.show) return _this.setState({ tooltip: { show: false } });
      });

      // NODES
      var node = container.append("g").selectAll(".node").data(data.nodes).enter().append("g").attr("class", "node").attr("transform", function (d, i) {
        return "translate(" + d.x + "," + d.y + ")";
      });

      node.append("rect").attr("height", function (d) {
        return Math.max(1, d.dy);
      }).attr("width", sankey.nodeWidth()).style("fill", _utils2['default'].colors.defaultColor).style("stroke", _utils2['default'].colors.defaultColor);

      node.append("text").attr("x", -6).attr("y", function (d) {
        return d.dy / 2;
      }).attr("dy", ".35em").attr("text-anchor", "end").attr("transform", null).text(function (d) {
        return d.name;
      }).filter(function (d) {
        return d.x < width / 2;
      }).attr("x", 6 + sankey.nodeWidth()).attr("text-anchor", "start");

      var nodeTooltip = function nodeTooltip(d) {
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'span',
            null,
            d.name
          ),
          _react2['default'].createElement('br', null),
          _react2['default'].createElement(
            'span',
            null,
            options.tooltip.node.x.format(d)
          )
        );
      };

      node.on('mouseover', function (d, i) {
        if (options.tooltip.show && !_this.state.tooltip.show) return _this.setState({ tooltip: { show: true, content: nodeTooltip(d) } });
      }).on('mouseout', function (d, i) {
        if (_this.state.tooltip.show) return _this.setState({ tooltip: { show: false } });
      });

      return _react2['default'].createElement(
        'div',
        { style: { width: width, height: height } },
        this.state.tooltip.show && _react2['default'].createElement(
          _sharedTooltip2['default'],
          null,
          this.state.tooltip.content
        ),
        chart.node().toReact(),
        _react2['default'].createElement(
          'style',
          null,
          css
        )
      );
    }
  }]);

  return Sankey;
})(_react2['default'].Component);

Sankey.propTypes = {
  data: _react2['default'].PropTypes.shape({
    nodes: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
      id: _react2['default'].PropTypes.string.isRequired,
      name: _react2['default'].PropTypes.string.isRequired,
      value: _react2['default'].PropTypes.number.isRequired
    })).isRequired,
    links: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
      source: _react2['default'].PropTypes.string.isRequired,
      target: _react2['default'].PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  options: _react2['default'].PropTypes.shape({
    tooltip: _react2['default'].PropTypes.shape({
      show: _react2['default'].PropTypes.bool,
      node: _react2['default'].PropTypes.shape({
        x: _react2['default'].PropTypes.shape({
          format: _react2['default'].PropTypes.func
        })
      }),
      link: _react2['default'].PropTypes.shape({
        x: _react2['default'].PropTypes.shape({
          format: _react2['default'].PropTypes.func
        })
      })
    })
  }),
  width: _react2['default'].PropTypes.number.isRequired,
  height: _react2['default'].PropTypes.number.isRequired
};

exports['default'] = Sankey;
module.exports = exports['default'];
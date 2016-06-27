'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('./../utils');

var Tooltip = (function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    _get(Object.getPrototypeOf(Tooltip.prototype), 'constructor', this).call(this, props);
    this.state = {
      top: undefined,
      left: undefined
    };
    this.positionHandler = this.setPosition.bind(this);
  }

  _createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('mousemove', this.positionHandler);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.positionHandler);
    }
  }, {
    key: 'setPosition',
    value: function setPosition(e) {
      var tooltipHeight = this.refs.tooltip.offsetHeight;
      var x = e.clientX;
      var y = e.clientY;
      var gap = 5;
      this.setState({
        top: y - gap - tooltipHeight,
        left: x + gap
      });
    }
  }, {
    key: 'render',
    value: function render() {

      var style = {
        pointerEvents: 'none',
        opacity: this.state.top !== undefined && this.state.left !== undefined ? 1 : 0,
        position: 'fixed',
        zIndex: 9999,
        top: this.state.top,
        left: this.state.left,
        color: _utils.colors.lightgrey,
        border: '1px solid ' + _utils.colors.lightgrey,
        backgroundColor: _utils.colors.black,
        padding: '5px 10px'

      };

      return _react2['default'].createElement(
        'div',
        { ref: 'tooltip', style: style },
        this.props.children
      );
    }
  }]);

  return Tooltip;
})(_react2['default'].Component);

exports['default'] = Tooltip;
module.exports = exports['default'];
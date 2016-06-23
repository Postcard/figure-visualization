'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var colors = {};
colors.grey = '#D1D1D1';
colors.lightgrey = "#F5F5F5";
colors.darkgrey = '#9B9B9B';
colors.darkergrey = '#6B6B6B';
colors.black = '#000';
colors.defaultColor = colors.black;
colors.qualityColors = ["#f16b46", "#f1885c", "#f1b67d", "#f1da99", "#edf8b1", "#c9f8b1", "#a1edae", "#7adea5", "#42cd8f"];
colors.quantityColors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#25349e", "#081d58"];
colors.categoricalColors = ["#7fcdbb", "#ff7f0e", "#1f77b4", "#aec7e8", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
colors.qualityColorsScale = _d32['default'].scale.quantile().range(colors.qualityColors);
colors.categoricalColorsScale = _d32['default'].scale.ordinal().range(colors.categoricalColors);
colors.quantityColorsScale = _d32['default'].scale.quantile().range(colors.quantityColors);

var css = '\n      \tsvg.figure-visualization .axis {\n          font-size: 10px;\n          font-family: inherit;\n        }\n\n        svg.figure-visualization .axis path,\n        svg.figure-visualization .axis line {\n          fill: none;\n          shape-rendering: crispEdges;\n        }\n        svg.figure-visualization .axis.x line, svg.figure-visualization .axis.x path {\n          fill: none;\n          stroke: none;\n        }\n    ';

var round = function round(n, dir) {

	var output = 0;
	var isNegative = false;

	if (n < 0) {
		isNegative = true;
		n = Math.abs(n);
	}

	if (n < 1) {
		var init_lenght = n.toString().length;
		var number = n * Math.pow(10, init_lenght - 2);
		var length = number.toString().length;
		var modulocheck = number;
	} else {
		var modulocheck = n;
		var number = Math.floor(n);
		var length = number.toString().length;
	}

	if (length == 1) {
		if (number != modulocheck) {
			if (dir == "inf") output = number;else output = number + 1;
		} else output = modulocheck;
	} else if (length == 2) {
		if (modulocheck % 10 != 0) {
			number = number / Math.pow(10, length - 1);
			number = Math.floor(number);
			if (dir == "inf") {
				number = number * Math.pow(10, length - 1);
			} else {
				number += 1;
				number = number * Math.pow(10, length - 1);
			}
			output = number;
		} else output = modulocheck;
	} else if (length >= 3) {
		if (modulocheck % Math.pow(10, length - 1) != 0) {
			number = number / Math.pow(10, length - 2);
			var first_digit = number.toString()[0];
			var second_digit = number.toString()[1];
			if (parseInt(second_digit) < 5) {
				if (dir == "inf") number = parseInt(first_digit);else number = parseInt(first_digit + 5);
			} else {
				if (dir == "inf") number = parseInt(first_digit);else number = (parseInt(first_digit) + 1) * 10;
			}
			number = number * Math.pow(10, length - 2);
			output = number;
		} else output = modulocheck;
	}

	if (n < 1) output = output / Math.pow(10, init_lenght - 2);

	if (isNegative) return -output;else return output;
};

exports['default'] = {
	colors: colors,
	css: css,
	round: round
};
module.exports = exports['default'];
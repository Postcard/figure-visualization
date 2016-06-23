import d3 from 'd3';

let colors = {};
colors.defaultColor = "#7fcdbb";
colors.qualityColors = ["#f16b46", "#f1885c", "#f1b67d", "#f1da99", "#edf8b1", "#c9f8b1", "#a1edae", "#7adea5", "#42cd8f"];
colors.quantityColors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#25349e", "#081d58"];
colors.categoricalColors = ["#7fcdbb", "#ff7f0e", "#1f77b4", "#aec7e8", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"];
colors.qualityColorsScale = d3.scale.quantile().range(colors.qualityColors);
colors.categoricalColorsScale = d3.scale.ordinal().range(colors.categoricalColors);
colors.quantityColorsScale = d3.scale.quantile().range(colors.quantityColors);

let css = `
      	svg.figure-visualization .axis {
          font-size: 10px;
          font-family: inherit;
        }

        svg.figure-visualization .axis path,
        svg.figure-visualization .axis line {
          fill: none;
          stroke: #000;
          shape-rendering: crispEdges;
        }
        svg.figure-visualization .axis.x line, svg.figure-visualization .axis.x path {
          fill: none;
          stroke: none;
        }
    `

let round = function(n, dir) {

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
			if (dir == "inf") output = number;
			else output = number + 1;
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
		if (modulocheck % (Math.pow(10, length - 1)) != 0) {
			number = number / Math.pow(10, length - 2);
			var first_digit = number.toString()[0];
			var second_digit = number.toString()[1];
			if (parseInt(second_digit) < 5) {
				if (dir == "inf") number = parseInt(first_digit);
				else number = parseInt(first_digit + 5);
			} else {
				if (dir == "inf") number = (parseInt(first_digit));
				else number = (parseInt(first_digit) + 1) * 10;
			}
			number = number * Math.pow(10, length - 2);
			output = number;
		} else output = modulocheck;
	}

	if (n < 1) output = output / Math.pow(10, init_lenght - 2);

	if (isNegative) return -output;
	else return output;
}

export default {
	colors:colors,
	css:css,
	round:round
}
import d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import utils from './../utils';
import {merge} from 'lodash';
import Tooltip from './../shared/Tooltip';

class BarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tooltip:{
        show:false,
        d:null
      }
    };
  }

  render () {

    const css = `
      ${utils.css}
    `

    let {data, width, height} = this.props;
    let padding = {top: 15, right: 0, bottom: 20, left: 0}
    let options = merge({
      tooltip:{
        show:true,
        x:{
          format:(d)=>{return d;}
        },
        y:{
          format:(d)=>{return d;}
        }
      },
      axis:{
        x:{
          format:(d)=>{return d;}
        },
        y:{
          format:(d)=>{return d;}
        }
      }
    }, this.props.options)


    // chart container
    let chart = d3.select(ReactFauxDOM.createElement('svg'))
      .attr('class', 'figure-visualization barchart')
      .attr({
        width: width,
        height: height
      });


    // scales
    let x = d3.scale.ordinal()
        .rangeBands([width - padding.left - padding.right, 0]);
    let y = d3.scale.linear()
        .range([height - padding.top - padding.bottom, 0]);

    x.domain(data.values.map((o)=>{return o[data.x];}).reverse());

    let yMin = utils.round(d3.min(data.values, function(o) { return o[data.y]; }), 'inf');
    let yMax = utils.round(d3.max(data.values, function(o) { return o[data.y]; }), 'sup');
    if(options.axis.y.min && options.axis.y.min < yMin){ yMin = options.axis.y.min }
    else if(yMin > 0){ yMin = 0 }
    if(options.axis.y.max && options.axis.y.max > yMax){ yMax = options.axis.y.max }

    y.domain([yMin, yMax]);


    // x axis
    let xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    if(options.axis.x.tickValues){
      xAxis.tickValues(x.domain().filter(function(d, i) { return options.axis.x.tickValues.indexOf(d) > -1; }))
    } 

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
      .call(xAxis);

    // custom y axis
    let yAxis = chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

    let y_axis_scale = d3.scale.linear();
    y_axis_scale.domain([0, 4]).range(y.domain());


    let first_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(0)) + ")");
    first_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(0))).attr("fill", utils.colors.grey);
    first_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", utils.colors.black);

    let second_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(1)) + ")");
    second_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(1))).attr("fill", utils.colors.grey);
    second_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", utils.colors.grey);
  
    let third_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(2)) + ")");
    third_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(2))).attr("fill", utils.colors.grey);
    third_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", utils.colors.grey);

    let fourth_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(3)) + ")");
    fourth_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(3))).attr("fill", utils.colors.grey);
    fourth_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", utils.colors.grey);
  
    let fith_tick = yAxis.append("g").attr("class", "tick").attr("transform", "translate(0," + y(y_axis_scale(4)) + ")");
    fith_tick.append("text").attr("x", 2).attr("y", -7).attr("dy", ".32em").text(options.axis.y.format(y_axis_scale(4))).attr("fill", utils.colors.grey);
    fith_tick.append("line").attr("x0", padding.left).attr("x2", width - padding.right).attr("stroke", utils.colors.grey);




    // bars
    let barWidth = (width - padding.left - padding.right) / x.domain().length;

    let bar = chart.append("g").selectAll("g")
      .data(data.values)
      .enter().append("g")
      .attr("transform", function(d, i) { return "translate(" + (padding.left + (i * barWidth)) + ",0)"; });

    bar.append("rect")
      .attr("y", function(d) { return y(d[data.y]) + padding.top; })
      .attr("height", function(d) { return (height - padding.bottom - padding.top) - y(d[data.y]); })
      .attr("width", barWidth - 1)
      .attr("fill", utils.colors.defaultColor)
      .on('mouseover', (d,i) => { if(options.tooltip.show && !this.state.tooltip.show) return this.setState({tooltip:{show:true, d:d}})})
      .on('mouseout', (d,i) => { if(this.state.tooltip.show) return this.setState({tooltip:{show:false}})});

    return (
      <div>
        {this.state.tooltip.show && (
          <Tooltip>
            <span>{options.tooltip.x.format(this.state.tooltip.d[data.x])}</span>
            <br/>
            <span>{options.tooltip.y.format(this.state.tooltip.d[data.y])}</span>
          </Tooltip>
        )}
        {chart.node().toReact()}
        <style>{css}</style>
      </div>
    )
  }
}

BarChart.propTypes = {
  data: React.PropTypes.shape({
    x: React.PropTypes.string.isRequired,
    y: React.PropTypes.string.isRequired,
    values:React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }).isRequired,
  options : React.PropTypes.shape({
    tooltip : React.PropTypes.shape({
      show: React.PropTypes.bool,
      x: React.PropTypes.shape({
        format: React.PropTypes.func
      }),
      y: React.PropTypes.shape({
        format: React.PropTypes.func
      })
    }),
    axis : React.PropTypes.shape({
      x: React.PropTypes.shape({
        format: React.PropTypes.func,
        tickValues: React.PropTypes.arrayOf(React.PropTypes.string),
      }),
      y: React.PropTypes.shape({
        format: React.PropTypes.func,
        min: React.PropTypes.number,
        max: React.PropTypes.number
      })
    })
  }),
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

export default BarChart
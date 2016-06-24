import d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import utils from './../utils';
import {merge} from 'lodash';

class BarChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {

    const css = `
      ${utils.css}
    `

    let {data, width, height} = this.props;
    let options = merge({
      axis:{
        x:{
          format:(d)=>{return d;}
        }
      }
    }, this.props.options)


    // chart container
    let chart = d3.select(ReactFauxDOM.createElement('div'))
      .attr('class', 'figure-visualization')
      .attr({
        width: width,
        height: height
      });


    // scale
    let x = d3.scale.linear()
        .range([width, 0]);

    let xMin = utils.round(d3.min(data.values, function(o) { return o[data.x]; }), 'inf');
    let xMax = utils.round(d3.max(data.values, function(o) { return o[data.x]; }), 'sup');
    if(options.axis.x.min && options.axis.x.min < xMin){ xMin = options.axis.x.min }
    else if(xMin > 0){ xMin = 0 }
    if(options.axis.x.max && options.axis.x.max > xMax){ xMax = options.axis.x.max }

    x.domain([xMin, xMax]);

    let rows = chart.selectAll('div')
      .data(data.values)
      .enter()
      .append('div')
      .text(function(d){return d[data.x]});


    return (
      <div>
        {chart.node().toReact()}
        <style>{css}</style>
      </div>
    )
  }
}

BarChart.propTypes = {
  data: React.PropTypes.shape({
    y: React.PropTypes.string.isRequired,
    x: React.PropTypes.string.isRequired,
    values:React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  }).isRequired,
  options : React.PropTypes.shape({
    axis : React.PropTypes.shape({
      x: React.PropTypes.shape({
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
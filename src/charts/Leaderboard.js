import d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import utils from './../utils';
import {merge} from 'lodash';

class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {

    const css = `
      ${utils.css}
      .figure-visualization.leaderboard {
        font-size: inherit;
      }
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
      .attr('class', 'figure-visualization leaderboard')
      .attr({
        width: width,
        height: height
      });


    // scale
    let x = d3.scale.linear()
        .clamp(true)
        .range([0, 100]);

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
      .each(function(d, i) {

          let row = d3.select(this);
          let labels = row.append('div').style(i > 0 ? {'margin-top':'0.25em'} : null);
          
          labels.append('span').text(function(d){return d[data.y]});
          labels.append('span').text(function(d){return options.axis.x.format(d[data.x])}).style({'text-align':'right', 'float':'right'});


          let bar_container = row.append('div').style({'position':'relative', 'height':'0.4em', 'width':'100%', 'background-color':utils.colors.grey});
          let bar = bar_container.append('div').style({'position':'absolute', 'top':'0px', 'left':'0px', 'height':'100%', 'width':x(d[data.x])+'%', 'background-color':utils.colors.defaultColor});
              
      });
      


    return (
      <div>
        {chart.node().toReact()}
        <style>{css}</style>
      </div>
    )
  }
}

Leaderboard.propTypes = {
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

export default Leaderboard
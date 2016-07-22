import d3 from 'd3';
import d3Sankey from './../lib/sankey';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';
import utils from './../utils';
import {merge} from 'lodash';
import Tooltip from './../shared/Tooltip';

class Sankey extends React.Component {

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
      .figure-visualization.sankey .node rect {
        fill-opacity: .9;
        shape-rendering: crispEdges;
        stroke-width: 0;
      }
      .figure-visualization.sankey .node text {
        text-shadow: 0 1px 0 #fff;
      }
      .figure-visualization.sankey .link {
        fill: none;
        stroke: ${utils.colors.defaultColor};
        stroke-opacity: .2;
      }
    `

    let {data, width, height} = this.props;
    let size = [width, height];
    let options = merge({
      nodeWidth: 20,
      nodePadding: 6,
      tooltip:{
        show:true,
        x:{
          format:(d)=>{return d;}
        }
      },
    }, this.props.options)


    // chart container
    let chart = d3.select(ReactFauxDOM.createElement('svg'))
      .attr('class', 'figure-visualization sankey')
      .attr({
        width: width,
        height: height
      });

    let sankey = d3Sankey()
        .nodeWidth(options.nodeWidth)
        .nodePadding(options.nodePadding)
        .size(size);

    let path = sankey.link();

    sankey
        .nodes(data.nodes)
        .links(data.links)
        .layout(data.nodes.length);


    let container = chart.append('g');


    // LINKS
    let link = container.append("g").selectAll(".link")
        .data(data.links)
      .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function(d) { return Math.max(1, d.dy); })
        .sort(function(a, b) { return b.dy - a.dy; });

    let linkTooltip = (d)=>{ return (
      <div>
        <span>{d.source.name + " → " + d.target.name}</span>
        <br/>
        <span>{options.tooltip.x.format(d.value)}</span>
      </div>
    )};

    link.on('mouseover', (d,i) => { if(options.tooltip.show && !this.state.tooltip.show) return this.setState({tooltip:{show:true, content:linkTooltip(d)}})})
        .on('mouseout', (d,i) => { if(this.state.tooltip.show) return this.setState({tooltip:{show:false}})});
        


    // NODES
    let node = container.append("g").selectAll(".node")
        .data(data.nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d, i) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("rect")
        .attr("height", function(d) { return Math.max(1, d.dy); })
        .attr("width", sankey.nodeWidth())
        .style("fill", utils.colors.defaultColor)
        .style("stroke", utils.colors.defaultColor)

    node.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return d.dy / 2; })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function(d) { return d.name; })
      .filter(function(d) { return d.x < width / 2; })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    let nodeTooltip = (d)=>{ return (
      <div>
        <span>{d.name}</span>
        <br/>
        <span>{options.tooltip.x.format(d.value)}</span>
      </div>
    )};

    node.on('mouseover', (d,i) => { if(options.tooltip.show && !this.state.tooltip.show) return this.setState({tooltip:{show:true, content:nodeTooltip(d)}})})
        .on('mouseout', (d,i) => { if(this.state.tooltip.show) return this.setState({tooltip:{show:false}})});

    return (
      <div style={{width: width, height: height}}>
        {this.state.tooltip.show && (
          <Tooltip>
            {this.state.tooltip.content}
          </Tooltip>
        )}
        {chart.node().toReact()}
        <style>{css}</style>
      </div>
    )
  }
}

Sankey.propTypes = {
  data: React.PropTypes.shape({
    nodes:React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired
    })).isRequired,
    links:React.PropTypes.arrayOf(React.PropTypes.shape({
      value: React.PropTypes.number.isRequired,
      source: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]).isRequired,
      target: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]).isRequired
    })).isRequired
  }).isRequired,
  options : React.PropTypes.shape({
    tooltip : React.PropTypes.shape({
      show: React.PropTypes.bool,
      x: React.PropTypes.shape({
        format: React.PropTypes.func
      })
    })
  }),
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};

export default Sankey
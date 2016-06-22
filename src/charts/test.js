import d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactFauxDOM from 'react-faux-dom';

class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false
    };
  }

  render () {

    let svg = d3.select(ReactFauxDOM.createElement('svg'))
      .attr({
        width: 300,
        height: 300
      });

    svg
      .append('rect')
      .attr({
        width: 300,
        height: 300,
        fill: this.state.mouseOver ? 'red' : 'green'
      })
      .on('mouseover', () => {
        this.setState({
          mouseOver: true
        })
      })
      .on('mouseout', () => {
        this.setState({
          mouseOver: false
        })
      })

    return svg.node().toReact()
  }
}

export default Test
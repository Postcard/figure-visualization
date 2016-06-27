import React from 'react';
import ReactDOM from 'react-dom';
import {colors} from './../utils';

class Tooltip extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      top:undefined,
      left:undefined
    };
    this.positionHandler = this.setPosition.bind(this);
  }

  componentDidMount () {
    window.addEventListener('mousemove', this.positionHandler);
  }

  componentWillUnmount () {
    window.removeEventListener('mousemove', this.positionHandler);
  }

  setPosition(e){
    let tooltipHeight = this.refs.tooltip.offsetHeight;
    let x = e.clientX;
    let y = e.clientY;
    let gap = 5;
    this.setState({
      top: (y - gap - tooltipHeight),
      left: (x + gap)
    });
  }

  render () {

    let style = {
      pointerEvents:'none',
      opacity:this.state.top !== undefined && this.state.left !== undefined ? 1 : 0,
      position:'fixed',
      zIndex:9999,
      top:this.state.top,
      left:this.state.left,
      color:colors.lightgrey,
      border:'1px solid '+colors.lightgrey,
      backgroundColor:colors.black,
      padding:'5px 10px',

    }

    return (
      <div ref='tooltip' style={style}>
        {this.props.children}
      </div>
    )
  }
}


export default Tooltip
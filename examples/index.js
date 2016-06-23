import React from 'react';
import ReactDOM from 'react-dom';
import {BarChart} from './../dist/index.js';

class Examples extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

  render () {
  	return(
  		<div style={{height:'200px', width:'600px'}}>
  			<BarChart data={this.props.data} options={this.props.options} height={200} width={600}/>
  		</div>
  	)
  }
}

Examples.defaultProps = {
	options:{
		axis:{
			y:{
				max:10,
				format:(d)=>{return d+'%'}
			}
		}
	},
  data:{
  	x:'taken',
  	y:'count',
	  values:[
	    {
	        "taken": "A",
	        "count": 1
	    },
	    {
	        "taken": "B",
	        "count": 3
	    },
	    {
	        "taken": "C",
	        "count": 3
	    },
	    {
	        "taken": "D",
	        "count": 4
	    },
	    {
	        "taken": "E",
	        "count": 1
	    },
	    {
	        "taken": "F",
	        "count": 4
	    },
	    {
	        "taken": "G",
	        "count": 2
	    },
	    {
	        "taken": "H",
	        "count": 4
	    },
	    {
	        "taken": "I",
	        "count": 3
	    },
	    {
	        "taken": "J",
	        "count": 3
	    },
	    {
	        "taken": "K",
	        "count": 1
	    },
	    {
	        "taken": "L",
	        "count": 2
	    }
		]
	}
}

ReactDOM.render(<Examples/>, document.getElementById('container'));
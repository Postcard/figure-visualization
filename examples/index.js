import React from 'react';
import ReactDOM from 'react-dom';
import {BarChart, Leaderboard} from './../dist/index.js';

class Examples extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

  render () {
  	return(
  		<p>Bar chart:</p>
  		<div style={{height:'200px', width:'600px'}}>
  			<BarChart data={this.fakeData.BarChart.data} options={this.fakeData.BarChart.options} height={200} width={600}/>
  		</div>
  		<br/>
  		<br/>
  		<p>Leaderboard:</p>
  		<div style={{height:'200px', width:'600px'}}>
  			<BarChart data={this.fakeData.Leaderboard.data} options={this.fakeData.Leaderboard.options} height={200} width={600}/>
  		</div>
  	)
  }
}

Examples.fakeData = {
	BarChart:{
		options:{
			axis:{
				y:{
					max:10,
					format:(d)=>{return d+'%'}
				},
				x:{
					tickValues:['A', 'D']
				}
			}
		},
	  data:{
	  	x:'letter',
	  	y:'count',
		  values:[
		    {
		        "letter": "A",
		        "count": 1
		    },
		    {
		        "letter": "B",
		        "count": 3
		    },
		    {
		        "letter": "C",
		        "count": 3
		    },
		    {
		        "letter": "D",
		        "count": 4
		    },
		    {
		        "letter": "E",
		        "count": 1
		    },
		    {
		        "letter": "F",
		        "count": 4
		    },
		    {
		        "letter": "G",
		        "count": 2
		    },
		    {
		        "letter": "H",
		        "count": 4
		    },
		    {
		        "letter": "I",
		        "count": 3
		    },
		    {
		        "letter": "J",
		        "count": 3
		    },
		    {
		        "letter": "K",
		        "count": 1
		    },
		    {
		        "letter": "L",
		        "count": 2
		    }
			]
		}
	},
	Leaderboard:{
		options:{
		},
	  data:{
	  	x:'count',
	  	y:'letter',
		  values:[
		    {
		        "letter": "A",
		        "count": 143
		    },
		    {
		        "letter": "B",
		        "count": 346
		    },
		    {
		        "letter": "C",
		        "count": 301
		    },
		    {
		        "letter": "D",
		        "count": 409
		    },
		    {
		        "letter": "E",
		        "count": 19
		    }
			]
		}
	}
}

ReactDOM.render(<Examples/>, document.getElementById('container'));
import React from 'react';
import ReactDOM from 'react-dom';
import {BarChart, Leaderboard} from './../dist/index.js';

class Examples extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			width:null
		}
		this.data = {
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
		this.resizeHandler = this.handleResize.bind(this);
	}

	componentDidMount () {
		window.addEventListener('resize', this.resizeHandler);
		this.handleResize();
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.resizeHandler);
	}

	handleResize(){
		this.setState({width:this.refs.container.offsetWidth});
	}

  render () {
  	return(
  		<div ref='container' style={{width:'40%', margin:'auto', padding:'60px 0px'}}>
  			{this.state.width && (
		  		<div>
			  		<p style={{marginTop:'0px'}}>Bar chart:</p>
			  		<div>
			  			<BarChart data={this.data.BarChart.data} options={this.data.BarChart.options} height={200} width={this.state.width}/>
			  		</div>
			  		<br/>
			  		<br/>
			  		<p>Leaderboard:</p>
			  		<div>
			  			<Leaderboard data={this.data.Leaderboard.data} options={this.data.Leaderboard.options}  width={this.state.width}/>
			  		</div>
		  		</div>
	  		)}
	  	</div>
  	)
  }
}

ReactDOM.render(<Examples/>, document.getElementById('container'));
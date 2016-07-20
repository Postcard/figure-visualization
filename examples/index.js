import React from 'react';
import ReactDOM from 'react-dom';
import {BarChart, Leaderboard, Sankey} from './../dist/index.js';
import data from './data.js';

class Examples extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			width:null
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
			  			<BarChart 
			  				data={data.BarChart} 
			  				options={{
									tooltip:{
										x:{
											format:(d)=>{return 'letter: '+d}
										},
										y:{
											format:(d)=>{return 'percentage: '+d}
										}
									},
									axis:{
										y:{
											max:10,
											format:(d)=>{return d+'%'}
										},
										x:{
											tickValues:['A', 'D']
										}
									}
								}} 
								height={200} 
								width={this.state.width}
							/>
			  		</div>
			  		<br/>
			  		<br/>
			  		<p>Leaderboard:</p>
			  		<div>
			  			<Leaderboard 
			  				data={data.Leaderboard} 
			  				options={{

			  				}}  
			  				width={this.state.width}
			  			/>
			  		</div>
			  		<br/>
			  		<br/>
			  		<p>Sankey Diagram:</p>
			  		<div>
			  			<Sankey
			  				data={data.Sankey}
			  				width={this.state.width}
			  				height={400}
			  			/>
			  		</div>
		  		</div>
	  		)}
	  	</div>
  	)
  }
}

ReactDOM.render(<Examples/>, document.getElementById('container'));
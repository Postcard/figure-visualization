import React from 'react';
import ReactDOM from 'react-dom';
import {Test} from './../dist/index.js';

class Examples extends React.Component {
  render () {
  	return(
  		<Test/>
  	)
  }
}

ReactDOM.render(<Examples/>, document.getElementById('container'));
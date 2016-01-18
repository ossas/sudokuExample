import React, {Component} from 'react';
import './index.less';

export default class Cell extends Component{
	constructor(props) {
		super(props);
	    this.state = {value: props.value};
	}

	clickItem(...args) {
		if(!this.props.value) {
			this.props.event(this, ...args);
		}
	}

	render() {
		return (
			<div className='cell' onClick={this.clickItem.bind(this)}>
				{this.state.value}
			</div>
		); 
	}
}
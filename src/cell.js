import React, {Component} from 'react';
import './index.less';

export default class Cell extends Component{
	constructor(props) {
		super(props);
	    this.state = {value: props.value};
	}

	clickItem(e) {
		if(!this.props.value) {
			this.props.event(this);
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
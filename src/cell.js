import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './index.less';

export default class Cell extends Component{
	constructor(props) {
		super(props);
	    this.state = {
	    	value: props.value,
	    	isFail: false
	    };
	}

	getClassName() {
		var class_name = 'cell';
		if(this.state.isFail && !this.props.value) {
			class_name += ' fail';
		}

		return class_name;
	}

	clickItem(...args) {
		if(!this.props.value) {
			this.props.event(this, ...args);
		}
	}

	render() {
		return (
			<div className={this.getClassName()} onClick={this.clickItem.bind(this)}>
				{this.state.value}
			</div>
		); 
	}
}
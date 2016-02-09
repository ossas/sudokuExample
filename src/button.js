import React, {Component} from 'react';

export default class Button extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={this.props.class} onClick={this.props.event}>
				{this.props.text}
			</div>
		);
	}
}
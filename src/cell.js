import React, {Component} from 'react';
import './index.less';

export default class Cell extends Component{
	render() {
		return (
			<div className='cell'>
				{this.props.value}
			</div>
		); 
	}
}
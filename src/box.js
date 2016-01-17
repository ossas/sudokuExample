import React, {Component} from 'react';
import Cell from './cell';
import './index.less';

export default class Box extends Component{

	_getCells() {
		let Cells = [];
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < 3; j++) {
				Cells.push(
					<Cell
						key={''+ i + j}
						value={this.props.data[i][j]}
					>
						{i}
					</Cell>
				);
			}
		}

		return Cells;
	}

	render() {
		return (
			<div className='box'>
				{this._getCells()}
			</div>
		);
	}
}
import React, {Component} from 'react';
import Cell from './cell';
import './index.less';

export default class Box extends Component{
	constructor(props) {
		super(props);
	}

	_getCells() {
		let Cells = [];
		for(let i = 0; i < 3; i++) {
			for(let j = 0; j < 3; j++) {
				Cells.push(
					<Cell
						ref={''+ i + j}
						key={''+ i + j}
						_i= {this.props.position}
						_j= {i}
						_k= {j}
						value={this.props.data[i][j]}
						event={this.props.event}
						gameCnt={this.props.gameCnt}
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
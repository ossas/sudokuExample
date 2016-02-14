import React, {Component, PropTypes} from 'react';
import assign from 'react/lib/Object.assign';
import {Motion, spring, presets} from 'react-motion';
import './index.less';

export default class Tile extends Component{
	constructor(props) {
	    super(props);
	    this.timerIds = [null, null, null];
	    this.state = {
	    	sequence: 0,
	    	x: this.props.x, 
	    	y: this.props.y, 
	    	distance: this.props.distance,
	    	cell: null
	    };

	    this.coords = [{top:-30,left:-30},{top:-30,left:0},{top:-30,left:30},{top:0,left:-30},{top:0,left:0},{top:0,left:30},{top:30,left:-30},{top:30,left:0},{top:30,left:30}];

	    this.params = [{	
	        scaleX : spring(0, [1500, 100]),
	        scaleY : spring(0, [1500, 100]),
	        x: this.state.x,
	        y : spring(this.state.y, [1500, 50])
		}, {
	        scaleX : spring(0.7, [1500, 150]),
	        scaleY : spring(1.6, [1500, 150]),
	        x: this.state.x,
	        y : spring(this.state.y+this.state.distance, [1500, 100])
	    }, {
	        scaleX : spring(1, [1500, 18]),
	        scaleY : spring(1, [1500, 18]),
	        x: this.state.x,
	        y : spring(this.state.y+this.state.distance, [1500, 100])
	    }];
	}

	getSpringParam(sequence, i) {
		let param  = Object.assign({}, this.params[sequence]);
		param.x = this.state.x;
		param.y = this.state.y;

		return param;
	}

	start(x, y, distance, cell) {
		this.state.cell = cell;
		this.state.x = x;
		this.state.y = y;
		this.state.distance = distance || this.state.distance;

		this.timerIds[1] = setTimeout(() => {
			this.setState({sequence: 1 });
			this.timerIds[1] = null;
		}, 60);

		this.timerIds[2] = setTimeout(() => {
			this.setState({sequence: 2 });
			this.timerIds[2] = null;
			if (this.props.onOpenAnimationEnd) this.props.onOpenAnimationEnd(this.props.name);
		}, 80);
	}

	reverse() {
		clearTimeout(this.timerIds[1]);
		clearTimeout(this.timerIds[2]);
		this.timerIds[0] = setTimeout(() => {
			if (this.props.onCloseAnimationEnd) this.props.onCloseAnimationEnd(this.props.name);
			this.timerIds[0] = null;
		}, 100);
		this.setState({sequence: 0});
	}

	clickTile(dom) {
		this.reverse();
		this.props.setValue(Number(dom.target.textContent), this.state.cell);
	}

	_makeTile(scaleX, scaleY, x, y) {
		let Tiles = [];

		for(let i = 1; i <= 9; i++) {
			let coord = this.coords[i - 1];
			Tiles.push(
				<Motion 
				key={i}
				style={this.getSpringParam(this.state.sequence, i)}>
					{
						({scaleX, scaleY, x, y}) =>
						<div 
							style={assign({}, this.props.customStyle, {
								top: coord.top,
								left: coord.left,
								transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
								WebkitTransform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
								position: 'absolute',
								width: this.props.width,
								height: this.props.height,
				            })}
							onClick={this.clickTile.bind(this)}
			            >{i}</div>
					}		
				</Motion>
			);
		}

		return Tiles;
	}

	render() {
		
		return (
			<div>
				{this._makeTile()}
			</div>
		);
	}
}

Tile.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	distance: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	onOpenAnimationEnd: PropTypes.func,
	onCloseAnimationEnd: PropTypes.func,
	customStyle: PropTypes.object,
	customClass: PropTypes.string
}
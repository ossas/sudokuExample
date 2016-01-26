import React, {Component, PropTypes} from 'react';
import assign from 'react/lib/Object.assign';
import {Motion, spring, presets} from 'react-motion';
import './index.less';

export default class Button extends Component{
	constructor(props) {
	    super(props);
	    this.timerIds = [null, null, null];
	    this.state = {sequence: 0};
	    const {x, y, distance} = this.props;
	    this.params = [{	
	        scaleX : spring(0, [1500, 100]),
	        scaleY : spring(0, [1500, 100]),
	        x,
	        y : spring(y, [1500, 50])
		},
		{
	        scaleX : spring(0.7, [1500, 150]),
	        scaleY : spring(1.6, [1500, 150]),
	        x,
	        y : spring(y+distance, [1500, 100])
	    },
	    {
	        scaleX : spring(1, [1500, 18]),
	        scaleY : spring(1, [1500, 18]),
	        x,
	        y : spring(y+distance, [1500, 100])
	    }];
	}


	start() {
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

	render() {
		const {width, height, customStyle, customClass} = this.props;
		return (
			<Motion style={this.params[this.state.sequence]}>
				{
					({scaleX, scaleY, x, y}) =>
					<div 
						style={assign({}, customStyle, {
						transform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
						WebkitTransform: `translate3d(${x}px, ${y}px, 0) scaleX(${scaleX}) scaleY(${scaleY})`,
						position: 'absolute',
						width,
						height,
		            })}>
						aa
					</div>		
				}		
			</Motion>
		);
	}
}

Button.propTypes = {
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
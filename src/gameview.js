import React, {Component} from 'react';
import Box from './box';
import './index.less';

export default class Gameview extends Component{
    _makeGame() {
        const gameData = sdm.getGameData('random');
        let boxes = [];

        for(let i = 0; i < 9; i++) {
            boxes.push(
                <Box
                    key={i}
                    data={gameData.data[i]}
                    event={this.setValueEvent}
                >
                </Box>
            );
        }

        return boxes;
    }

    setValueEvent(cell) {
        var value = prompt('set');

        if(value >= 1 && value <= 9) {
            cell.setState({
                value : Number(value)
            })
        }

    }

	render() {
		return (
			<div className='game' >
                {this._makeGame()}
			</div>
		);
	}
}
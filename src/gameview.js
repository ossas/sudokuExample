import React, {Component} from 'react';
import Box from './box';
import './index.less';

export default class Gameview extends Component{
    _makeGame() {
        const gameData = sdm.getGameData();
        let boxes = [];

        for(let i = 0; i < 9; i++) {
            boxes.push(
                <Box
                    key={i}
                    data={gameData[i]}
                >
                </Box>
            );
        }

        console.log(boxes);

        return boxes;
    }

	render() {
		return (
			<div className='game'>
                {this._makeGame()}
			</div>
		);
	}
}
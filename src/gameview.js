import React, {Component} from 'react';
import Box from './box';
import './index.less';

let _gameView;
function cloneObject(object) {
    return JSON.parse(JSON.stringify(object))
}

export default class Gameview extends Component{
    constructor() {
        super();
        _gameView = this;
        const gameData = sdm.getGameData('random');
        this.state = {
            gameData: gameData,
            userData : cloneObject(gameData.data)
        };
    }

    

    _makeGame() {
        let boxes = [];

        for(let i = 0; i < 9; i++) {
            boxes.push(
                <Box
                    key={i}
                    position={i}
                    data={this.state.gameData.data[i]}
                    event={this.setValueEvent}
                >
                </Box>
            );
        }

        return boxes;
    }

    setValueEvent(cell) {
        var value = Number(prompt('set'));

        if(value >= 1 && value <= 9) {
            cell.setState({
                value : value
            })

            let {_i, _j, _k} = cell.props;
            _gameView.state.userData[_i][_j][_k] = value;
        }

        console.log(_gameView.state.userData);

    }

	render() {
		return (
			<div className='game' >
                {this._makeGame()}
			</div>
		);
	}
}
import React, {Component} from 'react';
import Box from './box';
import './index.less';


function cloneObject(object) {
    return JSON.parse(JSON.stringify(object))
}

export default class Gameview extends Component{
    constructor() {
        super();
        let gameData = sdm.getGameData('random');
        this.state = {
            gameData: gameData,
            userData : cloneObject(gameData.data)
        };
    }    

    _makeGame() {
        let boxes = [];
        let boundClick = this.setValueEvent.bind(this);

        for(let i = 0; i < 9; i++) {
            boxes.push(
                <Box
                    key={i}
                    position={i}
                    data={this.state.gameData.data[i]}
                    event={boundClick}
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
            this.state.userData[_i][_j][_k] = value;
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
import React, {Component} from 'react';
import Box from './box';
import Button from './button';
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
            userData: cloneObject(gameData.data),
            failCells: []
        };
    }    

    _makeGame() {
        let boxes = [];
        let boundClick = this.setValueEvent.bind(this);

        for(let i = 0; i < 9; i++) {
            boxes.push(
                <Box
                    ref={i}
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


    _inputButton() {
        return (
            <Button
                ref={0}
                key={1}
                x = {0}
                y = {0}
                distance={10}
                width={30}
                height={30}
                customStyle={{
                    color: "#fff",
                    textAlign:"center",
                    lineHeight:"50px",
                    backgroundColor: "#E74C3C",
                    border: "solid 1px #E74C3C",
                    borderRadius: "40%"
                }}
            >
            </Button>);
    }

    setValueEvent(cell) {
        window.a = this.refs['0']
        console.log(this.refs);
        return;
        var value = Number(prompt('set'));

        if(value >= 1 && value <= 9) {
            cell.setState({
                value : value
            })

            let {_i, _j, _k} = cell.props;
            this.state.userData[_i][_j][_k] = value;

            var check_data = sdm.gameDataCheck(this.state.userData);

            this.state.failCells.forEach(function (cell) {
                cell.setState({
                    isFail: false
                });
            });

            if(check_data.state === 'fail') {
                for(let key in check_data.box) {
                    var coord = check_data.box[key];
                    var cell = this.refs[coord._i].refs['' + coord._j + coord._k];
                    cell.setState({
                        isFail : true
                    });
                    this.state.failCells.push(cell);
                }
                for(let key in check_data.rows) {
                    var coord = check_data.rows[key];
                    var cell = this.refs[coord._i].refs['' + coord._j + coord._k];
                    cell.setState({
                        isFail : true
                    });
                    this.state.failCells.push(cell);
                }
                for(let key in check_data.cols) {
                    var coord = check_data.cols[key];
                    var cell = this.refs[coord._i].refs['' + coord._j + coord._k];
                    cell.setState({
                        isFail : true
                    });
                    this.state.failCells.push(cell);
                }

            } else if(check_data.state === 'complete') {
                alert('게임완료');
            }
        }
    }

	render() {
		return (
			<div className='game' >
                {this._makeGame()}
                {this._inputButton()}
			</div>
		);
	}
}
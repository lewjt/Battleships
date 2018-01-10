import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PlayerBoard from './playerBoard';
import ComputerBoard from './computerBoard';
import Title from '../components/title/container'
import Deck from '../components/deck/container'
import { setWidth, setBlockSize } from '../actions/meta';
import { initialiseComputerShips, computerMakeGuess } from '../actions/computer';

require('./sass/main.scss');

class Main extends Component {

    componentDidMount() {
        window.addEventListener('resize', this.props.setWidth.bind(this));
        window.addEventListener('resize', this.props.setBlockSize.bind(this));
        this.props.initialiseComputerShips(this.props.computerShips);
    }

    componentDidUpdate() {
        const gameReady = _.find(this.props.playerShips, (ship) => {return !ship.placed});        
        // gameReady = undefined indicates that there are no ships left for the placer to place on the board.
        if (gameReady === undefined) {
            if (this.props.currentTurn === null) {
                // this kicks off the first turn of the game
                this.initialiseFirstGo();
            } else {
                if (this.props.currentTurn === 'computer') {
                    // it is the computers turn
                    this.props.computerMakeGuess(this.props.playerBoard, this.props.playerShips);
                } else {
                    // itis the players turn.
                    // display a notification indicating that it is the players go.
                }
            }
        }
    }

    initialiseFirstGo() {
        // 0 = computer, 1 = player
        let flipCoin = Math.floor( Math.random() * 2);
        console.log(flipCoin);

        if (flipCoin === 0) {
            this.props.computerMakeGuess(this.props.playerBoard, this.props.playerShips);
        } else {
            // display a notification indicating that it is the players go.
        }
    }

    render() {
        return (
            <div className={"main"}>
                <Title text={"Battleships"} type={"header"} />
                <div className={"boardContainer"}>
                    <div className={"player"}>
                        <Title text={"Player"} type={"subheader"} />
                        <PlayerBoard />
                    </div>
                    <div className={"computer"}>
                        <Title text={"Computer"} type={"subheader"} />
                        <ComputerBoard />
                    </div>
                </div>
                <Deck />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setWidth, setBlockSize, initialiseComputerShips, computerMakeGuess }, dispatch)
}

function mapStateToProps(state) {
    return { computerShips: state.computer.ships, playerBoard: state.player.board, playerShips: state.player.ships, currentTurn: state.meta.currentTurn }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

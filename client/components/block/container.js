// CODE CLEANUP
// 'block--containsShip': this.props.containsShip && this.props.type === "computer"
// const textToDisplay = this.props.containsShip ? this.props.shipID : null;
// these can be removed on completion, they are just so i can see where the computers ships are located during development.

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { setBlockSize } from '../../actions/meta';
import BlockComponent from './block';

require('./sass/block.scss');

class Block extends Component {

    state = {
        hovering: false
    }

    mouseEnterEventHandler = () => {
        this.setState({hovering: true});

        if (this.props.type === 'player') {
            this.props.blockMouseEnter(this.props.id);
        }
    };

    mouseLeaveEventHandler = () => {
        this.setState({hovering: false});

        if (this.props.type === 'player') {
            this.props.blockMouseLeave(this.props.id);
        }
    };

    mouseClickEventHandler = () => {
        if (this.props.type === 'player') {
            this.props.placeShipAttempt();
        } else if (this.props.type === 'computer') {
            this.props.playerGuessAttempt(this.props.id);
        }
    };

    render () {
        const classes = cx({
            'block': true,
            [`block--style-${this.props.style}`]: this.props.style !== undefined,
            'block--hover': this.state.hovering && this.props.type === "computer" && this.props.hoverable,
            'block--containsShip': this.props.containsShip,
            'block--targeted': this.props.targeted && !this.props.containsShip,
            'block--targeted-hit': this.props.targeted && this.props.containsShip,
            'block--selected': this.props.isSelected || this.props.isSelected === 0,
            'block--selected-error': this.props.isSelected && this.props.isSelectedError
        });

        const styles = { width: this.props.blockSize, height: this.props.blockSize}
        const textToDisplay = this.props.containsShip ? this.props.shipID : null;

        return (
            <BlockComponent
                classes={classes}
                styles={styles}
                mouseEnterEventHandler={this.mouseEnterEventHandler}
                mouseLeaveEventHandler={this.mouseLeaveEventHandler}
                onClickEvent={this.mouseClickEventHandler}
                text={textToDisplay}
                {...this.props}
            />
        );
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setBlockSize }, dispatch)
}

function mapStateToProps(state) {
    return { width: state.meta.width, blockSize: state.meta.blockSize }
}

export default connect(mapStateToProps, mapDispatchToProps)(Block);
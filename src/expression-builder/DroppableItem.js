import React from 'react';
import PropTypes from 'prop-types';

class DroppableItem extends React.Component {
    state = {
        hovered: false
    };
    isHovered = false;

    styles = {
        width: this.state.hovered ? '50px' : '12px',
        height: '24px',
        borderRadius: '4px',
        border: 'dotted 1px rgba(0, 0, 0, 0.12)',
        margin: '4px',
    }

    hover() {
        if (!this.state.hovered) {
            this.setState({
                hovered: true
            })
            // this.isHovered = true;
        }
    }

    leave() {
        this.setState({
            hovered: false
        })
        // this.isHovered = false;
    }

    render() {
        return (
            <div
                // className='droppable'
                draggable='true'
                onDragOver={() => {this.props.onDragOver(this); this.hover()}}
                onDragLeave={() => {this.props.onDragLeave(this); this.leave()}}
                style={this.styles}
                data-index={this.props.index}
            ></div>
        );
    }
}

DroppableItem.propTypes = {
    index: PropTypes.number.isRequired
}

export default DroppableItem
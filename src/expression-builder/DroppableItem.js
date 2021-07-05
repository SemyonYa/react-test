import React from 'react';
import PropTypes from 'prop-types';

class DroppableItem extends React.Component {
    state = {
        hovered: false
    };

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
        }

    }

    leave() {
        this.setState({
            hovered: false
        })
    }

    render() {
        return (
            <div
                // className='droppable'
                draggable='true'
                onDragOver={(e) => { this.props.onDragOver(e, this); this.hover() }}
                onDragLeave={() => { this.props.onDragLeave(); this.leave(); console.log('leave'); }}
                onDragEnd={() => {console.log('end');}}
                style={{
                    width: this.state.hovered ? '50px' : '12px',
                    height: '24px',
                    borderRadius: '4px',
                    border: 'dotted 1px rgba(0, 0, 0, 0.12)',
                    margin: '4px',
                    transition: '.3s',
                }}
            // data-index={this.props.index}
            ></div>
        );
    }
}

DroppableItem.propTypes = {
    index: PropTypes.number.isRequired
}

export default DroppableItem
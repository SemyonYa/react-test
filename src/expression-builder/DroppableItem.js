import React from 'react';
import PropTypes from 'prop-types';

class DroppableItem extends React.Component {

    styles = {
        width: '12px',
        height: '24px',
        borderRadius: '4px',
        border: 'dotted 1px rgba(0, 0, 0, 0.12)',
        margin: '4px',
    }

    render() {
        return (
            <div
                draggable='true'
                onDragOver={() => this.props.onDragOver(this)}
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
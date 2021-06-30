import React from 'react';
import PropTypes from 'prop-types';

class DroppableItem extends React.Component {
    render() {
        return (
            <div draggable='true' className='expression-droppable' data-index={this.props.index}></div>
        );
    }
}

DroppableItem.propTypes = {
    index: PropTypes.number.isRequired
}

export default DroppableItem
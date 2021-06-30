import React from 'react';
import PropTypes from 'prop-types';

class DraggableItem extends React.Component {
    wrapStyles = {
        height: '20px',
        width: '50px',
        borderRadius: '4px',
        border: 'solid 1px #efefef'
    }
    
    labelStyles = {
        width: '10px',
        height: '100%',
        borderRadius: '4px',
        backgroundColor: '#efefef',
    }

    render() {
        console.log(this.props.type);
        return (
            <div style={this.wrapStyles} draggable='true' className='draggable-item-wrap' data-type={this.props.type}>
                <div style={this.labelStyles} className='draggable-item-label'></div>
                <div className='draggable-item-elem'></div>
            </div>
        );
    }
}

DraggableItem.propTypes = {
    type: PropTypes.string.isRequired,
    node: PropTypes.node
}

export default DraggableItem
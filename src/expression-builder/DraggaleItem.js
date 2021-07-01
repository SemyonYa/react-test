import React from 'react';
import PropTypes from 'prop-types';
import { types } from './ExpressionBuilder';

class DraggableItem extends React.Component {
    opertors = [
        '+',
        '-',
        '*',
        '/',
        '==',
        '&&',
        '||',
        '>',
        '>=',
        '<',
        '<=',
    ];


    wrapStyles = {
        height: '20px',
        width: '65px',
        // maxWidth: '100px',
        borderRadius: '4px',
        border: 'solid 1px #efefef',
        display: 'flex',
        overflow: 'hidden'
    }

    labelStyles = {
        flex: '1 0 10px',
        height: '100%',
        borderRadius: '4px',
        backgroundColor: '#efefef',
    }

    itemStyles = {
        display: 'flex',
        flex: '0 1 calc(100% - 10px)',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '11px',
        padding: '0 3px',
        lineHeight: 1,
    }

    inputStyles = {
        width: '100%',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: 'solid 1px #cecece'
    }

    // onDragStart() 

    render() {
        return (
            <div
                onDragStart={() => this.props.onDragStart(this)}
                // onDrag={() => this.props.onDrag()}
                onDragEnd={() => this.props.onDragEnd(this)}
                style={this.wrapStyles} draggable='true'
                data-type={this.props.type}
            >
                <div style={this.labelStyles}></div>
                {this.props.type === types.operator &&
                    <div style={this.itemStyles}>
                        <select style={this.inputStyles}>
                            {this.opertors.map(o =>
                                <option value={o} key={o}>{o}</option>
                            )}
                        </select>
                    </div>
                }
                {this.props.type === types.brackets &&
                    <div style={this.itemStyles}>()</div>
                }
                {this.props.type === types.bracketsLeft &&
                    <div style={this.itemStyles}>(</div>
                }
                {this.props.type === types.bracketsRight &&
                    <div style={this.itemStyles}>)</div>
                }
                {this.props.type === types.model &&
                    <div style={this.itemStyles}>model.prop</div>
                }
                {this.props.type === types.num &&
                    <div style={this.itemStyles}>
                        <input type='number' style={this.inputStyles} />
                    </div>
                }
            </div>
        );
    }
}

DraggableItem.propTypes = {
    type: PropTypes.string.isRequired,
    node: PropTypes.node
}

export default DraggableItem
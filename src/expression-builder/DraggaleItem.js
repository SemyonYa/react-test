import React from 'react';
import PropTypes from 'prop-types';
import { types } from './ExpressionBuilder';

class DraggableItem extends React.Component {
    // value;

    constructor(props) {
        super(props);
        // if (props.type === types.bracketsLeft) {
        //     this.value = '('
        // } else if (props.type === types.bracketsRight) {
        //     this.value = ')'
        // }
    }

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

    changeNumber(e) {
        this.value = e.target.value;
        console.log(this.value);
    }

    render() {
        return (
            <div
                onDragStart={() => this.props.onDragStart(this)}
                // onDrag={() => this.props.onDrag()}
                onDragEnd={() => this.props.onDragEnd(this)}
                style={this.wrapStyles} draggable='true'
                // data-type={this.props.type}
            >
                <div style={this.labelStyles}></div>
                {this.props.type === types.operatorSeleect &&
                    <div style={this.itemStyles}>
                        <select style={this.inputStyles} onChange={this.changeNumber.bind(this)}>
                            {this.opertors.map(o =>
                                <option value={o} key={o}>{o}</option>
                            )}
                        </select>
                    </div>
                }
                {this.props.type === types.operator &&
                    <div style={this.itemStyles}>+/-</div>
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
                {this.props.type === types.modelSelect &&
                    <div style={this.itemStyles}>
                        <select style={this.inputStyles} onChange={this.changeNumber.bind(this)}>
                            <option key='qwerty'>qwerty</option>
                        </select>
                    </div>
                }
                {this.props.type === types.num &&
                    <div style={this.itemStyles}>num</div>
                }
                {this.props.type === types.numInput &&
                    <div style={this.itemStyles}>
                        <input type='number' style={this.inputStyles} onChange={this.changeNumber.bind(this)} />
                    </div>
                }
            </div>
        );
    }

    ///
    //  STYLES
    ///

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
}

DraggableItem.propTypes = {
    type: PropTypes.string.isRequired,
    // node: PropTypes.node
}

export default DraggableItem
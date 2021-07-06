import React from 'react';
import PropTypes from 'prop-types';
import { types } from './ExpressionBuilder';

class DraggableItem extends React.Component {
    // value;

    constructor(props) {
        super(props);
        this.modelProps = [];
        for (let p in props.viewModel) {
            this.modelProps.push(p);
        }
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

    // changeNumber(e) {
    //     this.value = e.target.value;
    //     console.log(this.value);
    //     console.log(this.props);
    //     this.props.onUpdateValue(this.props.id, e.target.value);
    // }

    render() {
        return (
            <div
                onDragStart={() => this.props.onDragStart(this)}
                // onDrag={() => this.props.onDrag()}
                onDragEnd={() => this.props.onDragEnd(this)}
                // onDragEnter={(e) => { console.log('enter', e); }}
                style={this.itemStyles} draggable='true'
            >
                {/* <div style={this.labelStyles}></div> */}
                {/* {this.props.type === types.operatorSeleect &&
                    // <div style={this.itemStyles}>
                        <select style={this.inputStyles} onChange={this.changeNumber.bind(this)}>
                            {this.opertors.map(o =>
                                <option value={o} key={o}>{o}</option>
                            )}
                        </select>
                    // </div>
                } */}
                {this.props.type === types.operator &&
                    <span>+/-</span>
                    // <div style={this.itemStyles}>+/-</div>
                }
                {this.props.type === types.brackets &&
                    <span>()</span>
                    // <div style={this.itemStyles}>()</div>
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
                {/* {this.props.type === types.modelSelect &&
                    <div style={this.itemStyles}>
                        <select style={this.inputStyles} onChange={this.changeNumber.bind(this)}>
                            {this.modelProps.map(p =>
                                <option key={p}>{p}</option>
                            )}
                        </select>
                    </div>
                } */}
                {this.props.type === types.num &&
                    <div style={this.itemStyles}>num</div>
                }
                {/* {this.props.type === types.numInput &&
                    <div style={this.itemStyles}>
                        <input type='number' style={this.inputStyles} onChange={this.changeNumber.bind(this)} />
                    </div>
                } */}
            </div>
        );
    }

    ///
    //  STYLES
    ///

    itemStyles = {
        position: 'relative',
        height: '20px',
        minWidth: '50px',
        borderRadius: '4px',
        border: 'solid 1px #efefef',
        margin: '0 4px',

        display: 'flex',
        // flex: '0 1 calc(100% - 10px)',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '11px',
        padding: '0 3px',
        lineHeight: 1,
    }

    // labelStyles = {
    //     flex: '1 0 10px',
    //     height: '100%',
    //     borderRadius: '4px',
    //     backgroundColor: '#efefef',
    //     cursor: 'pointer',
    // }

    // itemStyles = {
        // display: 'flex',
        // flex: '0 1 calc(100% - 10px)',
        // justifyContent: 'center',
        // alignItems: 'center',
        // fontSize: '11px',
        // padding: '0 3px',
        // lineHeight: 1,
    // }

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
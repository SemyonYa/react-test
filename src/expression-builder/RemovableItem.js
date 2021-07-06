import React from 'react';
import { types } from './ExpressionBuilder';

class RemovableItem extends React.Component {

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

    // get value() {return this.props.value};

    changeNumber(e) {
        this.value = e.target.value;
        console.log(this.value);
        console.log(this.props);
        this.props.onUpdateValue(this.props.id, e.target.value);
    }

    render() {
        return (
            <div style={this.wrapStyles}>
                {/* FIELDS */}
                {this.props.type === types.operatorSeleect &&
                    <div style={this.itemStyles}>
                        <select style={this.inputStyles} onChange={this.changeNumber.bind(this)}>
                            {this.opertors.map(o =>
                                <option value={o} key={o}>{o}</option>
                            )}
                        </select>
                    </div>
                }
                {this.props.type === types.modelSelect &&
                    <div style={this.itemStyles}>
                        <select style={this.inputStyles} onChange={this.changeNumber.bind(this)}>
                            {this.modelProps.map(p =>
                                <option value={p} key={p}>{p}</option>
                            )}
                        </select>
                    </div>
                }
                {this.props.type === types.numInput &&
                    <div style={this.itemStyles}>
                        <input type='number' style={this.inputStyles} onChange={this.changeNumber.bind(this)} />
                    </div>
                }
                {/* BRACKETS */}
                {this.props.type === types.bracketsLeft &&
                    <div style={this.itemStyles}>(</div>
                }
                {this.props.type === types.bracketsRight &&
                    <div style={this.itemStyles}>)</div>
                }
                {/* REMOVE */}
                <div style={this.removeStyle} onClick={() => this.props.onRemove(this.props.id)}>-</div>
            </div>
        );
    }

    ///
    //  STYLES
    ///

    wrapStyles = {
        position: 'relative',
        height: '20px',
        width: '65px',
        borderRadius: '4px',
        border: 'solid 1px #efefef',
        display: 'flex',
        // overflowX: 'hidden',
        // overflowY: 'none'
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

    removeStyle = {
        position: 'absolute',
        bottom: '-6px',
        right: '0px',
        width: '10px',
        height: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
        lineHeight: '1',
        borderRadius: '50%',
        backgroundColor: 'blue',
        fontSize: '10px',
        color: 'white',
        cursor: 'pointer',
    }
}

RemovableItem.propTypes = {

}

export default RemovableItem 
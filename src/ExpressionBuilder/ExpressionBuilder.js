import React from 'react';
import PropTypes from 'prop-types';
import Draggable from './Draggable';
// import { isNaN } from 'core-js/core/number';

export class ExpressionPart {
    constructor(type, value, key) {
        this.type = type;
        this.value = value;
        this.key = key;
    }
}

export const types = {
    draggable: {
        operator: 'operator',
        brackets: 'brackets',
        num: 'num',
        model: 'model',
    },
    part: {
        operatorSeleect: 'operatorSelect',
        bracketsLeft: 'bracketsLeft',
        bracketsRight: 'bracketsRight',
        numInput: 'numInput',
        modelSelect: 'modelSelect',
    },
};

export const operators = [
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

///
// Component
///

class ExpressionBuilder2 extends React.Component {
    activeDraggable = null;
    activeDroppable = null;

    constructor(props) {
        super(props);
        this.viewModelProps = [];

        for (let p in props.viewModel) {
            this.viewModelProps.push(p);
        }
    }

    get expression() {
        return this.props.expression;
    }

    parseExpresiion() {
        const parts = [];
        const stringParts = this.props.expression.split(' ');
        for (let sp of stringParts) {
            if (sp === '(') {
                parts.push(new ExpressionPart(types.part.bracketsLeft, null, null));
            } else if (sp === ')') {
                parts.push(new ExpressionPart(types.part.bracketsRight, null, null));
            } else if (!isNaN(+sp)) {
                parts.push(new ExpressionPart(types.part.numInput, +sp, null));
            } else if (operators.includes(sp)) {
                parts.push(new ExpressionPart(types.part.operatorSeleect, sp, null));
            } else if (this.viewModelProps.includes(sp)) {
                parts.push(new ExpressionPart(types.part.modelSelect, sp, null))
            } else {
                // throw 
            }
        }
        console.log(parts);
        console.log(stringParts);
        return parts;
    }

    render() {
        const draggables = [];
        for (let d in types.draggable) {
            draggables.push(this.buildDraggable(types.draggable[d]));
        }
        const parts = this.parseExpresiion();
        return (
            <div className='wrap'>
                <div className='header'>
                    <span className='header-caption'>Элементы конструктора выражения:</span>
                    <div className='parts'>
                        {draggables}
                    </div>
                </div>
                <div className='test2'>
                    {this.props.expression}
                    {/* {this.getDroppable(0)}
                    {this.state.nodes.map((n, index) =>
                        [
                            this.getRemovable(n.type, n.key, n.value),
                            this.getDroppable(index + 1),
                        ]
                    )} */}
                </div>
            </div>
        );
    }

    ///
    // Elements
    ///

    buildDraggable(draggableType) {
        return (
            <div 
                style={this.draggableStyle} 
                draggable={true} 
                onDragStart={() => {this.activeDraggable = draggableType}} 
                key={draggableType}
            >
                {draggableType}
            </div>
        );
    }

    buildDroppable(index) {
        return (
            <div 
                style={this.droppableStyle} 
                draggable={true} 
                key={index}
            ></div>
        );
    }

    ///
    // Styles
    ///

    draggableStyle = {
        height: '1.5rem',
        minWidth: '4rem',
        borderRadius: '4px',
        border: 'solid 1px #efefef',
        margin: '0 4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '.75rem',
        padding: '0 3px',
        lineHeight: 1,
    }

    droppableStyle = {
        height: '1.5rem',
        minWidth: '.4rem',
        borderRadius: '4px',
        border: 'solid 1px #efefef',
        margin: '0 4px',
    }
}

ExpressionBuilder2.propTypes = {
    expression: PropTypes.string.isRequired,
    viewModel: PropTypes.object.isRequired,
}

export default ExpressionBuilder2
import React from 'react';
import './ExpressionBuilder.css';
import { Draggable, Droppable } from 'react-drag-and-drop';

const types = {
    plus: 'plus',
    brackets: 'brackets',
    num: 'num',
};

class ExpressionBuilder extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onDrop(data) {
        console.log(typeof data, data);
        if (data['operator'] === types.plus) {
            console.log(this);
            const node = this.generateNode(types.plus);
            this.insertNodeToExpression(node);
        } else if (data['operator'] === types.brackets) {
            console.log('()');
            const node = this.generateNode(types.brackets);
            this.insertNodeToExpression(node);
        } else if (data['value'] === types.num) {
            console.log('num');
            const node = this.generateNode(types.num);
            this.insertNodeToExpression(node);
        }
    }

    render() {
        return (
            <div className='wrap'>
                <div className='header'>
                    <span className='header-caption'>Элементы конструктора выражения:</span>
                    <span className='header-list'>
                        <Draggable type="operator" data="plus">+</Draggable>
                        <Draggable type="operator" data="brackets">()</Draggable>
                        <Draggable type="value" data="num">num</Draggable>
                    </span>
                </div>
                <Droppable types={['value', 'operator']} onDrop={this.onDrop.bind(this)}><div className='expression'></div></Droppable>
            </div>
            );
    }

    generateNode(elemType) {
        let draggableNode = document.createElement('div');
        draggableNode.setAttribute('type', 'value');
        draggableNode.setAttribute('draggable', 'true');
        draggableNode.classList.add('expression-node');
        if (elemType === types.plus) {
            draggableNode.setAttribute('data', types.plus);
            draggableNode.innerText = '+'
        } else if (elemType === types.brackets) {
            draggableNode.setAttribute('data', types.brackets);
            draggableNode.innerText = '()';
        } else if (elemType === types.num) {
            draggableNode.setAttribute('data', types.num);
            draggableNode.innerText = 'num';
        }
        return draggableNode;
    }

    insertNodeToExpression(node) {
        let expressionNode = document.querySelector('.expression');
        expressionNode.append(node);
    }
}

export default ExpressionBuilder
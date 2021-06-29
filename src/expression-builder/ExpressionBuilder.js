import React from 'react';
import './ExpressionBuilder.css';
// import { Draggable, Droppable } from 'react-drag-and-drop';

const types = {
    operator: 'plus',
    brackets: 'brackets',
    num: 'num',
    model: 'model'
};

class Fake {
    id = null;
    name = null;
    age = null;
}

class ExpressionBuilder extends React.Component {
    constructor(props) {
        super(props);
    }

    activeType = '';
    currentTarget = null;
    expressionData = [];

    componentDidMount() {
        this.buildExpression();
        let drags = document.querySelectorAll('.parts-item');
        drags.forEach((elem, index) => {
            elem.draggable = true;
            elem.addEventListener('dragstart', (e) => {
                this.activeType = e.target.getAttribute('data-type');
            });
            elem.addEventListener('dragend', (e) => {
                const indexForNode = this.currentTarget?.getAttribute('data-index');
                if (this.activeType && this.currentTarget) {
                    this.pushNodesToExpressionData(this.generateNodes(this.activeType), indexForNode);
                    this.buildExpression();
                }
                this.activeType = '';
            });
            elem.addEventListener('drag', (e) => {
                this.currentTarget = null;
            });
        });
    }

    render() {
        return (
            <div className='wrap'>
                <div className='header'>
                    <span className='header-caption'>Элементы конструктора выражения:</span>
                    <div className='parts'>
                        <div className='parts-item' data-type="plus">+</div>
                        <div draggable='true' className='parts-item' data-type="brackets">()</div>
                        <div draggable='true' className='parts-item' data-type="num">num</div>
                        <div draggable='true' className='parts-item' data-type="model">model.prop</div>
                    </div>
                </div>
                <div className='expression'></div>
                <div className='expression2'></div>
            </div>
            );
    }

    generateNodes(elemType) {
        let nodes = [];
        if (elemType === types.brackets) {
            nodes.push(getDraggableNode('(', null, 'left'));
            nodes.push(getDraggableNode(')', null, 'right'));
        } else {
            if (elemType === types.operator) {
                let ddList = document.createElement('select');
                ddList.addEventListener('change', (e) => {
                    e.target.setAttribute('data-description', e.target.value);
                    this.expressionToString();
                });
                ddList.append(...['+', '-', '>', '<', '>=', '<=', '=='].map((item) => {
                    let option = document.createElement('option');
                    option.innerText = item;
                    option.value = item;
                    return option;
                }));
                nodes.push(getDraggableNode(null, ddList, '+'));
            } else if (elemType === types.num) {
                let input = document.createElement('input');
                input.value = 1;
                input.addEventListener('input', (e) => {
                    this.expressionToString();
                });
                nodes.push(getDraggableNode(null, input));
            } else if (elemType === types.model) {
                let ddList = document.createElement('select');
                const props = [];
                // TODO: 
                const fake = new Fake();
                for (let prop in fake) {
                    console.log(prop);
                    props.push(prop);
                }
                ddList.append(...props.map((p) => {
                    let option = document.createElement('option');
                    option.innerText = `${Fake.name}.${p}`;
                    option.value = p;
                    return option;
                }));

                ddList.addEventListener('change', (e) => {
                    e.target.setAttribute('data-description', e.target.value);
                    this.expressionToString();
                });

                nodes.push(getDraggableNode(null, ddList, props[0]));
            }
        }

        function getDraggableNode(innerText, draggableNode, description) {
            if (!draggableNode) {
                draggableNode = document.createElement('div');
                draggableNode.innerText = innerText;
            }
            draggableNode.setAttribute('draggable', 'true');
            draggableNode.classList.add('expression-node');
            draggableNode.setAttribute('data-type', elemType);
            if (description)
                draggableNode.setAttribute('data-description', description);
            return draggableNode;
        }
        return nodes;
    }

    generateDroppable(dataNodeIndex = null) {
        let droppableNode = document.createElement('div');
        droppableNode.classList.add('expression-droppable');
        droppableNode.draggable = true;
        if (dataNodeIndex)
            droppableNode.setAttribute('data-index', dataNodeIndex);
        droppableNode.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.currentTarget = e.target;
            });
        return droppableNode;
    }

    appendNodeToExpression(node) {
        let expressionNode = document.querySelector('.expression');
        expressionNode.append(node);
    }

    clearExpression() {
        document.querySelector('.expression').innerHTML = null;
    }

    pushNodesToExpressionData(nodes, index = null) {
         if (index !== null) {
            this.expressionData = [
                ...this.expressionData.slice(0, index),
                ...nodes,
                ...this.expressionData.slice(index),
            ];
         } else {
             this.expressionData.push(...nodes);
         }
    }

    buildExpression() {
        this.clearExpression();
        this.appendNodeToExpression(this.generateDroppable('0'));
        this.expressionData.forEach((elem, index) => {
            this.appendNodeToExpression(elem);
            this.appendNodeToExpression(this.generateDroppable(index + 1));
        });

        this.expressionToString();
    }

    expressionToString() {
        const expressionString = this.expressionData.map((elem, index) => {
            const currentType = elem.getAttribute('data-type');
            if (currentType === types.operator || currentType === types.model) {
                return elem.getAttribute('data-description');
            } else if (currentType === types.num) {
                return elem.value;
            } else if (currentType === types.brackets) {
                if (elem.getAttribute('data-description') === 'left') {
                    return '(';
                } else {
                    return ')';
                }
            }
        }).join(' ');
        document.querySelector('.expression2').innerText = expressionString;
    }
}

export default ExpressionBuilder
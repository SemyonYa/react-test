import React from 'react';
import './ExpressionBuilder.css';
import DraggableItem from './DraggaleItem';
import DroppableItem from './DroppableItem';
// import { Draggable, Droppable } from 'react-drag-and-drop';

///
// Helpers
///

export class ExpressionPart {
    constructor(key, type, value) {
        this.key = key;
        this.type = type;
        this.value = value;
    }
}

export const types = {
    operator: 'operator',
    operatorSeleect: 'operatorSelect',
    brackets: 'brackets',
    bracketsLeft: 'bracketsLeft',
    bracketsRight: 'bracketsRight',
    num: 'num',
    numInput: 'numInput',
    model: 'model',
    modelSelect: 'modelSelect',
};

///
// COMPONENT
///

class ExpressionBuilder extends React.Component {
    activeDraggable = null;
    activeDroppable = null;
    parts = [];

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        }
        // this.buildExpressionNodes();
        // this.printExpression();
    }

    updateValue(key, val) {
        let part = this.parts.find(p => p.key === key);
        if (part) part.value = val;
        this.printExpression();
    }

    render() {
        return (
            <div className='wrap'>
                <div className='header'>
                    <span className='header-caption'>Элементы конструктора выражения:</span>
                    <div className='parts'>
                        {[types.brackets, types.operator, types.num, types.model].map((t, index) =>
                            this.getDraggable(t, index)
                        )}
                    </div>
                </div>
                <div className='test2' style={{ display: 'flex' }}>
                    {this.getDroppable(0, 0)}
                    {this.state.nodes.map((n, index) =>
                        [
                            this.getDraggable(n.type, n.key),
                            this.getDroppable(index + 1, index + 1),
                        ]
                    )}
                </div>
            </div>
        );
    }

    addParts(obj, index) {
        // console.log(obj, index);
        if (obj.props.type !== types.brackets) {
            let waitingType;
            switch (obj.props.type) {
                case types.num:
                    waitingType = types.numInput
                    break;
                case types.model:
                    waitingType = types.modelSelect
                    break;
                case types.operator:
                    waitingType = types.operatorSeleect
                    break;
                default:
                    break;
            }
            this.parts = [
                ...this.parts.slice(0, index),
                new ExpressionPart(1001 + this.parts.length, waitingType, 0),
                ...this.parts.slice(index),
            ];
        } else {
            this.parts = [
                ...this.parts.slice(0, index),
                new ExpressionPart(1001 + this.parts.length, types.bracketsLeft),
                new ExpressionPart(1001 + this.parts.length + 1, types.bracketsRight),
                ...this.parts.slice(index),
            ];
        }
        console.log(this.parts);
        this.activeDraggable = null;
        this.activeDroppable = null;

        this.buildExpressionNodes();
        this.printExpression();
    }

    removePart(key) {
        this.parts = this.parts.filter(p => p.key !== key)
        this.buildExpressionNodes();
        this.printExpression();
    }

    getDraggable(type, key) {
        return <DraggableItem
            onDragStart={(obj) => { this.activeDraggable = obj }}
            // onDrag={() => {this.activeDroppable = null}}
            onDragEnd={(obj) => { if (this.activeDraggable && this.activeDroppable) this.addParts.bind(this)(this.activeDraggable, this.activeDroppable.props.index) }} // add condition
            onUpdateValue={this.updateValue.bind(this)}
            onRemove={(obj) => { console.log(obj); this.removePart.bind(this)(obj.props.key2) }}
            type={type}
            viewModel={this.props.viewModel}
            key={key}
            key2={key}
        />
    }

    getDroppable(index, key) {
        return <DroppableItem
            onDragOver={(e, obj) => { e.preventDefault(); this.activeDroppable = obj; console.log('over'); }}
            onDragLeave={() => {
                setTimeout(() => {
                    this.activeDroppable = null;
                }, 10);
                console.log(this.activeDroppable);
                console.log(this.activeDraggable);
            }}
            index={index}
            key={key}
        />;
    }

    buildExpressionNodes() {
        this.setState({
            nodes: this.parts.map(p => new ExpressionPart(p.key, p.type)),
        })
    }

    printExpression() {
        let expression = '';
        this.parts.forEach(p => {
            if (p.type === types.bracketsLeft) {
                expression += '('
            } else if (p.type === types.bracketsRight) {
                expression += ')'
            } else {
                expression += p.value;
            }
            expression += ' '
        });
        console.log(expression);
    }

    // buildNodesExpression() {
    // }





    ///
    ///
    ///


    // generateNodes(elemType) {
    //     let nodes = [];
    //     if (elemType === types.brackets) {
    //         nodes.push(getDraggableNode('(', null, 'left'));
    //         nodes.push(getDraggableNode(')', null, 'right'));
    //     } else {
    //         if (elemType === types.operator) {
    //             let ddList = document.createElement('select');
    //             ddList.addEventListener('change', (e) => {
    //                 e.target.setAttribute('data-description', e.target.value);
    //                 this.expressionToString();
    //             });
    //             ddList.append(...['+', '-', '>', '<', '>=', '<=', '=='].map((item) => {
    //                 let option = document.createElement('option');
    //                 option.innerText = item;
    //                 option.value = item;
    //                 return option;
    //             }));
    //             nodes.push(getDraggableNode(null, ddList, '+'));
    //         } else if (elemType === types.num) {
    //             let input = document.createElement('input');
    //             input.value = 1;
    //             input.addEventListener('input', (e) => {
    //                 this.expressionToString();
    //             });
    //             nodes.push(getDraggableNode(null, input));
    //         } else if (elemType === types.model) {
    //             let ddList = document.createElement('select');
    //             const props = [];
    //             // TODO: 
    //             const fake = new Fake();
    //             for (let prop in fake) {
    //                 console.log(prop);
    //                 props.push(prop);
    //             }
    //             ddList.append(...props.map((p) => {
    //                 let option = document.createElement('option');
    //                 option.innerText = `${Fake.name}.${p}`;
    //                 option.value = p;
    //                 return option;
    //             }));

    //             ddList.addEventListener('change', (e) => {
    //                 e.target.setAttribute('data-description', e.target.value);
    //                 this.expressionToString();
    //             });

    //             nodes.push(getDraggableNode(null, ddList, props[0]));
    //         }
    //     }

    //     const b = this;

    //     function getDraggableNode(innerText, draggableNode, description) {
    //         if (!draggableNode) {
    //             draggableNode = document.createElement('div');
    //             draggableNode.innerText = innerText;
    //         }
    //         draggableNode.setAttribute('draggable', 'true');
    //         draggableNode.classList.add('expression-node');
    //         draggableNode.setAttribute('data-type', elemType);
    //         draggableNode.addEventListener('dragstart', (e) => {
    //             b.activeType = e.target ? e.target.getAttribute('data-type') : null;
    //             console.log(b);
    //         });
    //         if (description)
    //             draggableNode.setAttribute('data-description', description);
    //         return draggableNode;
    //     }
    //     return nodes;
    // }

    // getDroppableNode(dataNodeIndex = null) {
    //     let droppableNode = document.createElement('div');
    //     droppableNode.classList.add('expression-droppable');
    //     droppableNode.draggable = true;
    //     if (dataNodeIndex)
    //         droppableNode.setAttribute('data-index', dataNodeIndex);
    //     droppableNode.addEventListener('dragover', (e) => {
    //         e.preventDefault();
    //         this.currentTarget = e.target;
    //     });
    //     return droppableNode;
    // }

    // appendNodeToExpression(node) {
    //     let expressionNode = document.querySelector('.expression');
    //     expressionNode.append(node);
    // }

    // clearExpression() {
    //     document.querySelector('.expression').innerHTML = null;
    // }

    // pushNodesToExpressionData(nodes, index = null) {
    //     if (index !== null) {
    //         this.expressionData = [
    //             ...this.expressionData.slice(0, index),
    //             ...nodes,
    //             ...this.expressionData.slice(index),
    //         ];
    //     } else {
    //         this.expressionData.push(...nodes);
    //     }
    // }

    // buildExpression() {
    //     this.clearExpression();
    //     this.appendNodeToExpression(this.getDroppableNode('0'));
    //     this.expressionData.forEach((elem, index) => {
    //         this.appendNodeToExpression(elem);
    //         this.appendNodeToExpression(this.getDroppableNode(index + 1));
    //     });

    //     this.expressionToString();
    // }

    // expressionToString() {
    //     const expressionString = this.expressionData.map((elem, index) => {
    //         const currentType = elem.getAttribute('data-type');
    //         if (currentType === types.operator || currentType === types.model) {
    //             return elem.getAttribute('data-description');
    //         } else if (currentType === types.num) {
    //             return elem.value;
    //         } else if (currentType === types.brackets) {
    //             if (elem.getAttribute('data-description') === 'left') {
    //                 return '(';
    //             } else {
    //                 return ')';
    //             }
    //         }
    //     }).join(' ');
    //     document.querySelector('.expression2').innerText = expressionString;
    // }
}

export default ExpressionBuilder
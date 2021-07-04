import React from 'react';
import './ExpressionBuilder.css';
import DraggableItem from './DraggaleItem';
import DroppableItem from './DroppableItem';
// import { Draggable, Droppable } from 'react-drag-and-drop';

export class ExpressionPart {
    // id;
    // type;
    // value;

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

class Fake {
    id = null;
    name = null;
    age = null;
}

class ExpressionBuilder extends React.Component {
    activeDraggable = null;
    activeDroppable = null;
    parts = [];

    constructor(props) {
        super(props);
        this.state = {
            nodes: [
                // <DroppableItem onDragOver={(obj) => { this.activeDroppable = obj; }} index={0} key={0} />
            ],
        }
        // this.buildExpressionNodes();
        // this.printExpression();
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
                    <DroppableItem onDragOver={(obj) => { this.activeDroppable = obj; }} index={0} key={0} />
                    {this.state.nodes.map(n =>
                        this.getDraggable(n.type, n.key)
                    )}
                </div>
            </div>
        );
    }

    addParts(obj) {
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
            this.parts.push(
                new ExpressionPart(this.getKey(), waitingType, 0)
            );
        } else {
            this.parts.push(
                new ExpressionPart(this.getKey(), types.bracketsLeft, 0),
                new ExpressionPart(this.getKey(), types.bracketsRight, 0),
            );
        }
        console.log(this.parts);
        this.activeDraggable = null;
        this.activeDroppable = null;

        this.buildExpressionNodes();
        this.printExpression();
    }

    getDraggable(type, key) {
        return <DraggableItem
            onDragStart={(obj) => { this.activeDraggable = obj }}
            onDragEnd={(obj) => { if (this.activeDraggable && this.activeDroppable) this.addParts.bind(this)(obj) }} // add condition
            type={type}
            key={key}
        />
    }

    // TODO: 
    getKey() {
        return (Math.random() * 100000).toString();
    };

    buildExpressionNodes() {
        const nodes = [];
        this.parts.forEach((p, index) => {
            nodes.push(
                new ExpressionPart(p.type, this.getKey())
                // <DraggableItem
                //     onDragStart={(obj) => { this.activeDraggable = obj }}
                //     onDragEnd={(obj) => { if (this.activeDraggable && this.activeDroppable) this.addParts.bind(this)(obj) }} // add condition
                //     type={p.type}
                //     key={this.getKey()}
                // />
            );
        });
        // const nodes = [
        //     <DroppableItem onDragOver={(obj) => { this.activeDroppable = obj; }} index={0} key={0} />
        // ];
        // this.parts.forEach((elem, index) => {
        //     nodes.push(elem);
        //     nodes.push(
        //         <DroppableItem onDragOver={(obj) => { this.activeDroppable = obj; }} index={index + 1} key={index * 2 + 2} />
        //     );

        // })
        this.setState({
            nodes: nodes,
        })
    }

    printExpression() {
        let expression = '';
        this.parts.forEach(p => {
            expression += '--' + p.value;
        });
        // this.parts.forEach((obj) => {
        //     console.log(obj);
        //     console.log(obj.value);
        //     if (obj.props.type === types.bracketsLeft) {
        //         // expression += '()()';
        //     }

        //     // expression += '';
        // });
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
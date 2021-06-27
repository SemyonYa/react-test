import React from 'react';
import './ExpressionBuilder.css';
import { Draggable, Droppable } from 'react-drag-and-drop';

function ExpressionBuilder(props) {
    function onDrop(data) {
        console.log(data)
        // => banana 
    }

    return <div className='wrap'>
        <div className='header'>
            <Draggable type="fruit" data="banana"><li>Banana</li></Draggable>
            <Draggable type="fruit" data="apple"><li>Apple</li></Draggable>
            <Draggable type="metal" data="silver"><li>Silver</li></Draggable>
        </div>
        <div className='expression'>
            <Droppable
                types={['fruit']} // <= allowed drop types
                onDrop={onDrop}
            >
                <ul className="Smoothie"></ul>
            </Droppable>
        </div>
    </div>;

}

export default ExpressionBuilder
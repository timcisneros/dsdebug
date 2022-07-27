import { useEffect, useState } from 'react';
import ReactFlow, { useStoreActions, Controls } from 'react-flow-renderer';

import StepNode from './NodeTypes/StepNode';
import DiamondNode from './NodeTypes/DiamondNode';
import CircleNode from './NodeTypes/CircleNode';
import GroupNode from './NodeTypes/GroupNode';
import { useVariable } from '../src/contexts/VariableContext';
import { useElement } from '../src/contexts/ElementContext';

const nodeTypes = {
    stepNode: StepNode,
    diamondNode: DiamondNode,
    circleNode: CircleNode,
    groupNode: GroupNode,
};

function Flow() {
    const { selectedVariable, selectVariable, getElementsFromVariable } =
        useVariable();

    const { elements, activeElements } = useElement();

    const setSelectedElements = useStoreActions(
        (actions) => actions.setSelectedElements
    );

    useEffect(() => {
        getElementsFromVariable();
    }, [selectedVariable]);

    // useEffect(() => {
    //     setElements(getElements());
    // }, [getElements]);

    useEffect(() => {
        setSelectedElements(activeElements);
    }, [activeElements, setSelectedElements]);

    const onPaneClick = () => {
        selectVariable(null);
    };

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                elements={elements}
                nodeTypes={nodeTypes}
                elementsSelectable={false}
                nodesDraggable={false}
                nodesConnectable={false}
                onPaneClick={onPaneClick}
            >
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default Flow;

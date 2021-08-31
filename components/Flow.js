import { useEffect, useState } from 'react';
import ReactFlow, { useStoreActions, Controls } from 'react-flow-renderer';

import StepNode from './NodeTypes/StepNode';
import DiamondNode from './NodeTypes/DiamondNode';
import CircleNode from './NodeTypes/CircleNode';
import GroupNode from './NodeTypes/GroupNode';
import { useVariable } from '../src/contexts/VariableContext';

const nodeTypes = {
    stepNode: StepNode,
    diamondNode: DiamondNode,
    circleNode: CircleNode,
    groupNode: GroupNode,
};

function Flow() {
    const { selectedVariable, setSelectedVariable, variables, getElements } =
        useVariable();
    const [elements, setElements] = useState([]);
    const [activeElements, setActiveElements] = useState([]);

    const setSelectedElements = useStoreActions(
        (actions) => actions.setSelectedElements
    );

    useEffect(() => {
        const variableData = variables
            .filter((vs) => vs.value === selectedVariable)
            .map((vd) => vd.id);

        const elementData = elements.filter((e) => variableData.includes(e.id));

        setActiveElements(elementData);
    }, [selectedVariable, variables, elements]);

    useEffect(() => {
        setElements(getElements());
    }, [getElements]);

    useEffect(() => {
        setSelectedElements(activeElements);
    }, [activeElements, setSelectedElements]);

    const onPaneClick = () => {
        setSelectedVariable('');
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

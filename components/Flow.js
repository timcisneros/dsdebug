import { useEffect, useMemo } from 'react';
import { ReactFlow, Controls } from '@xyflow/react';

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

    useEffect(() => {
        getElementsFromVariable();
    }, [selectedVariable, getElementsFromVariable]);

    const activeElementIds = useMemo(
        () => new Set(activeElements.map((element) => element.id)),
        [activeElements]
    );
    const nodes = useMemo(
        () =>
            elements
                .filter((element) => !element.source)
                .map((node) => ({
                    ...node,
                    selected: activeElementIds.has(node.id),
                })),
        [activeElementIds, elements]
    );
    const edges = useMemo(
        () => elements.filter((element) => element.source),
        [elements]
    );

    const onPaneClick = () => {
        selectVariable(null);
    };

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
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

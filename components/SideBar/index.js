import SideBarItem from './SideBarItem';
import { useVariable } from '../../src/contexts/VariableContext';
import WorkflowSelect from './WorkflowSelect';

const SideBar = () => {
    const { selectedVariable, selectVariable, variables, variableList } =
        useVariable();
    return (
        <div
            style={{
                zIndex: 1000,
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#fff',
                height: '100vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
                borderLeft: '1px solid #e0e0e0',
                width: 300,
                textOverflow: 'ellipsis',
            }}
        >
            <WorkflowSelect />
            {variableList.map((v) => {
                const individualVariableData = variables.filter(
                    (vs) => vs.value === v
                );
                return (
                    // v&& deals with error rendering parent variables (removes parent variables)
                    v && (
                        <SideBarItem
                            key={v}
                            variableListItem={v}
                            individualVariableData={individualVariableData}
                            selectVariable={selectVariable}
                            selectedVariable={selectedVariable}
                        />
                    )
                );
            })}
        </div>
    );
};

export default SideBar;

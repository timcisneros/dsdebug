import SideBarItem from './SideBarItem';
import { useVariable } from '../../src/contexts/VariableContext';

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
                borderLeft: '1px solid #c9c9c9',
            }}
        >
            {variableList.map((v) => {
                const individualVariableData = variables.filter(
                    (vs) => vs.value === v
                );
                return (
                    <SideBarItem
                        key={v}
                        variableListItem={v}
                        individualVariableData={individualVariableData}
                        selectVariable={selectVariable}
                        selectedVariable={selectedVariable}
                    />
                );
            })}
        </div>
    );
};

export default SideBar;

import SideBarItem from './SideBarItem';
import { useVariable } from '../../src/contexts/VariableContext';
import WorkflowSelect from './WorkflowSelect';
import MoreMenu from './MoreMenu';

const SideBar = () => {
    const {
        selectedVariable,
        selectVariable,
        variables,
        variableList,
        unusedVars,
    } = useVariable();
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
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                }}
            >
                <MoreMenu />
                <WorkflowSelect />
            </div>
            {variableList.map((v, i) => {
                const individualVariableData = variables.filter(
                    (vs) =>
                        new RegExp(`\\b${v}\\b`).test(vs.name) ||
                        new RegExp(`\\b${v}\\b`).test(vs.value)
                );
                return (
                    // v&& deals with error rendering parent variables (removes parent variables)

                    unusedVars ? (
                        // Update later; pass the filtered variable list to this component rather that handling the filtering here
                        individualVariableData.length > 0 && (
                            <SideBarItem
                                key={i}
                                variableListItem={v}
                                individualVariableData={individualVariableData}
                                selectVariable={selectVariable}
                                selectedVariable={selectedVariable}
                            />
                        )
                    ) : (
                        <SideBarItem
                            key={i}
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

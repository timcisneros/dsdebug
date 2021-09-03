import { Code } from '@chakra-ui/react';
import { useVariable } from '../../src/contexts/VariableContext';
import SubSideBarItem from '../SubSideBar/SubSideBarItem';

const SubSideBar = () => {
    const { selectedVariable, activeElements } = useVariable();

    return (
        <div
            style={{
                display: !selectedVariable && 'none',
                zIndex: 1000,
                position: 'absolute',
                top: 0,
                right: 300,
                backgroundColor: '#ffffffe8',
                height: '100vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
                borderLeft: '1px solid #e0e0e0',
                width: 300,
                textOverflow: 'ellipsis',
            }}
        >
            {activeElements?.map((ae, i) => (
                <div key={i}>
                    <h1
                        style={{
                            padding: 10,
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                    >
                        {ae.data.label}
                    </h1>
                    <div>
                        {ae.data.vars.value.map((v, i) => {
                            let varConfigure =
                                v.variableToConfigure.value.value;
                            let varValue = v.variableValue.value.value;
                            if (v.variableValue.type === 'String') {
                                varValue = v.variableValue.value;
                            } else if (v.variableValue.type === 'Expression') {
                                varValue = (
                                    <Code
                                        style={{ overflowWrap: 'anywhere' }}
                                        children={v.variableValue.value.code}
                                    />
                                );
                            }
                            return (
                                <SubSideBarItem
                                    key={i}
                                    varConfigure={varConfigure}
                                    varValue={varValue}
                                    selectedVariable={selectedVariable}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubSideBar;

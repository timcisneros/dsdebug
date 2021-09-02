import { useState } from 'react';
import { useVariable } from '../../src/contexts/VariableContext';
import SubSideBarItem from '../SubSideBar/SubSideBarItem';

const SubSideBar = () => {
    const [active, setActive] = useState(false);
    const { selectedVariable, activeElements } = useVariable();

    console.log(activeElements[0]?.data.vars);

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
                        {ae.data.vars.value.map((v, i) => (
                            <SubSideBarItem
                                key={i}
                                varConfigure={v.variableToConfigure.value.value}
                                varValue={
                                    v.variableValue.value.value ||
                                    v.variableValue.value
                                }
                                selectedVariable={selectedVariable}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubSideBar;

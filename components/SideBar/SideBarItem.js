import React from 'react';

const SideBarItem = ({
    variableListItem,
    individualVariableData,
    selectVariable,
    selectedVariable,
}) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                margin: 15,
                cursor: 'pointer',
                userSelect: 'none',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#2d2d2d',
                    color: '#fff',
                    fontSize: 12,
                    borderRadius: '100%',
                    padding: '2px 8px',
                    height: 25,
                    width: 25,
                    marginRight: 10,
                }}
                className={
                    variableListItem === selectedVariable ? 'active' : ''
                }
            >
                {individualVariableData.length}
            </div>
            <div
                onClick={(e) => selectVariable(e.target.innerText)}
                className={
                    variableListItem === selectedVariable ? 'active' : ''
                }
            >
                {variableListItem}
            </div>
        </div>
    );
};

export default SideBarItem;

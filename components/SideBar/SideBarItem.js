import React from 'react';

const SideBarItem = ({
    variableListItem,
    individualVariableData,
    selectVariable,
    selectedVariable,
}) => {
    return (
        <div
            onClick={(e) => selectVariable(e.target.innerText)}
            className={variableListItem === selectedVariable ? 'active' : ''}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: 10,
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
            >
                {individualVariableData.length}
            </div>
            <div style={{ cursor: 'pointer' }}>{variableListItem}</div>
        </div>
    );
};

export default SideBarItem;

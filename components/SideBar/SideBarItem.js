import { Divider, Tooltip } from '@chakra-ui/react';
import React from 'react';

const SideBarItem = ({
    variableListItem,
    individualVariableData,
    selectVariable,
    selectedVariable,
}) => {
    return (
        <div>
            <div
                className={
                    variableListItem === selectedVariable ? 'active' : ''
                }
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 10,
                    userSelect: 'none',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#2d2d2d',
                        color: '#fff',
                        fontSize: 10,
                        borderRadius: '100%',
                        width: 25,
                        height: 25,
                        padding: '2px 8px',
                    }}
                >
                    {individualVariableData.length}
                </div>
                <div
                    onClick={(e) => selectVariable(e.target.innerText)}
                    style={{
                        cursor: 'pointer',
                        width: '100%',
                        padding: 10,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Tooltip hasArrow label={variableListItem} placement="top">
                        {variableListItem}
                    </Tooltip>
                </div>
            </div>
            <Divider />
        </div>
    );
};

export default SideBarItem;

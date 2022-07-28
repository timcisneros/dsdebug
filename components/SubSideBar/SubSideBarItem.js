import { Code } from '@chakra-ui/react';

const SubSideBarItem = ({
    itemConfigure,
    itemValue,
    selectedVariable,
    type,
}) => {
    console.log(itemValue);
    return (
        <>
            <div style={{ padding: 10 }}>
                <div
                    style={{
                        padding: 5,
                        backgroundColor:
                            itemConfigure === selectedVariable
                                ? '#fdff6c'
                                : '#f5f5f5',
                        border: '1px solid #e0e0e0',
                        borderRadius: '5px 5px 0 0',
                    }}
                >
                    {itemConfigure}
                </div>
                <div
                    style={{
                        padding: 5,
                        backgroundColor: itemValue.includes(selectedVariable)
                            ? '#fdff6c'
                            : '#ffffffc9',
                        border: '1px solid #e0e0e0',
                        borderRadius: '0 0 5px 5px',
                        borderTop: 'none',
                    }}
                >
                    {type === 'Expression' ? (
                        <Code style={{ overflowWrap: 'anywhere' }}>
                            {itemValue || <i>(No Value)</i>}
                        </Code>
                    ) : (
                        <div>{itemValue || <i>(No Value)</i>}</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SubSideBarItem;

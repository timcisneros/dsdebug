const SubSideBarItem = ({ varConfigure, varValue, selectedVariable }) => {
    return (
        <>
            <div style={{ padding: 10 }}>
                <div
                    style={{
                        padding: 5,
                        backgroundColor:
                            varConfigure === selectedVariable
                                ? '#fdff6c'
                                : '#f5f5f5',
                        border: '1px solid #e0e0e0',
                        borderRadius: '5px 5px 0 0',
                    }}
                >
                    {varConfigure}
                </div>
                <div
                    style={{
                        padding: 5,
                        backgroundColor: '#ffffffc9',
                        border: '1px solid #e0e0e0',
                        borderRadius: '0 0 5px 5px',
                        borderTop: 'none',
                    }}
                >
                    {varValue || <i>(No Value)</i>}
                </div>
            </div>
        </>
    );
};

export default SubSideBarItem;
